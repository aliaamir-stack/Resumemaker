import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signInWithMagicLink } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Mail, Sparkles } from "lucide-react";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithMagicLink(email);
      setEmailSent(true);
      toast({
        title: "Magic link sent! ✨",
        description: "Check your email for a sign-in link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send magic link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Card className="glassmorphism border-purple-500/30 max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-yellow-400">Check Your Email</CardTitle>
          <CardDescription className="text-gray-300">
            We've sent a magic link to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-400 text-center">
            Click the link in your email to sign in to MoonResume. 
            The link will expire in 1 hour.
          </p>
          <Button 
            variant="outline" 
            className="w-full border-purple-500/30"
            onClick={() => {
              setEmailSent(false);
              setEmail("");
            }}
          >
            Send Another Link
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glassmorphism border-purple-500/30 max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-yellow-400">Welcome to MoonResume</CardTitle>
        <CardDescription className="text-gray-300">
          Sign in with your email to start building stellar resumes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800/50 border-gray-600 focus:border-purple-500 text-white placeholder-gray-400"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full cosmic-gradient hover:scale-105 transition-transform animate-pulse-glow"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending Magic Link...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Send Magic Link</span>
              </div>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
