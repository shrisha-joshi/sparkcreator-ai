import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  MessageSquare, 
  Palette, 
  BarChart3, 
  Zap, 
  Users,
  Target,
  Sparkles,
  Video
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI Creator Discovery",
    description: "Find perfect creators using advanced AI matching based on audience, engagement, and brand alignment.",
    color: "text-primary"
  },
  {
    icon: MessageSquare,
    title: "Automated Outreach",
    description: "Generate personalized outreach messages and emails that convert 3x better than generic templates.",
    color: "text-accent"
  },
  {
    icon: Palette,
    title: "AI Content Generation",
    description: "Create stunning posters, captions, and ad copy automatically using your brand guidelines.",
    color: "text-primary-glow"
  },
  {
    icon: Video,
    title: "Smart Video Editing",
    description: "AI-powered video editing with automatic cuts, captions, and brand overlay integration.",
    color: "text-success"
  },
  {
    icon: Target,
    title: "Campaign Management",
    description: "Track campaigns from discovery to delivery with real-time analytics and performance insights.",
    color: "text-warning"
  },
  {
    icon: BarChart3,
    title: "ROI Analytics",
    description: "Measure campaign performance with detailed metrics, A/B testing, and conversion tracking.",
    color: "text-destructive"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-muted/30 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-gradient-glass backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need for
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Creator Marketing Success
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            From discovery to analytics, our AI-powered platform handles every aspect 
            of your creator marketing campaigns automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-brand transition-all duration-300 hover:-translate-y-2 bg-gradient-card backdrop-blur-sm border-border/50"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-glass flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Feature Highlight */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-primary/5 border border-primary/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <Users className="w-6 h-6 text-accent" />
              <BarChart3 className="w-6 h-6 text-primary-glow" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Launch campaigns <span className="text-primary">10x faster</span> with AI automation
            </h3>
            <p className="text-muted-foreground text-lg">
              What used to take weeks now takes hours. Our AI agents handle the heavy lifting 
              while you focus on strategy and results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}