import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Clock,
  DollarSign,
  MessageSquare,
  Share2,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Active Campaigns",
    value: "12",
    change: "+20%",
    icon: Target,
    color: "text-blue-500",
  },
  {
    title: "Creator Partnerships",
    value: "48",
    change: "+15%",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Content Generated",
    value: "156",
    change: "+32%",
    icon: Zap,
    color: "text-purple-500",
  },
  {
    title: "ROI",
    value: "4.2x",
    change: "+8%",
    icon: DollarSign,
    color: "text-yellow-500",
  },
];

const campaignData = [
  { name: "Jan", campaigns: 4, roi: 3.2 },
  { name: "Feb", campaigns: 6, roi: 3.8 },
  { name: "Mar", campaigns: 8, roi: 4.1 },
  { name: "Apr", campaigns: 12, roi: 4.2 },
  { name: "May", campaigns: 10, roi: 3.9 },
  { name: "Jun", campaigns: 14, roi: 4.5 },
];

const recentActivities = [
  {
    action: "New campaign created",
    description: "Summer Collection Launch",
    time: "2 hours ago",
    icon: Target,
  },
  {
    action: "Content generated",
    description: "AI created 5 social media posts",
    time: "4 hours ago",
    icon: Zap,
  },
  {
    action: "Creator responded",
    description: "@fashionista_jane accepted partnership",
    time: "6 hours ago",
    icon: MessageSquare,
  },
  {
    action: "Post scheduled",
    description: "Instagram post scheduled for tomorrow",
    time: "8 hours ago",
    icon: Share2,
  },
];

export function Overview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your creator marketing.
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-card backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Your campaigns over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="campaigns"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle>ROI Trends</CardTitle>
            <CardDescription>Return on investment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your campaigns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Target className="w-4 h-4 mr-2" />
              Create New Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Discover Creators
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Zap className="w-4 h-4 mr-2" />
              Generate Content
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="w-4 h-4 mr-2" />
              Schedule Posts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Status */}
      <Card className="bg-gradient-card backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Subscription Status
          </CardTitle>
          <CardDescription>Free Plan - Upgrade to unlock more features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>AI Generations Used</span>
              <span>2 / 3</span>
            </div>
            <Progress value={66} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scheduled Posts</span>
              <span>1 / 3</span>
            </div>
            <Progress value={33} className="h-2" />
          </div>
          <Button className="w-full bg-gradient-primary">
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}