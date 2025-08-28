import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Wand2, 
  Copy, 
  RefreshCw,
  Sparkles,
  Hash,
  AtSign,
  TrendingUp,
  Bot,
  Instagram,
  Twitter,
  Youtube,
  Linkedin
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface GeneratedCaption {
  id: string;
  platform: string;
  content: string;
  hashtags: string[];
  engagement: string;
  tone: string;
  createdAt: Date;
}

const platforms = [
  { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { value: 'twitter', label: 'Twitter/X', icon: Twitter, color: 'text-blue-500' },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500' },
];

const tones = [
  'Professional', 'Casual', 'Witty', 'Inspiring', 'Educational', 'Promotional'
];

const industries = [
  'Fashion', 'Tech', 'Food', 'Travel', 'Fitness', 'Beauty', 'Business', 'Lifestyle'
];

export function CaptionWriter() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'instagram',
    tone: 'professional',
    industry: 'fashion',
    targetAudience: '',
    keyPoints: '',
    callToAction: '',
  });

  const [generatedCaptions, setGeneratedCaptions] = useState<GeneratedCaption[]>([
    {
      id: '1',
      platform: 'Instagram',
      content: "✨ Transform your style with our latest summer collection! 🌟 From breezy dresses to chic accessories, we've curated pieces that speak to your soul. Every thread tells a story of elegance and comfort. What's your summer style story? 💫",
      hashtags: ['#SummerFashion', '#StyleInspo', '#OOTD', '#FashionForward', '#SummerVibes'],
      engagement: 'High',
      tone: 'Casual',
      createdAt: new Date(),
    },
    {
      id: '2',
      platform: 'LinkedIn',
      content: "The future of fashion lies in sustainable practices and innovative design. Our latest collection represents a commitment to both style and environmental responsibility. How is your brand contributing to a more sustainable future?",
      hashtags: ['#SustainableFashion', '#Innovation', '#BusinessStrategy', '#Leadership'],
      engagement: 'Medium',
      tone: 'Professional',
      createdAt: new Date(),
    },
  ]);

  const handleGenerate = async () => {
    if (!formData.topic) {
      toast.error("Please enter a topic for your caption");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const platform = platforms.find(p => p.value === formData.platform)?.label || 'Instagram';
      const newCaption: GeneratedCaption = {
        id: Date.now().toString(),
        platform,
        content: generateMockCaption(formData),
        hashtags: generateMockHashtags(formData.industry, formData.platform),
        engagement: 'High',
        tone: formData.tone,
        createdAt: new Date(),
      };
      
      setGeneratedCaptions(prev => [newCaption, ...prev]);
      setIsGenerating(false);
      toast.success("Caption generated successfully!");
    }, 2000);
  };

  const generateMockCaption = (data: typeof formData) => {
    const mockCaptions = {
      instagram: `✨ ${data.topic} is more than just a trend - it's a lifestyle! 🌟 Our latest collection brings together ${data.keyPoints || 'style and comfort'} in ways you've never imagined. Perfect for ${data.targetAudience || 'fashion lovers'} who want to make a statement. ${data.callToAction || 'Shop now!'} 💫`,
      twitter: `🚀 ${data.topic} just got a major upgrade! We're combining ${data.keyPoints || 'innovation with style'} to create something truly special. ${data.targetAudience || 'Forward-thinkers'} are going to love this. ${data.callToAction || 'Check it out!'} #Innovation`,
      linkedin: `The evolution of ${data.topic} reflects broader industry trends toward ${data.keyPoints || 'innovation and sustainability'}. Our approach to ${data.targetAudience || 'professional clients'} demonstrates how businesses can balance style with substance. ${data.callToAction || 'Learn more about our methodology.'}`,
      youtube: `In today's video, we're diving deep into ${data.topic}! I'll show you exactly how ${data.keyPoints || 'to master this concept'} and why it matters for ${data.targetAudience || 'creators like you'}. ${data.callToAction || 'Don\'t forget to like and subscribe!'} 🎥`,
    };
    
    return mockCaptions[data.platform as keyof typeof mockCaptions] || mockCaptions.instagram;
  };

  const generateMockHashtags = (industry: string, platform: string) => {
    const baseHashtags = {
      fashion: ['#Fashion', '#Style', '#OOTD', '#Trendy', '#FashionInspo'],
      tech: ['#Tech', '#Innovation', '#Digital', '#Future', '#TechTrends'],
      food: ['#Food', '#Foodie', '#Delicious', '#Recipe', '#FoodLover'],
      travel: ['#Travel', '#Adventure', '#Wanderlust', '#Explore', '#TravelGram'],
      fitness: ['#Fitness', '#Health', '#Workout', '#FitLife', '#Motivation'],
      beauty: ['#Beauty', '#Skincare', '#Makeup', '#SelfCare', '#BeautyTips'],
    };
    
    const platformHashtags = {
      instagram: ['#Insta', '#IG', '#InstagramReels'],
      twitter: ['#TwitterChat', '#Thread'],
      linkedin: ['#Professional', '#Business', '#Leadership'],
      youtube: ['#YouTube', '#Video', '#Subscribe'],
    };
    
    const base = baseHashtags[industry as keyof typeof baseHashtags] || baseHashtags.fashion;
    const platformSpecific = platformHashtags[platform as keyof typeof platformHashtags] || [];
    
    return [...base.slice(0, 3), ...platformSpecific.slice(0, 2)];
  };

  const copyCaption = (caption: GeneratedCaption) => {
    const fullText = `${caption.content}\n\n${caption.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    toast.success("Caption copied to clipboard!");
  };

  const regenerateCaption = (id: string) => {
    setGeneratedCaptions(prev => prev.filter(c => c.id !== id));
    handleGenerate();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Caption Writer</h1>
          <p className="text-muted-foreground">
            Generate engaging captions for all your social media platforms
          </p>
        </div>
        <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
          <Bot className="w-4 h-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-card backdrop-blur-sm sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Caption Settings
              </CardTitle>
              <CardDescription>
                Customize your caption generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic">Topic/Subject</Label>
                <Input
                  id="topic"
                  placeholder="e.g., New product launch, Behind the scenes"
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select value={formData.platform} onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => {
                      const IconComponent = platform.icon;
                      return (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center gap-2">
                            <IconComponent className={`w-4 h-4 ${platform.color}`} />
                            {platform.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((tone) => (
                      <SelectItem key={tone} value={tone.toLowerCase()}>
                        {tone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry.toLowerCase()}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  placeholder="e.g., Young professionals, Fashion enthusiasts"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="key-points">Key Points</Label>
                <Textarea
                  id="key-points"
                  placeholder="Main points to highlight..."
                  value={formData.keyPoints}
                  onChange={(e) => setFormData(prev => ({ ...prev, keyPoints: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="cta">Call to Action</Label>
                <Input
                  id="cta"
                  placeholder="e.g., Shop now, Learn more, Sign up"
                  value={formData.callToAction}
                  onChange={(e) => setFormData(prev => ({ ...prev, callToAction: e.target.value }))}
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-primary"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Caption
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Generated Captions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Generated Captions</CardTitle>
              <CardDescription>
                Your AI-generated captions ({generatedCaptions.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {generatedCaptions.map((caption, index) => {
                  const platform = platforms.find(p => p.label === caption.platform);
                  const IconComponent = platform?.icon || MessageSquare;
                  
                  return (
                    <motion.div
                      key={caption.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-border rounded-lg p-6 bg-background/50 space-y-4"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconComponent className={`w-5 h-5 ${platform?.color || 'text-primary'}`} />
                          </div>
                          <div>
                            <h4 className="font-medium">{caption.platform}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {caption.tone}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {caption.engagement}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => copyCaption(caption)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => regenerateCaption(caption.id)}>
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Caption:</p>
                          <p className="text-foreground leading-relaxed">{caption.content}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            Hashtags:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {caption.hashtags.map((hashtag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {hashtag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                        Generated {caption.createdAt.toLocaleDateString()} at {caption.createdAt.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  );
                })}
                
                {generatedCaptions.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No captions generated yet</h3>
                    <p className="text-sm">Fill out the form and click "Generate Caption" to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}