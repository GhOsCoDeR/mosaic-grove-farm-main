
-- This script ensures that admin user is correctly created for testing
-- First, check if the user already exists
DO $$
DECLARE
  user_exists BOOLEAN;
  admin_user_id UUID;
BEGIN
  -- Check if user already exists
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@mosaicgrove.com'
  ) INTO user_exists;

  IF user_exists THEN
    -- Get the user ID
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@mosaicgrove.com';
    
    -- Delete any existing admin role for this user
    DELETE FROM public.admin_roles WHERE user_id = admin_user_id;
    
    -- Add admin role
    INSERT INTO public.admin_roles (user_id, role)
    VALUES (admin_user_id, 'super-admin');
    
    -- Ensure profile exists
    DELETE FROM public.profiles WHERE id = admin_user_id;
    INSERT INTO public.profiles (id, name, email)
    VALUES (admin_user_id, 'Admin User', 'admin@mosaicgrove.com');
    
    RAISE NOTICE 'Updated existing admin user with ID: %', admin_user_id;
  ELSE
    -- If user doesn't exist, we need to create one
    -- This is usually handled by supabase.auth.signUp in your application
    -- For direct database insertion (for testing only):
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(), -- Generate a new UUID for the user
      'authenticated',
      'authenticated',
      'admin@mosaicgrove.com',
      crypt('admin123', gen_salt('bf')), -- Password is 'admin123'
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin User"}',
      FALSE,
      now(),
      now()
    )
    RETURNING id INTO admin_user_id;

    -- Add admin role
    INSERT INTO public.admin_roles (user_id, role)
    VALUES (admin_user_id, 'super-admin');

    -- Create a profile for this user
    INSERT INTO public.profiles (id, name, email)
    VALUES (admin_user_id, 'Admin User', 'admin@mosaicgrove.com');
    
    RAISE NOTICE 'Created new admin user with ID: %', admin_user_id;
  END IF;
END $$;
