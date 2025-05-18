import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpProps {
  setIsAuthenticated: (value: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setIsAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>();
  const password = watch('password');
  
  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    try {
      // This is just a mock - in a real app this would be a proper API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's say any signup works
      localStorage.setItem('authToken', 'demo-token');
      setIsAuthenticated(true);
    } catch (err) {
      setError('There was an error creating your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignUp = () => {
    // In a real app, this would redirect to Google OAuth
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('authToken', 'google-token');
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Get started with OutreachCRM today
        </CardDescription>
      </CardHeader>
      
      {error && (
        <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.name?.message}
            fullWidth
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
          />
          
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            fullWidth
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            helperText="Must be at least 8 characters"
            error={errors.password?.message}
            fullWidth
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must include upper and lowercase letters, a number, and a special character'
              }
            })}
          />
          
          <Input
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.confirmPassword?.message}
            fullWidth
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => 
                value === password || "Passwords don't match"
            })}
          />
          
          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
              required
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Privacy Policy</a>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            fullWidth
          >
            Create account
          </Button>
        </form>
        
        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignUp}
            fullWidth
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                fill="currentColor"
              />
            </svg>
            Sign up with Google
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;