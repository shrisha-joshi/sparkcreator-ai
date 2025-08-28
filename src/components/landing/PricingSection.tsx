import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Star, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small brands and agencies",
    price: "$49",
    period: "per month",
    icon: Sparkles,
    features: [
      "Up to 50 creator discoveries per month",
      "5 AI-generated campaigns",
      "Basic outreach templates",
      "Campaign analytics dashboard",
      "Email support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Professional",
    description: "For growing businesses and marketing teams",
    price: "$149",
    period: "per month",
    icon: Star,
    features: [
      "Unlimited creator discoveries",
      "25 AI-generated campaigns",
      "Advanced AI content generation",
      "Automated outreach sequences",
      "Video editing AI tools",
      "Advanced analytics & ROI tracking",
      "Priority support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: "Custom",
    period: "contact us",
    icon: Crown,
    features: [
      "Everything in Professional",
      "Unlimited campaigns & content",
      "Custom AI model training",
      "Multi-brand management",
      "API access & integrations",
      "Dedicated success manager",
      "Custom onboarding & training"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-gradient-glass backdrop-blur-sm mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Simple Pricing</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose the perfect plan
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              for your needs
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Start free, upgrade as you grow. All plans include our core AI features 
            with no hidden fees or limits on team members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index}
                className={`relative group transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-primary shadow-brand bg-gradient-card' 
                    : 'hover:shadow-lg bg-gradient-card'
                } backdrop-blur-sm`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-glass flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-muted-foreground">/{plan.period.split(' ')[0]}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-primary hover:shadow-glow' 
                        : ''
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              99.9% uptime SLA
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              SOC2 compliant
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              24/7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}