import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, TrendingUp, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl opacity-20 animate-pulse" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-gradient-glass backdrop-blur-sm mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Streamline Creator Marketing with AI-Powered OS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                The Ultimate Creator
              </span>
              <br />
              <span className="text-foreground">Marketing OS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none leading-relaxed">
              Streamline your entire creator marketing workflow with AI-powered content generation, 
              multi-platform posting, and campaign management in one unified OS.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 hover:bg-gradient-glass backdrop-blur-sm transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-3xl font-bold text-foreground">10K+</span>
                </div>
                <p className="text-muted-foreground text-sm">Creators</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-3xl font-bold text-foreground">5x</span>
                </div>
                <p className="text-muted-foreground text-sm">Faster</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Zap className="w-5 h-5 text-primary-glow" />
                  <span className="text-3xl font-bold text-foreground">90%</span>
                </div>
                <p className="text-muted-foreground text-sm">Time Saved</p>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-brand">
              <img 
                src={heroImage} 
                alt="InfluenceOS Dashboard - AI-powered creator marketing operating system" 
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-accent/40 to-primary/40 rounded-full blur-xl opacity-30 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}