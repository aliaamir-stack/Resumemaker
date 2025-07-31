import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Starfield } from "@/components/cosmic/starfield";
import { Navbar } from "@/components/layout/navbar";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Builder from "@/pages/builder";
import Auth from "@/pages/auth";
import AuthCallback from "@/pages/auth-callback";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Starfield numStars={150} />
      <div className="relative z-10">
        <Navbar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/builder/:id?" component={Builder} />
          <Route path="/auth" component={Auth} />
          <Route path="/auth/callback" component={AuthCallback} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
