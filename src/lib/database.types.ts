export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      access_log: {
        Row: {
          city: string | null
          country: string | null
          datetime: string | null
          id: number
          language: string | null
          location: unknown | null
          os: string | null
          state: string | null
          time_spent: number | null
          title: string | null
          uf: string | null
          url_referrer: string
          user_agent: string | null
          user_id: string | null
          website_id: number | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          datetime?: string | null
          id?: number
          language?: string | null
          location?: unknown | null
          os?: string | null
          state?: string | null
          time_spent?: number | null
          title?: string | null
          uf?: string | null
          url_referrer: string
          user_agent?: string | null
          user_id?: string | null
          website_id?: number | null
        }
        Update: {
          city?: string | null
          country?: string | null
          datetime?: string | null
          id?: number
          language?: string | null
          location?: unknown | null
          os?: string | null
          state?: string | null
          time_spent?: number | null
          title?: string | null
          uf?: string | null
          url_referrer?: string
          user_agent?: string | null
          user_id?: string | null
          website_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "access_log_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_log_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "websites"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      websites: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          id: number
          name: string | null
          state: string | null
          url_domain: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          state?: string | null
          url_domain?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          state?: string | null
          url_domain?: string | null
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
