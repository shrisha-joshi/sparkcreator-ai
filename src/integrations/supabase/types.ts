export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_usage: {
        Row: {
          cost: number | null
          created_at: string
          id: string
          metadata: Json | null
          tokens_used: number | null
          usage_type: string
          user_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          tokens_used?: number | null
          usage_type: string
          user_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          tokens_used?: number | null
          usage_type?: string
          user_id?: string
        }
        Relationships: []
      }
      campaign_creators: {
        Row: {
          agreement_terms: Json | null
          campaign_id: string
          created_at: string
          creator_id: string
          id: string
          payment_amount: number | null
          status: string | null
          updated_at: string
        }
        Insert: {
          agreement_terms?: Json | null
          campaign_id: string
          created_at?: string
          creator_id: string
          id?: string
          payment_amount?: number | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          agreement_terms?: Json | null
          campaign_id?: string
          created_at?: string
          creator_id?: string
          id?: string
          payment_amount?: number | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_creators_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_creators_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          performance_metrics: Json | null
          start_date: string | null
          status: string | null
          target_audience: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          performance_metrics?: Json | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          performance_metrics?: Json | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content_assets: {
        Row: {
          ai_caption: string | null
          created_at: string
          file_size: number | null
          file_type: string
          file_url: string
          hashtags: string[] | null
          id: string
          metadata: Json | null
          status: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_caption?: string | null
          created_at?: string
          file_size?: number | null
          file_type: string
          file_url: string
          hashtags?: string[] | null
          id?: string
          metadata?: Json | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_caption?: string | null
          created_at?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          hashtags?: string[] | null
          id?: string
          metadata?: Json | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      creators: {
        Row: {
          bio: string | null
          contact_email: string | null
          created_at: string
          engagement_rate: number | null
          followers_count: number | null
          handle: string
          id: string
          location: string | null
          name: string
          niche: string[] | null
          platform: string
          profile_image_url: string | null
          rates: Json | null
          status: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          contact_email?: string | null
          created_at?: string
          engagement_rate?: number | null
          followers_count?: number | null
          handle: string
          id?: string
          location?: string | null
          name: string
          niche?: string[] | null
          platform: string
          profile_image_url?: string | null
          rates?: Json | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          contact_email?: string | null
          created_at?: string
          engagement_rate?: number | null
          followers_count?: number | null
          handle?: string
          id?: string
          location?: string | null
          name?: string
          niche?: string[] | null
          platform?: string
          profile_image_url?: string | null
          rates?: Json | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      social_accounts: {
        Row: {
          access_token: string | null
          account_data: Json | null
          account_handle: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          platform: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_data?: Json | null
          account_handle: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          platform: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_data?: Json | null
          account_handle?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          platform?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          campaign_id: string | null
          caption: string
          content_asset_id: string | null
          created_at: string
          hashtags: string[] | null
          id: string
          performance_data: Json | null
          platforms: string[] | null
          scheduled_for: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          campaign_id?: string | null
          caption: string
          content_asset_id?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          performance_data?: Json | null
          platforms?: string[] | null
          scheduled_for?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          campaign_id?: string | null
          caption?: string
          content_asset_id?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          performance_data?: Json | null
          platforms?: string[] | null
          scheduled_for?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_posts_content_asset_id_fkey"
            columns: ["content_asset_id"]
            isOneToOne: false
            referencedRelation: "content_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          content: string
          created_at: string
          id: string
          is_approved: boolean | null
          name: string
          rating: number | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          content: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          name: string
          rating?: number | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          content?: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          name?: string
          rating?: number | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
