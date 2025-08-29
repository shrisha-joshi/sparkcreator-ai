import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, DollarSign, Users, BarChart3, Eye, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Campaign {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: number;
  start_date: string;
  end_date: string;
  performance_metrics: any;
  created_at: string;
}

const mockPerformanceData = [
  { date: '2024-01', impressions: 12000, engagement: 850 },
  { date: '2024-02', impressions: 15000, engagement: 1200 },
  { date: '2024-03', impressions: 18000, engagement: 1500 },
  { date: '2024-04', impressions: 22000, engagement: 1800 },
];

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    budget: '',
    start_date: '',
    end_date: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch campaigns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('campaigns')
        .insert([{
          ...newCampaign,
          budget: parseFloat(newCampaign.budget),
          user_id: user.id,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      setIsCreateModalOpen(false);
      setNewCampaign({ title: '', description: '', budget: '', start_date: '', end_date: '' });
      fetchCampaigns();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-muted text-muted-foreground', label: 'Draft' },
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      paused: { color: 'bg-warning text-warning-foreground', label: 'Paused' },
      completed: { color: 'bg-primary text-primary-foreground', label: 'Completed' },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Campaign Manager
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your influencer marketing campaigns and track performance
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  placeholder="Enter campaign title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  placeholder="Campaign description..."
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={newCampaign.start_date}
                    onChange={(e) => setNewCampaign({ ...newCampaign, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={newCampaign.end_date}
                    onChange={(e) => setNewCampaign({ ...newCampaign, end_date: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={createCampaign} className="w-full bg-gradient-primary">
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first campaign to start collaborating with creators
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {campaign.title}
                        {getStatusBadge(campaign.status)}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">{campaign.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-success" />
                        <span className="text-sm text-muted-foreground">Budget:</span>
                        <span className="font-semibold">${campaign.budget?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Duration:</span>
                        <span className="font-semibold">
                          {new Date(campaign.start_date).toLocaleDateString()} - 
                          {new Date(campaign.end_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">Creators:</span>
                        <span className="font-semibold">3 connected</span>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Performance Preview</span>
                      </div>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mockPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="impressions" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}