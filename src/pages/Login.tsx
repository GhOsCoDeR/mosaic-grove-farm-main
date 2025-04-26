
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing error when component mounts or inputs change
    setLoginError(null);
  }, [email, password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);
    
    try {
      console.log("Attempting user login:", email);
      const success = await login(email, password);
      if (success) {
        console.log("User login successful");
        // Redirect to cart if there was a previous checkout attempt
        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      } else {
        console.log("User login failed");
        setLoginError("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md animate-fade-in">
          <div>
            <h2 className="mt-6 text-center text-3xl font-serif font-bold text-mosaic-green-dark">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>
          
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{loginError}</p>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> :
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  }
                </div>
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="group relative w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/signup" className="font-medium text-mosaic-green hover:text-mosaic-green-dark transition-colors">
                  Need an account? Sign up
                </Link>
              </div>
              
              <div className="text-sm">
                <Link to="/" className="flex items-center font-medium text-mosaic-green hover:text-mosaic-green-dark transition-colors">
                  <ArrowLeft size={16} className="mr-1" />
                  Back to Home
                </Link>
              </div>
            </div>
          </form>
          
          {/* Demo credentials */}
          <div className="mt-4 bg-gray-50 p-4 rounded-md text-sm">
            <p className="font-medium text-gray-700 mb-1">Demo credentials:</p>
            <p><span className="font-medium">Email:</span> test@example.com</p>
            <p><span className="font-medium">Password:</span> password123</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
