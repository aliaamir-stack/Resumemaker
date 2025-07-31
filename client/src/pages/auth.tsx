import { useEffect } from "react";
import { useLocation } from "wouter";
import { AuthForm } from "@/components/auth/auth-form";
import { getCurrentUser } from "@/lib/auth";
import { MoonPhase } from "@/components/cosmic/moon-phase";

export default function Auth() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    getCurrentUser().then(user => {
      if (user) {
        setLocation('/dashboard');
      }
    });
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        {/* Cosmic header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MoonPhase phase="full" size="lg" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              MoonResume
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Sign in to access your cosmic workspace
          </p>
        </div>

        <AuthForm />

        {/* Additional info */}
        <div className="mt-8 text-center">
          <div className="glassmorphism rounded-lg p-4 border border-purple-500/30">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">
              ✨ What you'll get with MoonResume:
            </h3>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• AI-powered resume enhancement</li>
              <li>• Beautiful cosmic templates</li>
              <li>• Live preview & job matching</li>
              <li>• Export to PDF & share links</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
