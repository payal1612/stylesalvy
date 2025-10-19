import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Sparkles, Palette, ArrowRight, Camera, Shirt, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight" data-testid="heading-hero">
                Your AI-Powered
                <span className="block text-primary mt-2">Personal Stylist</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl" data-testid="text-hero-description">
                Discover the perfect colors, makeup shades, and styles tailored to your unique features. Let AI analyze your skin tone and face shape to unlock your ideal look.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/upload">
                  <Button size="lg" className="rounded-full px-8 text-base" data-testid="button-try-ai-stylist">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Try AI Stylist
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base" data-testid="button-learn-more">
                  Learn How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2" data-testid="text-trust-signal">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-chart-1 border-2 border-background" data-testid="avatar-1" />
                  <div className="w-8 h-8 rounded-full bg-chart-2 border-2 border-background" data-testid="avatar-2" />
                  <div className="w-8 h-8 rounded-full bg-chart-3 border-2 border-background" data-testid="avatar-3" />
                  <div className="w-8 h-8 rounded-full bg-chart-4 border-2 border-background" data-testid="avatar-4" />
                </div>
                Trusted by 50,000+ beauty enthusiasts
              </p>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  
                  alt="Diverse group showcasing AI beauty analysis" 
                  className="w-full h-auto"
                  data-testid="img-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-how-it-works">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-description">
              Three simple steps to discover your perfect style
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <Card className="h-full hover-elevate transition-all">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Upload className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">Upload Your Photo</h3>
                  <p className="text-muted-foreground">
                    Take a selfie or upload a clear photo of your face with good lighting
                  </p>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>

            <div className="relative">
              <Card className="h-full hover-elevate transition-all">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our AI detects your skin tone, undertone, face shape, and unique features
                  </p>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>

            <div>
              <Card className="h-full hover-elevate transition-all">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Palette className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">Get Recommendations</h3>
                  <p className="text-muted-foreground">
                    Receive personalized color palettes, makeup shades, and outfit suggestions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-features">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-description">
              Comprehensive beauty and style recommendations powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                 
                </div>
                <Camera className="h-8 w-8 text-primary" />
                <h3 className="font-semibold text-xl">Face Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced AI detects your skin tone, undertone, and face shape with high accuracy
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {['#E6B89C', '#D4A59A', '#C49186', '#A67B73', '#8B6F66', '#704F4F', '#5C3D3D', '#4A2F2F'].map((color, i) => (
                      <div key={i} className="w-12 h-12 rounded-lg shadow-md" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
                <Palette className="h-8 w-8 text-primary" />
                <h3 className="font-semibold text-xl">Makeup Recommendations</h3>
                <p className="text-muted-foreground text-sm">
                  Get personalized foundation, lipstick, blush, and eyeshadow shade recommendations
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  
                </div>
                <Shirt className="h-8 w-8 text-primary" />
                <h3 className="font-semibold text-xl">Outfit Suggestions</h3>
                <p className="text-muted-foreground text-sm">
                  Discover clothing colors and styles perfect for your undertone and occasion
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                  <MessageCircle className="h-20 w-20 text-primary" />
                </div>
                <MessageCircle className="h-8 w-8 text-primary" />
                <h3 className="font-semibold text-xl">AI Chat Stylist</h3>
                <p className="text-muted-foreground text-sm">
                  Ask our AI stylist for personalized advice on outfits, makeup, and styling tips
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-chart-3/20 to-chart-4/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground mt-1">Occasions</div>
                  </div>
                </div>
                <Sparkles className="h-8 w-8 text-primary" />
                <h3 className="font-semibold text-xl">Occasion-Based</h3>
                <p className="text-muted-foreground text-sm">
                  Filter recommendations by casual, party, formal, interview, or wedding occasions
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-chart-1/20 to-chart-5/20 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-md bg-primary/30" />
                    ))}
                  </div>
                </div>
                <Upload className="h-8 w-8 text-primary" />
                <h3 className="font-semibold text-xl">Save & Track</h3>
                <p className="text-muted-foreground text-sm">
                  Save your favorite palettes and track your style evolution over time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-testimonials">
              Loved by Beauty Enthusiasts
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-testimonials-description">
              See how StyleSense has transformed personal styling
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-chart-1" data-testid="testimonial-avatar-1" />
                  <div>
                    <div className="font-semibold" data-testid="testimonial-name-1">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Beauty Blogger</div>
                  </div>
                </div>
                <p className="text-muted-foreground" data-testid="testimonial-quote-1">
                  "StyleSense changed how I approach makeup! The foundation shade recommendations were spot-on, and I finally understand which colors suit my warm undertone."
                </p>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20" data-testid="testimonial-tag-1-1">Warm Undertone</div>
                  <div className="px-3 py-1 rounded-full text-xs bg-chart-2/10 text-chart-2 border border-chart-2/20" data-testid="testimonial-tag-1-2">Oval Face</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-chart-3" data-testid="testimonial-avatar-2" />
                  <div>
                    <div className="font-semibold" data-testid="testimonial-name-2">Maya Patel</div>
                    <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Fashion Designer</div>
                  </div>
                </div>
                <p className="text-muted-foreground" data-testid="testimonial-quote-2">
                  "As a designer, I use StyleSense to help clients find their signature colors. The AI recommendations are incredibly accurate and save so much time!"
                </p>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-full text-xs bg-chart-4/10 text-chart-4 border border-chart-4/20" data-testid="testimonial-tag-2-1">Cool Undertone</div>
                  <div className="px-3 py-1 rounded-full text-xs bg-chart-3/10 text-chart-3 border border-chart-3/20" data-testid="testimonial-tag-2-2">Heart Face</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6" data-testid="heading-final-cta">
            Ready to Discover Your Perfect Style?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-final-cta-description">
            Join thousands of users who've unlocked their ideal beauty and fashion recommendations with AI
          </p>
          <Link href="/upload">
            <Button size="lg" className="rounded-full px-10 text-lg" data-testid="button-get-started">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold">StyleSense</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 StyleSense. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
