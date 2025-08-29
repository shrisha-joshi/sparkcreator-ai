-- Create comprehensive schema for InfluenceOS

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campaigns table
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  budget DECIMAL(10,2),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  target_audience JSONB,
  performance_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Content assets table
CREATE TABLE public.content_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  ai_caption TEXT,
  hashtags TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Social media posts table
CREATE TABLE public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_asset_id UUID REFERENCES public.content_assets(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  caption TEXT NOT NULL,
  hashtags TEXT[],
  platforms TEXT[] DEFAULT '{}',
  scheduled_for TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  performance_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Creators/Influencers table
CREATE TABLE public.creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  platform TEXT NOT NULL,
  followers_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  niche TEXT[],
  location TEXT,
  contact_email TEXT,
  rates JSONB DEFAULT '{}',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'busy', 'unavailable')),
  profile_image_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campaign-Creator relationships
CREATE TABLE public.campaign_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'invited' CHECK (status IN ('invited', 'accepted', 'declined', 'completed')),
  agreement_terms JSONB DEFAULT '{}',
  payment_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, creator_id)
);

-- Social media accounts table
CREATE TABLE public.social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  account_handle TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  account_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform, account_handle)
);

-- AI usage tracking
CREATE TABLE public.ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  usage_type TEXT NOT NULL CHECK (usage_type IN ('caption_generation', 'image_generation', 'content_analysis')),
  tokens_used INTEGER DEFAULT 0,
  cost DECIMAL(10,4) DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user-specific data
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own campaigns" ON public.campaigns
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own campaigns" ON public.campaigns
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own content assets" ON public.content_assets
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own content assets" ON public.content_assets
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own social posts" ON public.social_posts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own social posts" ON public.social_posts
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "All users can view creators" ON public.creators
  FOR SELECT USING (true);

CREATE POLICY "Users can view own campaign creators" ON public.campaign_creators
  FOR SELECT USING (campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage own campaign creators" ON public.campaign_creators
  FOR ALL USING (campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own social accounts" ON public.social_accounts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own social accounts" ON public.social_accounts
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own AI usage" ON public.ai_usage
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own AI usage" ON public.ai_usage
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin policies for testimonials
CREATE POLICY "All users can view approved testimonials" ON public.testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can insert own testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_content_assets_updated_at BEFORE UPDATE ON public.content_assets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON public.social_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_creators_updated_at BEFORE UPDATE ON public.creators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaign_creators_updated_at BEFORE UPDATE ON public.campaign_creators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON public.social_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.creators (name, handle, platform, followers_count, engagement_rate, niche, location, contact_email, profile_image_url, bio) VALUES
('Sarah Johnson', '@sarahjohnson', 'Instagram', 125000, 4.2, ARRAY['lifestyle', 'fashion'], 'Los Angeles, CA', 'sarah@example.com', 'https://images.unsplash.com/photo-1494790108755-2616b612b665?w=150', 'Lifestyle & fashion content creator passionate about sustainable living'),
('Mike Chen', '@mikechen', 'TikTok', 89000, 6.8, ARRAY['tech', 'gaming'], 'San Francisco, CA', 'mike@example.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'Tech reviewer and gaming enthusiast'),
('Emma Rodriguez', '@emmarod', 'YouTube', 250000, 3.5, ARRAY['fitness', 'health'], 'Miami, FL', 'emma@example.com', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Certified fitness trainer helping people achieve their health goals'),
('David Kim', '@davidkim', 'LinkedIn', 45000, 2.1, ARRAY['business', 'entrepreneurship'], 'New York, NY', 'david@example.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Business consultant and startup advisor'),
('Lisa Wang', '@lisawang', 'Instagram', 178000, 5.2, ARRAY['food', 'cooking'], 'Seattle, WA', 'lisa@example.com', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 'Food blogger and recipe developer specializing in Asian cuisine');