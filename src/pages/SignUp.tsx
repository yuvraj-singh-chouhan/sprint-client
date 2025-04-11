
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ChevronLeft, Github, Facebook } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignUpProps {
  isModal?: boolean;
  onSwitchAuthType?: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ isModal, onSwitchAuthType }) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call an authentication API
    console.log("Registration attempt:", values);
    
    // For demo purposes, we'll simulate a successful registration
    setTimeout(() => {
      toast({
        title: "Account created",
        description: "Welcome to SoleVenture! You're ready to explore premium footwear.",
      });
      if (!isModal) {
        navigate('/');
      }
    }, 1000);
  }

  const handleSocialSignUp = (provider: string) => {
    // In a real application, this would handle OAuth registration
    console.log(`Sign up with ${provider}`);
    // For demo purposes, we'll simulate a successful registration
    setTimeout(() => {
      toast({
        title: "Account created",
        description: `Welcome to SoleVenture! You've signed up with ${provider}.`,
      });
      navigate('/');
    }, 1000);
  };

  // The form content to be used in both the page and modal
  const formContent = (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-brand" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Join SoleVenture</h1>
        <p className="text-muted-foreground">Create an account to access exclusive offers and track your orders</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Button 
          variant="outline" 
          type="button"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => handleSocialSignUp('Google')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          <span>Sign up with Google</span>
        </Button>

        <Button 
          variant="outline" 
          type="button"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => handleSocialSignUp('Facebook')}
        >
          <Facebook size={16} className="text-blue-600" />
          <span>Sign up with Facebook</span>
        </Button>

        <Button 
          variant="outline" 
          type="button"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => handleSocialSignUp('GitHub')}
        >
          <Github size={16} />
          <span>Sign up with GitHub</span>
        </Button>
      </div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">Or sign up with email</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="mt-2 text-xs text-gray-500">
            <p>By creating an account, you agree to our <Link to="#" className="text-brand hover:underline">Terms of Service</Link> and <Link to="#" className="text-brand hover:underline">Privacy Policy</Link></p>
          </div>
          
          <Button type="submit" className="w-full mt-6 bg-brand hover:bg-brand/90" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              "Creating account..."
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" /> Create Account
              </>
            )}
          </Button>
        </form>
      </Form>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">Already have an account?</span>
        </div>
      </div>

      <div className="text-center">
        {isModal ? (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onSwitchAuthType}
          >
            Sign In
          </Button>
        ) : (
          <Link to="/signin" className="w-full inline-block">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
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

export default SignUp;
