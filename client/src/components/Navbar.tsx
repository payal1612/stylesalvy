import { Link, useLocation } from "wouter";
import { Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <a className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-lg transition-all">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold">StyleSense</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" data-testid="link-nav-home">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === "/" ? "text-foreground" : "text-muted-foreground"}`}>
                Home
              </a>
            </Link>
            <Link href="/upload" data-testid="link-nav-upload">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === "/upload" ? "text-foreground" : "text-muted-foreground"}`}>
                Try Now
              </a>
            </Link>
            <Link href="/chat" data-testid="link-nav-chat">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === "/chat" ? "text-foreground" : "text-muted-foreground"}`}>
                AI Stylist
              </a>
            </Link>
            <Link href="/profile" data-testid="link-nav-profile">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === "/profile" ? "text-foreground" : "text-muted-foreground"}`}>
                Profile
              </a>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/profile" data-testid="link-profile-icon">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
