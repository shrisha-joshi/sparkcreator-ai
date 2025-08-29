import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, CreditCard, MessageSquare, Search, Eye, Check, X, Crown, Star, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email?: string;
  created_at: string;
  full_name?: string;
  subscription_tier?: string;
  subscription_status?: string;
}

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have admin permissions",
          variant: "destructive",
        });
        return;
      }

      await Promise.all([fetchUsers(), fetchTestimonials()]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify admin access",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      // Note: In a real app, you'd need to use the Supabase Admin API to fetch auth.users
      // For demo purposes, we'll fetch profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const approveTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_approved: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial approved",
      });

      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve testimonial",
        variant: "destructive",
      });
    }
  };

  const rejectTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial rejected and deleted",
      });

      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject testimonial",
        variant: "destructive",
      });
    }
  };

  const getSubscriptionBadge = (tier: string) => {
    const tierConfig = {
      free: { color: 'bg-muted text-muted-foreground', label: 'Free' },
      pro: { color: 'bg-primary text-primary-foreground', label: 'Pro' },
      enterprise: { color: 'bg-gradient-primary text-primary-foreground', label: 'Enterprise' },
    };
    const config = tierConfig[tier as keyof typeof tierConfig] || tierConfig.free;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubscription = selectedSubscription === 'all' || 
                               user.subscription_tier === selectedSubscription;
    return matchesSearch && matchesSubscription;
  });

  const pendingTestimonials = testimonials.filter(t => !t.is_approved);
  const approvedTestimonials = testimonials.filter(t => t.is_approved);

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
          Admin Panel
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage users, subscriptions, and testimonials
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{users.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">
                {users.filter(u => u.subscription_tier === 'pro').length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Pro Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">
                {users.filter(u => u.subscription_tier === 'enterprise').length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Enterprise</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-warning" />
              <span className="text-2xl font-bold">{pendingTestimonials.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Pending Reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="testimonials">
            Testimonials
            {pendingTestimonials.length > 0 && (
              <Badge className="ml-2 bg-warning text-warning-foreground">
                {pendingTestimonials.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedSubscription} onValueChange={setSelectedSubscription}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.full_name || 'N/A'}</p>
                          <p className="text-sm text-muted-foreground">ID: {user.id.slice(0, 8)}...</p>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {getSubscriptionBadge(user.subscription_tier || 'free')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.subscription_status === 'active' ? 'default' : 'destructive'}>
                          {user.subscription_status || 'active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Pending Approval ({pendingTestimonials.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingTestimonials.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No pending testimonials
                  </p>
                ) : (
                  pendingTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title} at {testimonial.company}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">{testimonial.content}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => approveTestimonial(testimonial.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => rejectTestimonial(testimonial.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Approved Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Approved ({approvedTestimonials.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {approvedTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title} at {testimonial.company}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">Approved</Badge>
                    </div>
                    <p className="text-sm">{testimonial.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}