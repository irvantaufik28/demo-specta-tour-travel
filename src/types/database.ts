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
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      media: {
        Row: {
          alt_text: string
          collection: string
          created_at: string
          created_by: string | null
          height: number | null
          id: string
          is_public: boolean
          mime_type: string | null
          size_bytes: number | null
          sort_order: number
          storage_bucket: string
          storage_path: string
          title: string | null
          updated_at: string
          width: number | null
        }
        Insert: {
          alt_text?: string
          collection?: string
          created_at?: string
          created_by?: string | null
          height?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          size_bytes?: number | null
          sort_order?: number
          storage_bucket?: string
          storage_path: string
          title?: string | null
          updated_at?: string
          width?: number | null
        }
        Update: {
          alt_text?: string
          collection?: string
          created_at?: string
          created_by?: string | null
          height?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          size_bytes?: number | null
          sort_order?: number
          storage_bucket?: string
          storage_path?: string
          title?: string | null
          updated_at?: string
          width?: number | null
        }
        Relationships: []
      }
      package_departures: {
        Row: {
          created_at: string
          created_by: string | null
          departure_city: string | null
          departure_date: string
          id: string
          is_public: boolean
          label: string | null
          notes: string | null
          package_id: string
          price: number | null
          price_label: string | null
          quota_remaining: number | null
          quota_total: number | null
          return_date: string | null
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          departure_city?: string | null
          departure_date: string
          id?: string
          is_public?: boolean
          label?: string | null
          notes?: string | null
          package_id: string
          price?: number | null
          price_label?: string | null
          quota_remaining?: number | null
          quota_total?: number | null
          return_date?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          departure_city?: string | null
          departure_date?: string
          id?: string
          is_public?: boolean
          label?: string | null
          notes?: string | null
          package_id?: string
          price?: number | null
          price_label?: string | null
          quota_remaining?: number | null
          quota_total?: number | null
          return_date?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_departures_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "travel_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_sections: {
        Row: {
          content: Json
          created_at: string
          created_by: string | null
          id: string
          is_visible: boolean
          page_id: string
          section_key: string
          sort_order: number
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_visible?: boolean
          page_id: string
          section_key: string
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_visible?: boolean
          page_id?: string
          section_key?: string
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          canonical_url: string | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          og_description: string | null
          og_image_path: string | null
          og_title: string | null
          robots_follow: boolean
          robots_index: boolean
          route_path: string
          seo_description: string | null
          seo_keywords: string[]
          seo_title: string | null
          slug: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          og_description?: string | null
          og_image_path?: string | null
          og_title?: string | null
          robots_follow?: boolean
          robots_index?: boolean
          route_path: string
          seo_description?: string | null
          seo_keywords?: string[]
          seo_title?: string | null
          slug: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          og_description?: string | null
          og_image_path?: string | null
          og_title?: string | null
          robots_follow?: boolean
          robots_index?: boolean
          route_path?: string
          seo_description?: string | null
          seo_keywords?: string[]
          seo_title?: string | null
          slug?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          additional: Json
          address: string | null
          created_at: string
          default_og_image_path: string | null
          default_seo_description: string | null
          default_seo_title: string | null
          email: string | null
          id: number
          instagram: string | null
          site_name: string
          site_url: string | null
          updated_at: string
          updated_by: string | null
          whatsapp: string | null
        }
        Insert: {
          additional?: Json
          address?: string | null
          created_at?: string
          default_og_image_path?: string | null
          default_seo_description?: string | null
          default_seo_title?: string | null
          email?: string | null
          id?: number
          instagram?: string | null
          site_name?: string
          site_url?: string | null
          updated_at?: string
          updated_by?: string | null
          whatsapp?: string | null
        }
        Update: {
          additional?: Json
          address?: string | null
          created_at?: string
          default_og_image_path?: string | null
          default_seo_description?: string | null
          default_seo_title?: string | null
          email?: string | null
          id?: number
          instagram?: string | null
          site_name?: string
          site_url?: string | null
          updated_at?: string
          updated_by?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      travel_packages: {
        Row: {
          cover_image_path: string | null
          created_at: string
          created_by: string | null
          currency: string
          destination: string
          duration: string | null
          excluded: Json
          extra: Json
          featured: boolean
          highlights: Json
          id: string
          included: Json
          itinerary: Json
          kind: string
          origin: string | null
          price_label: string | null
          price_options: Json
          published_at: string | null
          slug: string
          sort_order: number
          starting_price: number | null
          status: string
          summary: string
          title: string
          trip_type: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          cover_image_path?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          destination: string
          duration?: string | null
          excluded?: Json
          extra?: Json
          featured?: boolean
          highlights?: Json
          id?: string
          included?: Json
          itinerary?: Json
          kind: string
          origin?: string | null
          price_label?: string | null
          price_options?: Json
          published_at?: string | null
          slug: string
          sort_order?: number
          starting_price?: number | null
          status?: string
          summary?: string
          title: string
          trip_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          cover_image_path?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          destination?: string
          duration?: string | null
          excluded?: Json
          extra?: Json
          featured?: boolean
          highlights?: Json
          id?: string
          included?: Json
          itinerary?: Json
          kind?: string
          origin?: string | null
          price_label?: string | null
          price_options?: Json
          published_at?: string | null
          slug?: string
          sort_order?: number
          starting_price?: number | null
          status?: string
          summary?: string
          title?: string
          trip_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_cms_user: { Args: never; Returns: boolean }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
