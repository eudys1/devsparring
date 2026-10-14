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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      entrevistas: {
        Row: {
          creada_en: string
          empresa: string
          fecha: string
          formato: string | null
          id: string
          nivel: string | null
          notas: string | null
          preguntas: string[]
          resultado: string | null
          rol: string | null
          user_id: string
        }
        Insert: {
          creada_en?: string
          empresa: string
          fecha?: string
          formato?: string | null
          id?: string
          nivel?: string | null
          notas?: string | null
          preguntas?: string[]
          resultado?: string | null
          rol?: string | null
          user_id: string
        }
        Update: {
          creada_en?: string
          empresa?: string
          fecha?: string
          formato?: string | null
          id?: string
          nivel?: string | null
          notas?: string | null
          preguntas?: string[]
          resultado?: string | null
          rol?: string | null
          user_id?: string
        }
        Relationships: []
      }
      perfiles: {
        Row: {
          actualizado_en: string
          creado_en: string
          idioma: string
          nivel_por_defecto: string
          nombre: string | null
          pistas_foco: string[]
          rol_objetivo: string
          user_id: string
        }
        Insert: {
          actualizado_en?: string
          creado_en?: string
          idioma?: string
          nivel_por_defecto?: string
          nombre?: string | null
          pistas_foco?: string[]
          rol_objetivo?: string
          user_id: string
        }
        Update: {
          actualizado_en?: string
          creado_en?: string
          idioma?: string
          nivel_por_defecto?: string
          nombre?: string | null
          pistas_foco?: string[]
          rol_objetivo?: string
          user_id?: string
        }
        Relationships: []
      }
      repasos: {
        Row: {
          elapsed_days: number
          id: string
          modelo: string | null
          nota: number
          pregunta_id: string
          puntuacion: number | null
          repasada_en: string
          respuesta_id: string | null
          state: number
          user_id: string
          version_rubrica: number | null
        }
        Insert: {
          elapsed_days?: number
          id?: string
          modelo?: string | null
          nota: number
          pregunta_id: string
          puntuacion?: number | null
          repasada_en?: string
          respuesta_id?: string | null
          state: number
          user_id: string
          version_rubrica?: number | null
        }
        Update: {
          elapsed_days?: number
          id?: string
          modelo?: string | null
          nota?: number
          pregunta_id?: string
          puntuacion?: number | null
          repasada_en?: string
          respuesta_id?: string | null
          state?: number
          user_id?: string
          version_rubrica?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "repasos_respuesta_id_fkey"
            columns: ["respuesta_id"]
            isOneToOne: false
            referencedRelation: "respuestas"
            referencedColumns: ["id"]
          },
        ]
      }
      respuestas: {
        Row: {
          correccion: Json | null
          creada_en: string
          duracion_ms: number | null
          id: string
          modelo: string | null
          pregunta_id: string
          pregunta_version: number
          puntuacion: number | null
          respuesta: string
          resultado_tests: Json | null
          sesion_id: string
          user_id: string
          version_rubrica: number | null
        }
        Insert: {
          correccion?: Json | null
          creada_en?: string
          duracion_ms?: number | null
          id?: string
          modelo?: string | null
          pregunta_id: string
          pregunta_version: number
          puntuacion?: number | null
          respuesta: string
          resultado_tests?: Json | null
          sesion_id: string
          user_id: string
          version_rubrica?: number | null
        }
        Update: {
          correccion?: Json | null
          creada_en?: string
          duracion_ms?: number | null
          id?: string
          modelo?: string | null
          pregunta_id?: string
          pregunta_version?: number
          puntuacion?: number | null
          respuesta?: string
          resultado_tests?: Json | null
          sesion_id?: string
          user_id?: string
          version_rubrica?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "respuestas_sesion_id_fkey"
            columns: ["sesion_id"]
            isOneToOne: false
            referencedRelation: "sesiones"
            referencedColumns: ["id"]
          },
        ]
      }
      sesiones: {
        Row: {
          id: string
          idioma: string
          iniciada_en: string
          modo: string
          nivel: string
          pista: string | null
          pistas: string[] | null
          semilla: number
          terminada_en: string | null
          user_id: string
        }
        Insert: {
          id?: string
          idioma?: string
          iniciada_en?: string
          modo: string
          nivel: string
          pista?: string | null
          pistas?: string[] | null
          semilla: number
          terminada_en?: string | null
          user_id: string
        }
        Update: {
          id?: string
          idioma?: string
          iniciada_en?: string
          modo?: string
          nivel?: string
          pista?: string | null
          pistas?: string[] | null
          semilla?: number
          terminada_en?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tarjetas: {
        Row: {
          actualizada_en: string
          difficulty: number
          due: string
          elapsed_days: number
          lapses: number
          last_review: string | null
          learning_steps: number
          pregunta_id: string
          reps: number
          scheduled_days: number
          stability: number
          state: number
          user_id: string
        }
        Insert: {
          actualizada_en?: string
          difficulty: number
          due: string
          elapsed_days?: number
          lapses?: number
          last_review?: string | null
          learning_steps?: number
          pregunta_id: string
          reps?: number
          scheduled_days?: number
          stability: number
          state?: number
          user_id: string
        }
        Update: {
          actualizada_en?: string
          difficulty?: number
          due?: string
          elapsed_days?: number
          lapses?: number
          last_review?: string | null
          learning_steps?: number
          pregunta_id?: string
          reps?: number
          scheduled_days?: number
          stability?: number
          state?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      borrar_mi_cuenta: { Args: never; Returns: undefined }
      latido: { Args: never; Returns: string }
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
  public: {
    Enums: {},
  },
} as const
