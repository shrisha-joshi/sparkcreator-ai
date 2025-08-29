import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Users, TrendingUp, Plus, Instagram, Youtube, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Creator {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers_count: number;
  engagement_rate: number;
  niche: string[];
  location: string;
  contact_email: string;
  profile_image_url: string;
  bio: string;
  status: string;
}

const platformIcons = {
  Instagram: Instagram,
  YouTube: Youtube,
  TikTok: Users,
  LinkedIn: Users,
  Twitter: Twitter,
};

export default function CreatorDiscovery() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [minFollowers, setMinFollowers] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('followers_count', { ascending: false });

      if (error) throw error;
      setCreators(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch creators",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCampaign = async (creatorId: string) => {
    toast({
      title: "Success",
      description: "Creator added to campaign shortlist",
    });
  };

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || creator.platform === selectedPlatform;
    const matchesNiche = selectedNiche === 'all' || creator.niche.includes(selectedNiche);
    const matchesFollowers = !minFollowers || creator.followers_count >= parseInt(minFollowers);
    
    return matchesSearch && matchesPlatform && matchesNiche && matchesFollowers;
  });

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { color: 'bg-success text-success-foreground', label: 'Available' },
      busy: { color: 'bg-warning text-warning-foreground', label: 'Busy' },
      unavailable: { color: 'bg-destructive text-destructive-foreground', label: 'Unavailable' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Creator Discovery
        </h1>
        <p className="text-muted-foreground mt-2">
          Find and connect with the perfect creators for your campaigns
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="YouTube">YouTube</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedNiche} onValueChange={setSelectedNiche}>
              <SelectTrigger>
                <SelectValue placeholder="Niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Niches</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Min followers"
              type="number"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator, index) => {
          const PlatformIcon = platformIcons[creator.platform as keyof typeof platformIcons] || Users;
          
          return (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <img
                      src={creator.profile_image_url}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 border">
                      <PlatformIcon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{creator.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{creator.handle}</p>
                    {getStatusBadge(creator.status)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">{formatFollowers(creator.followers_count)}</p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-success" />
                      </div>
                      <p className="text-sm font-semibold">{creator.engagement_rate}%</p>
                      <p className="text-xs text-muted-foreground">Engagement</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <p className="text-sm font-semibold">{creator.location?.split(',')[0] || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">Location</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{creator.bio}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {creator.niche.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {creator.niche.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{creator.niche.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={() => addToCampaign(creator.id)}
                    className="w-full bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Campaign
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredCreators.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No creators found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search filters to find creators
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}