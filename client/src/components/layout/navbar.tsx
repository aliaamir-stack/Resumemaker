import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MoonPhase } from "@/components/cosmic/moon-phase";
import { useState, useEffect } from "react";
import { getCurrentUser, signOut } from "@/lib/auth";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const NavLinks = () => (
    <>
      <Link href="/#features">
        <Button variant="ghost" className="hover:text-yellow-400 transition-colors">
          Features
        </Button>
      </Link>
      <Link href="/#templates">
        <Button variant="ghost" className="hover:text-yellow-400 transition-colors">
          Templates
        </Button>
      </Link>
      <Link href="/#pricing">
        <Button variant="ghost" className="hover:text-yellow-400 transition-colors">
          Pricing
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="glassmorphism border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <MoonPhase phase="full" size="sm" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                MoonResume
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="hover:text-yellow-400 transition-colors">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-purple-500/30 hover:bg-purple-500/10"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button className="cosmic-gradient hover:scale-105 transition-transform">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <div className="flex flex-col space-y-2">
              <NavLinks />
              
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start hover:text-yellow-400 transition-colors">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full border-purple-500/30 hover:bg-purple-500/10"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button className="w-full cosmic-gradient hover:scale-105 transition-transform">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
