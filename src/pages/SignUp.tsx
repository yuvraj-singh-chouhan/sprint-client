
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ChevronLeft } from 'lucide-react';
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
