import { useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data?.session?.user) {
          toast({
            title: "Welcome to MoonResume! ✨",
            description: "You've successfully signed in. Ready to create stellar resumes?",
          });
          
          // Redirect to dashboard
          setLocation('/dashboard');
        } else {
          // No session found, redirect to auth
          setLocation('/auth');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: "Authentication Error",
          description: "There was an issue signing you in. Please try again.",
          variant: "destructive",
        });
        setLocation('/auth');
      }
    };

    handleAuthCallback();
  }, [setLocation, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glassmorphism p-8 rounded-2xl text-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Authenticating...
        </h2>
        <p className="text-gray-300">
          Completing your cosmic sign-in process.
        </p>
      </div>
    </div>
  );
}
