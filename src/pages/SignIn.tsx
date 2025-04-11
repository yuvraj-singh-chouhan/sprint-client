
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ChevronLeft, LogIn, Github, Facebook, Mail } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

interface SignInProps {
  isModal?: boolean;
  onSwitchAuthType?: () => void;
}

const SignIn: React.FC<SignInProps> = ({ isModal = false, onSwitchAuthType }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login(data.email, data.password);
    
    if (isModal) {
      // If we're in a modal, just close it (handled by parent)
    } else {
      // Otherwise navigate to home
      navigate('/');
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real application, this would handle OAuth authentication
    console.log(`Login with ${provider}`);
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      login("demo@example.com", "password");
      navigate('/');
    }, 1000);
  };

  const formContent = (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-neutral-600">
          Sign in to your account to continue shopping
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Button 
          variant="outline" 
          type="button"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => handleSocialLogin('Google')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          <span>Continue with Google</span>
        </Button>

        <Button 
          variant="outline" 
          type="button"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => handleSocialLogin('Facebook')}
        >
          <Facebook size={16} className="text-blue-600" />
          <span>Continue with Facebook</span>
        </Button>

        <Button 
          variant="outline" 
          type="button"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => handleSocialLogin('GitHub')}
        >
          <Github size={16} />
          <span>Continue with GitHub</span>
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">Or continue with email</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-neutral-600">
          Don't have an account?{' '}
          {isModal ? (
            <button
              onClick={onSwitchAuthType}
              className="text-brand hover:underline font-medium"
            >
              Sign up
            </button>
          ) : (
            <Link to="/signup" className="text-brand hover:underline font-medium">
              Sign up
            </Link>
          )}
        </p>
      </div>
    </>
  );

  // If used as a page (not modal)
  if (!isModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container max-w-md mx-auto py-16 px-4">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-brand hover:text-brand/80 transition">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            {formContent}
          </div>
        </div>
      </div>
    );
  }
  
  // If used as a modal
  return (
    <div>
      {formContent}
    </div>
  );
};

export default SignIn;
