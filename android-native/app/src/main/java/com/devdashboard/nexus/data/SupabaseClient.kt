package com.devdashboard.nexus.data

import io.github.jan_tennert.supabase.createSupabaseClient
import io.github.jan_tennert.supabase.postgrest.Postgrest
import io.github.jan_tennert.supabase.auth.Auth
import io.github.jan_tennert.supabase.realtime.Realtime

object SupabaseManager {
    const val SUPABASE_URL = "https://your-project-id.supabase.co"
    const val SUPABASE_KEY = "your-anon-key"

    val client = createSupabaseClient(
        supabaseUrl = SUPABASE_URL,
        supabaseKey = SUPABASE_KEY
    ) {
        install(Postgrest)
        install(Auth)
        install(Realtime)
    }
}
