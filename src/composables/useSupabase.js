import { hasSupabaseConfig, supabase } from '@/supabase/client'

export function useSupabase() {
  async function getGuestBySlug(slug) {
    if (!hasSupabaseConfig || !slug) return null

    const { data, error } = await supabase
      .from('guests')
      .select('id, slug, name, attendance_status')
      .eq('slug', slug)
      .maybeSingle()

    if (error) throw error
    return data
  }

  async function fetchWishes() {
    if (!hasSupabaseConfig) return []

    const { data, error } = await supabase
      .from('wishes')
      .select('id, guest_name, message, prayer, created_at')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data ?? []
  }

  async function sendWish(payload) {
    if (!hasSupabaseConfig) {
      return {
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...payload,
      }
    }

    const { data, error } = await supabase
      .from('wishes')
      .insert(payload)
      .select('id, guest_name, message, prayer, created_at')
      .single()

    if (error) throw error
    return data
  }

  async function saveRsvp(payload) {
    if (!hasSupabaseConfig) return { ...payload, id: `local-${Date.now()}` }

    const { data, error } = await supabase
      .from('rsvp')
      .upsert(payload, { onConflict: 'guest_slug' })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function fetchGalleryAssets() {
    if (!hasSupabaseConfig) return []

    const { data, error } = await supabase
      .from('gallery_assets')
      .select('id, title, url, alt, sort_order')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data ?? []
  }

  return {
    getGuestBySlug,
    fetchWishes,
    sendWish,
    saveRsvp,
    fetchGalleryAssets,
  }
}
