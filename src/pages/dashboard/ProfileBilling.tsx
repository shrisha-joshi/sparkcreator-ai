import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User, CreditCard, Crown, Star, Zap, Settings, Save, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  website: string;
  subscription_tier: string;
  subscription_status: string;
}

export default function ProfileBilling() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setProfile(data);
      } else {
        // Create default profile
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            user_id: user.id,
            username: user.email?.split('@')[0] || 'user',
            full_name: '',
            bio: '',
            website: '',
          }])
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          full_name: profile.full_name,
          bio: profile.bio,
          website: profile.website,
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade Coming Soon",
      description: "Stripe integration will be implemented here",
    });
    setIsUpgradeModalOpen(false);
  };

  const getSubscriptionBadge = (tier: string) => {
    const tierConfig = {
      free: { color: 'bg-muted text-muted-foreground', label: 'Free', icon: User },
      pro: { color: 'bg-primary text-primary-foreground', label: 'Pro', icon: Crown },
      enterprise: { color: 'bg-gradient-primary text-primary-foreground', label: 'Enterprise', icon: Star },
    };
    const config = tierConfig[tier as keyof typeof tierConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Profile & Billing
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and subscription
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {profile.full_name ? profile.full_name[0] : profile.username[0]}
                  </div>
                  <Button size="sm" className="absolute -bottom-2 -right-2 w-8 h-8" variant="outline">
                    <Upload className="w-3 h-3" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold">{profile.full_name || profile.username}</h3>
                  <p className="text-sm text-muted-foreground">@{profile.username}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name || ''}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profile.website || ''}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <Button onClick={saveProfile} disabled={saving} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Subscription & Billing */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {getSubscriptionBadge(profile.subscription_tier)}
                <h3 className="font-semibold mt-2 capitalize">{profile.subscription_tier} Plan</h3>
                <p className="text-xl font-bold mt-1">
                  {profile.subscription_tier === 'free' ? '$0' : 
                   profile.subscription_tier === 'pro' ? '$29' : '$99'}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>AI Generations</span>
                  <span className="font-semibold">
                    {profile.subscription_tier === 'free' ? '10/50' : 
                     profile.subscription_tier === 'pro' ? '150/500' : 'Unlimited'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Campaigns</span>
                  <span className="font-semibold">
                    {profile.subscription_tier === 'free' ? '1/3' : 
                     profile.subscription_tier === 'pro' ? '5/20' : 'Unlimited'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Creator Database</span>
                  <span className="font-semibold">
                    {profile.subscription_tier === 'free' ? 'Limited' : 'Full Access'}
                  </span>
                </div>
              </div>

              {profile.subscription_tier === 'free' && (
                <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-primary">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upgrade Your Plan</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-2 border-primary">
                          <CardHeader className="text-center">
                            <Badge className="bg-primary text-primary-foreground w-fit mx-auto">
                              <Crown className="w-3 h-3 mr-1" />
                              Most Popular
                            </Badge>
                            <CardTitle>Pro Plan</CardTitle>
                            <div className="text-3xl font-bold">$29<span className="text-sm">/month</span></div>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              500 AI generations/month
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              20 campaigns
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Full creator database
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Advanced analytics
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="text-center">
                            <Badge variant="secondary" className="w-fit mx-auto">
                              <Star className="w-3 h-3 mr-1" />
                              Enterprise
                            </Badge>
                            <CardTitle>Enterprise</CardTitle>
                            <div className="text-3xl font-bold">$99<span className="text-sm">/month</span></div>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Unlimited AI generations
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Unlimited campaigns
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              White-label solution
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Priority support
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <Button onClick={handleUpgrade} className="w-full bg-gradient-primary">
                        Continue with Pro Plan
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AI Generations</span>
                  <span>10/50</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Campaigns</span>
                  <span>1/3</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Posts Scheduled</span>
                  <span>8/20</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}