import { hasSupabaseConfig, supabase } from '@/supabase/client'

export function useSupabase() {
  function ensureSupabaseReady() {
    if (!hasSupabaseConfig) {
      console.warn('Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY/PUBLISHABLE_KEY.')
      return false
    }

    if (!supabase) {
      console.warn('Supabase client could not be created.')
      return false
    }

    return true
  }

  async function getGuestBySlug(slug) {
    if (!ensureSupabaseReady() || !slug) return null

    try {
      const { data, error } = await supabase
        .from('guests')
        .select('id, slug, name, attendance_status')
        .eq('slug', slug)
        .maybeSingle()

      if (error) {
        console.warn('Supabase guest lookup failed, using fallback.', error.message)
        return null
      }

      return data
    } catch (error) {
      console.warn('Supabase guest lookup failed, using fallback.', error.message)
      return null
    }
  }

  async function fetchWishes() {
    if (!ensureSupabaseReady()) return []

    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('id, guest_name, message, prayer, created_at')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.warn('Supabase wishes fetch failed, returning empty list.', error.message)
        return []
      }

      return data ?? []
    } catch (error) {
      console.warn('Supabase wishes fetch failed, returning empty list.', error.message)
      return []
    }
  }

  async function sendWish(payload) {
    if (!ensureSupabaseReady()) {
      return {
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...payload,
      }
    }

    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert(payload)
        .select('id, guest_name, message, prayer, created_at')
        .single()

      if (error) {
        console.warn('Supabase wish save failed, using local fallback.', error.message)
        return {
          id: `local-${Date.now()}`,
          created_at: new Date().toISOString(),
          ...payload,
        }
      }

      return data
    } catch (error) {
      console.warn('Supabase wish save failed, using local fallback.', error.message)
      return {
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...payload,
      }
    }
  }

  async function saveRsvp(payload) {
    if (!ensureSupabaseReady()) return { ...payload, id: `local-${Date.now()}` }

    const rsvpPayload = {
      guest_slug: payload.guest_slug || payload.guestSlug || 'guest',
      guest_name: payload.guest_name || payload.guestName || '',
      attendance_status: payload.attendance_status || payload.status || '',
    }

    try {
      const { data, error } = await supabase
        .from('rsvp')
        .upsert(rsvpPayload, { onConflict: 'guest_slug' })
        .select()
        .single()

      if (error) {
        console.warn('Supabase RSVP save failed, using local fallback.', error.message)
        return { ...payload, id: `local-${Date.now()}` }
      }

      return data ?? { ...payload, id: `local-${Date.now()}` }
    } catch (error) {
      console.warn('Supabase RSVP save failed, using local fallback.', error.message)
      return { ...payload, id: `local-${Date.now()}` }
    }
  }

  async function fetchGalleryAssets() {
    if (!ensureSupabaseReady()) return []

    try {
      const { data, error } = await supabase
        .from('gallery_assets')
        .select('id, title, url, alt, sort_order')
        .order('sort_order', { ascending: true })

      if (error) {
        console.warn('Supabase gallery fetch failed, returning empty list.', error.message)
        return []
      }

      return data ?? []
    } catch (error) {
      console.warn('Supabase gallery fetch failed, returning empty list.', error.message)
      return []
    }
  }

  return {
    getGuestBySlug,
    fetchWishes,
    sendWish,
    saveRsvp,
    fetchGalleryAssets,
  }
}
