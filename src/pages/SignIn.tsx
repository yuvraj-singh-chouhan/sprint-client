import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
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

  return (
    <div className={isModal ? '' : 'container-custom py-12 max-w-md'}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-neutral-600">
          Sign in to your account to continue shopping
        </p>
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
            Sign In
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
            <a href="/signup" className="text-brand hover:underline font-medium">
              Sign up
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
