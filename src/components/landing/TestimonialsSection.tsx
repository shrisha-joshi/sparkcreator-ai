import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow",
    avatar: "SC",
    content: "CreatorFlow AI transformed our influencer campaigns. We went from 3 weeks to launch a campaign to just 2 days, and our ROI increased by 300%.",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Brand Manager",
    company: "StyleCorp",
    avatar: "MJ",
    content: "The AI-generated content is incredible. Our engagement rates doubled, and creators love working with us because everything is so streamlined.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "CMO",
    company: "FreshBrands",
    avatar: "ER",
    content: "Managing 50+ creator relationships used to be overwhelming. Now our team of 3 handles campaigns that would have required 15 people before.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Founder",
    company: "GrowthLab",
    avatar: "DK",
    content: "The analytics dashboard gives us insights we never had before. We can predict campaign success before launching and optimize in real-time.",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Creative Director",
    company: "BrandForge",
    avatar: "LT",
    content: "AI video editing saved us thousands in production costs. What used to take our team days now takes hours, and the quality is consistently excellent.",
    rating: 5
  },
  {
    name: "Alex Martinez",
    role: "Performance Marketer",
    company: "ScaleUp",
    avatar: "AM",
    content: "The automated outreach feature has a 40% response rate compared to our previous 8%. Creators actually want to work with us now.",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-muted/20 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-gradient-glass backdrop-blur-sm mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Loved by Marketers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What our customers say
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              about CreatorFlow AI
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Join thousands of marketing teams who've revolutionized their 
            creator campaigns with AI automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-brand transition-all duration-300 hover:-translate-y-2 bg-gradient-card backdrop-blur-sm border-border/50"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-medium">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <p className="text-muted-foreground">Customer Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">500+</div>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-glow mb-2">1M+</div>
            <p className="text-muted-foreground">Campaigns Launched</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">$50M+</div>
            <p className="text-muted-foreground">Revenue Generated</p>
          </div>
        </div>
      </div>
    </section>
  );
}