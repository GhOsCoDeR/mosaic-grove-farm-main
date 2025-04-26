import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AdminLoginDebug = () => {
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({});

  // Function to test admin login
  const checkAdminAccount = async (email: string, password: string) => {
    setIsLoading(true);
    const results: Record<string, any> = {
      authStep: null,
      authError: null,
      userId: null,
      adminRoleStep: null,
      adminRoleError: null,
      adminRole: null,
      profileStep: null,
      profileError: null,
      profile: null,
    };
    
    try {
      // Step 1: Check authentication
      results.authStep = "Started authentication test";
      const { data, error } = await supabase.auth.signInWithPassword({
        email, 
        password
      });
      
      if (error) {
        results.authError = error.message;
        results.authStep = "Authentication failed";
        setDebugInfo(results);
        return;
      }
      
      results.authStep = "Authentication successful";
      results.userId = data.user?.id;
      
      if (!data.user) {
        results.authError = "No user returned from authentication";
        setDebugInfo(results);
        return;
      }
      
      // Step 2: Check admin role
      results.adminRoleStep = "Checking admin role";
      const { data: roleData, error: roleError } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single();
      
      if (roleError) {
        results.adminRoleError = roleError.message;
        results.adminRoleStep = "Admin role check failed";
        setDebugInfo(results);
        return;
      }
      
      if (!roleData) {
        results.adminRoleError = "No admin role found for this user";
        results.adminRoleStep = "Admin role not found";
        setDebugInfo(results);
        return;
      }
      
      results.adminRoleStep = "Admin role found";
      results.adminRole = roleData.role;
      
      // Step 3: Check profile
      results.profileStep = "Checking user profile";
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        results.profileError = profileError.message;
        results.profileStep = "Profile check failed";
        setDebugInfo(results);
        return;
      }
      
      results.profileStep = "Profile found";
      results.profile = profileData;
      
      setDebugInfo(results);
    } catch (error: any) {
      results.authError = `Exception: ${error.message}`;
      setDebugInfo(results);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    setIsLoading(true);
    try {
      // Get admin roles
      const { data: adminRoles, error } = await supabase
        .from('admin_roles')
        .select('user_id, role');
      
      if (error) {
        console.error("Error fetching admin roles:", error);
        return;
      }
      
      // Fetch profiles for each admin
      const admins = [];
      for (const role of adminRoles || []) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', role.user_id)
          .single();
          
        admins.push({
          id: role.user_id,
          role: role.role,
          name: profile?.name || 'Unknown',
          email: profile?.email || 'Unknown'
        });
      }
      
      setAdminUsers(admins);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to create a demo admin user
  const createDemoAdmin = async () => {
    setIsLoading(true);
    const results: Record<string, any> = {
      step: "Starting admin creation",
      errors: [],
      userId: null,
      success: false
    };
    
    try {
      // Try a different approach - first check if admin already exists
      results.step = "Checking if admin already exists";
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', 'admin@mosaicgrove.com')
        .single();
      
      let userId;
      
      if (userError) {
        // User doesn't exist, try creating it directly in Auth
        results.step = "User not found, creating directly";
        
        // Attempt direct auth creation
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: 'admin@mosaicgrove.com',
          password: 'admin123',
          email_confirm: true
        });
        
        if (authError) {
          results.errors.push(`Admin auth error: ${authError.message}`);
          
          // Try alternate approach with signUp
          results.step = "Trying alternate signup approach";
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: 'admin@mosaicgrove.com',
            password: 'admin123',
            options: {
              data: {
                role: 'admin'
              }
            }
          });
          
          if (signUpError) {
            results.errors.push(`SignUp error: ${signUpError.message}`);
            results.step = "Auth creation failed";
            setDebugInfo(results);
            setIsLoading(false);
            return;
          }
          
          userId = signUpData?.user?.id;
        } else {
          userId = authData?.user?.id;
        }
      } else {
        userId = userData.id;
        results.step = "Admin user already exists in database";
      }
      
      if (!userId) {
        results.errors.push("Failed to get user ID");
        results.step = "User creation failed";
        setDebugInfo(results);
        setIsLoading(false);
        return;
      }
      
      results.userId = userId;
      
      // Ensure profile exists
      results.step = "Creating or updating profile";
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: 'Admin User',
          email: 'admin@mosaicgrove.com',
          updated_at: new Date().toISOString(),
        });
      
      if (profileError) {
        results.errors.push(`Profile error: ${profileError.message}`);
        results.step = "Profile creation failed";
      } else {
        results.step = "Profile created or updated";
      }
      
      // Ensure admin role exists
      results.step = "Creating admin role";
      const { error: roleError } = await supabase
        .from('admin_roles')
        .upsert({
          user_id: userId,
          role: 'admin',
          created_at: new Date().toISOString(),
        });
      
      if (roleError) {
        results.errors.push(`Role error: ${roleError.message}`);
        results.step = "Role creation failed";
      } else {
        results.step = "Admin role created or updated";
        results.success = true;
      }
      
      // Try to force set password for user if other methods failed
      if (results.errors.length > 0) {
        results.step = "Attempting password reset as fallback";
        try {
          const { error: pwResetError } = await supabase.auth.resetPasswordForEmail(
            'admin@mosaicgrove.com',
            { redirectTo: window.location.origin + '/admin/login' }
          );
          
          if (pwResetError) {
            results.errors.push(`Password reset error: ${pwResetError.message}`);
          } else {
            results.step = "Password reset email sent";
          }
        } catch (e: any) {
          results.errors.push(`Password reset exception: ${e.message}`);
        }
      }
      
      setDebugInfo(results);
      
      // Refresh admin users list
      await fetchAdminUsers();
      
    } catch (error: any) {
      results.errors.push(`Exception: ${error.message}`);
      results.step = "Admin creation failed with exception";
      setDebugInfo(results);
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkDatabaseTables = async () => {
    setIsLoading(true);
    const results: Record<string, any> = {
      tables: {},
      errors: []
    };
    
    try {
      // Check auth.users table
      const { data: authUsers, error: authError } = await supabase
        .from('users')
        .select('id, email')
        .limit(5);
        
      results.tables.users = {
        data: authUsers,
        error: authError ? authError.message : null
      };
      
      // Check profiles table
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, email')
        .limit(5);
        
      results.tables.profiles = {
        data: profiles,
        error: profilesError ? profilesError.message : null
      };
      
      // Check admin_roles table
      const { data: roles, error: rolesError } = await supabase
        .from('admin_roles')
        .select('user_id, role')
        .limit(5);
        
      results.tables.admin_roles = {
        data: roles,
        error: rolesError ? rolesError.message : null
      };
      
      setDebugInfo(results);
    } catch (error: any) {
      results.errors.push(`Exception: ${error.message}`);
      setDebugInfo(results);
    } finally {
      setIsLoading(false);
    }
  };
  
  const createDirectAdminRole = async () => {
    setIsLoading(true);
    const results: Record<string, any> = {
      step: "Starting direct admin role creation",
      errors: [],
      success: false
    };
    
    try {
      // Create a hardcoded admin user directly in the admin_roles table
      results.step = "Creating admin role directly";
      const newUserUuid = '00000000-0000-0000-0000-000000000000'; // Hardcoded UUID for demo
      
      // Insert directly into admin_roles
      const { error: roleError } = await supabase
        .from('admin_roles')
        .upsert({
          user_id: newUserUuid,
          role: 'admin',
          created_at: new Date().toISOString(),
        });
      
      if (roleError) {
        results.errors.push(`Role error: ${roleError.message}`);
        results.step = "Role creation failed";
      } else {
        results.step = "Admin role created successfully";
        results.success = true;
        
        // Also create a profile for this user
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: newUserUuid,
            name: 'Direct Admin',
            email: 'direct@mosaicgrove.com',
            updated_at: new Date().toISOString(),
          });
          
        if (profileError) {
          results.errors.push(`Profile error: ${profileError.message}`);
        }
      }
      
      setDebugInfo(results);
      await fetchAdminUsers();
      
    } catch (error: any) {
      results.errors.push(`Exception: ${error.message}`);
      results.step = "Admin creation failed with exception";
      setDebugInfo(results);
    } finally {
      setIsLoading(false);
    }
  };
  
  // This component is only for development/debugging
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium mb-4">Admin Login Debugging</h3>
      
      <div className="mb-6">
        <Button 
          onClick={fetchAdminUsers} 
          disabled={isLoading} 
          variant="outline" 
          className="mb-2"
        >
          List Admin Users
        </Button>
        
        {adminUsers.length > 0 ? (
          <div className="mt-2 border rounded p-3">
            <h4 className="font-medium mb-2">Admin Users:</h4>
            <ul className="list-disc pl-5">
              {adminUsers.map((admin) => (
                <li key={admin.id}>
                  {admin.name} ({admin.email}) - {admin.role}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      
      <div className="mb-4 grid grid-cols-2 gap-2">
        <Button 
          onClick={() => checkAdminAccount('admin@mosaicgrove.com', 'admin123')} 
          disabled={isLoading}
          variant="outline"
        >
          Test Demo Admin Login
        </Button>
        
        <Button 
          onClick={createDemoAdmin} 
          disabled={isLoading}
          variant="outline"
          className="bg-green-50 hover:bg-green-100 border-green-200"
        >
          Create Demo Admin
        </Button>
        
        <Button 
          onClick={createDirectAdminRole} 
          disabled={isLoading}
          variant="outline"
          className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
        >
          Create Direct Admin Role
        </Button>
        
        <Button 
          onClick={checkDatabaseTables} 
          disabled={isLoading}
          variant="outline"
          className="bg-blue-50 hover:bg-blue-100 border-blue-200"
        >
          Check Database Tables
        </Button>
      </div>
      
      {Object.keys(debugInfo).length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Debug Information:</h4>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AdminLoginDebug;
