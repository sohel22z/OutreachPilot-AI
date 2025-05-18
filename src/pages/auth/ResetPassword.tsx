import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();
  const password = watch('password');
  
  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    try {
      // This is just a mock - in a real app this would be a proper API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsReset(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('There was an error resetting your password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Enter your new password below
        </CardDescription>
      </CardHeader>
      
      {error && (
        <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      {isReset ? (
        <CardContent>
          <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-md flex items-start text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
            <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Password reset successful!</p>
              <p className="mt-1 text-sm">Your password has been reset. Redirecting you to the login page...</p>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="New Password"
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
            
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
            >
              Reset password
            </Button>
          </form>
        </CardContent>
      )}
      
      <CardFooter className="flex justify-center">
        <Link
          to="/login"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResetPassword;