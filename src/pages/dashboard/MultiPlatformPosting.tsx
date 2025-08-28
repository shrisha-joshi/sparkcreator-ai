import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Share2, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  XCircle,
  Loader2,
  Image as ImageIcon,
  Video,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";

interface SocialAccount {
  id: string;
  platform: string;
  name: string;
  username: string;
  connected: boolean;
  avatar: string;
  followers: string;
}

interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledFor: Date;
  status: 'scheduled' | 'published' | 'failed';
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  createdAt: Date;
}

const platforms = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram, 
    color: 'text-pink-500',
    description: 'Share photos and stories'
  },
  { 
    id: 'twitter', 
    name: 'Twitter/X', 
    icon: Twitter, 
    color: 'text-blue-500',
    description: 'Share thoughts and updates'
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    icon: Linkedin, 
    color: 'text-blue-600',
    description: 'Professional networking'
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: Youtube, 
    color: 'text-red-500',
    description: 'Video content platform'
  },
  { 
    id: 'whatsapp', 
    name: 'WhatsApp Business', 
    icon: MessageCircle, 
    color: 'text-green-500',
    description: 'Business messaging'
  },
];

export function MultiPlatformPosting() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [postContent, setPostContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [postNow, setPostNow] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  const [socialAccounts] = useState<SocialAccount[]>([
    {
      id: '1',
      platform: 'instagram',
      name: 'My Brand',
      username: '@mybrand',
      connected: true,
      avatar: '/placeholder-avatar.jpg',
      followers: '10.2K',
    },
    {
      id: '2',
      platform: 'twitter',
      name: 'My Brand',
      username: '@mybrand',
      connected: true,
      avatar: '/placeholder-avatar.jpg',
      followers: '5.8K',
    },
    {
      id: '3',
      platform: 'linkedin',
      name: 'My Brand',
      username: 'My Brand Page',
      connected: false,
      avatar: '/placeholder-avatar.jpg',
      followers: '2.1K',
    },
    {
      id: '4',
      platform: 'youtube',
      name: 'My Brand',
      username: 'My Brand Channel',
      connected: false,
      avatar: '/placeholder-avatar.jpg',
      followers: '1.5K',
    },
    {
      id: '5',
      platform: 'whatsapp',
      name: 'My Brand Business',
      username: '+1234567890',
      connected: true,
      avatar: '/placeholder-avatar.jpg',
      followers: '500',
    },
  ]);

  const [scheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      content: '🚀 Exciting news! Our new product line is launching next week. Stay tuned for updates! #NewProduct #Innovation',
      platforms: ['instagram', 'twitter'],
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      status: 'scheduled',
      mediaType: 'image',
      createdAt: new Date(),
    },
    {
      id: '2',
      content: 'Behind the scenes of our latest photoshoot. The team worked incredibly hard to bring this vision to life! 📸',
      platforms: ['instagram', 'linkedin'],
      scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      status: 'scheduled',
      mediaType: 'video',
      createdAt: new Date(),
    },
    {
      id: '3',
      content: 'Thank you to everyone who attended our launch event! The response was incredible. 🎉',
      platforms: ['twitter', 'linkedin'],
      scheduledFor: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      status: 'published',
      createdAt: new Date(),
    },
  ]);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePost = async () => {
    if (!postContent.trim()) {
      toast.error("Please enter post content");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    setIsPosting(true);

    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      if (postNow) {
        toast.success(`Posted to ${selectedPlatforms.length} platform(s)!`);
      } else {
        toast.success("Post scheduled successfully!");
      }
      setPostContent('');
    }, 2000);
  };

  const getStatusIcon = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-500';
      case 'published':
        return 'bg-green-500/10 text-green-500';
      case 'failed':
        return 'bg-red-500/10 text-red-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Multi-Platform Posting</h1>
          <p className="text-muted-foreground">
            Post to multiple social media platforms simultaneously
          </p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Manage Accounts
        </Button>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Post</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Posts</TabsTrigger>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Compose */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Create Post
                  </CardTitle>
                  <CardDescription>
                    Compose your content for multiple platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="content">Post Content</Label>
                    <Textarea
                      id="content"
                      placeholder="What's on your mind? Share your thoughts with your audience..."
                      className="min-h-[120px]"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{postContent.length} characters</span>
                      <span>Max: 280 (Twitter), 2200 (Instagram), 1300 (LinkedIn)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Add Media (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        <Video className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop images or videos here
                      </p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="post-now">Post Now</Label>
                      <Switch
                        id="post-now"
                        checked={postNow}
                        onCheckedChange={setPostNow}
                      />
                    </div>

                    {!postNow && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Schedule Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={scheduleDate}
                                onSelect={setScheduleDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label htmlFor="schedule-time">Time</Label>
                          <Input
                            id="schedule-time"
                            type="time"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handlePost}
                    disabled={isPosting}
                    className="w-full bg-gradient-primary"
                  >
                    {isPosting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {postNow ? 'Posting...' : 'Scheduling...'}
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 mr-2" />
                        {postNow ? 'Post Now' : 'Schedule Post'}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Platform Selection */}
            <div className="space-y-6">
              <Card className="bg-gradient-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Select Platforms</CardTitle>
                  <CardDescription>
                    Choose where to publish your content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {platforms.map((platform) => {
                    const account = socialAccounts.find(acc => acc.platform === platform.id);
                    const isSelected = selectedPlatforms.includes(platform.id);
                    const IconComponent = platform.icon;
                    
                    return (
                      <div
                        key={platform.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:bg-muted/50'
                        } ${!account?.connected ? 'opacity-50' : ''}`}
                        onClick={() => account?.connected && handlePlatformToggle(platform.id)}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-5 h-5 ${platform.color}`} />
                          <div>
                            <p className="font-medium text-sm">{platform.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {account?.connected ? account.username : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {account?.connected ? (
                            <Badge variant={isSelected ? "default" : "outline"} className="text-xs">
                              {isSelected ? 'Selected' : 'Available'}
                            </Badge>
                          ) : (
                            <Button variant="outline" size="sm" className="text-xs">
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Preview */}
              {postContent && (
                <Card className="bg-gradient-card backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-background rounded border text-sm">
                      <p>{postContent}</p>
                      {selectedPlatforms.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {selectedPlatforms.map(platformId => {
                            const platform = platforms.find(p => p.id === platformId);
                            const IconComponent = platform?.icon || Share2;
                            return (
                              <IconComponent 
                                key={platformId} 
                                className={`w-4 h-4 ${platform?.color}`} 
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>
                Manage your upcoming and past posts ({scheduledPosts.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-border rounded-lg p-4 bg-background/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(post.status)}
                          <Badge className={`text-xs ${getStatusColor(post.status)}`}>
                            {post.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(post.scheduledFor, "MMM dd, yyyy 'at' h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-2">
                          {post.platforms.map(platformId => {
                            const platform = platforms.find(p => p.id === platformId);
                            const IconComponent = platform?.icon || Share2;
                            return (
                              <IconComponent 
                                key={platformId} 
                                className={`w-4 h-4 ${platform?.color}`} 
                              />
                            );
                          })}
                          {post.mediaType && (
                            <Badge variant="outline" className="text-xs">
                              {post.mediaType === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Manage your social media account connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialAccounts.map((account) => {
                  const platform = platforms.find(p => p.id === account.platform);
                  const IconComponent = platform?.icon || Share2;
                  
                  return (
                    <div key={account.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className={`w-5 h-5 ${platform?.color}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{account.name}</h4>
                          <p className="text-sm text-muted-foreground">{account.username}</p>
                          <p className="text-xs text-muted-foreground">{account.followers} followers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {account.connected ? (
                          <>
                            <Badge variant="outline" className="text-green-500 border-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                            <Button variant="outline" size="sm">
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button className="bg-gradient-primary">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}