import { defineStore } from 'pinia'
import { useSupabase } from '@/composables/useSupabase'

const defaultGuestName = 'Tamu Undangan'

function formatGuestNameFromSlug(slug) {
  if (!slug) {
    console.warn('⚠️ formatGuestNameFromSlug: slug kosong')
    return defaultGuestName
  }

  const formatted = slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))

  const result = formatted.length ? formatted.join(' ') : defaultGuestName
  console.log('🔄 formatGuestNameFromSlug:', slug, '→', result)
  return result
}

export const useGuestStore = defineStore('guest', {
  state: () => ({
    slug: '',
    name: defaultGuestName,
    attendanceStatus: '',
    isLoading: false,
    error: null,
  }),
  getters: {
    displayName: (state) => state.name || defaultGuestName,
  },
  actions: {
    setSlug(slug) {
      this.slug = slug || ''
    },
    async loadGuest(slug) {
      console.log('📡 loadGuest dipanggil dengan slug:', slug)
      this.setSlug(slug)
      this.error = null

      if (!slug) {
        console.warn('⚠️ loadGuest: slug kosong, pakai default')
        this.name = defaultGuestName
        this.attendanceStatus = ''
        return
      }

      this.isLoading = true
      const fallbackName = formatGuestNameFromSlug(slug)

      try {
        const { getGuestBySlug } = useSupabase()
        const guest = await getGuestBySlug(slug)
        console.log('📦 Data dari Supabase:', guest)

        this.name = guest?.name || fallbackName
        this.attendanceStatus = guest?.attendance_status || ''
        console.log('✅ Nama akhir di store:', this.name)
      } catch (error) {
        console.error('❌ Error loadGuest:', error)
        this.error = error.message
        this.name = fallbackName
        this.attendanceStatus = ''
      } finally {
        this.isLoading = false
      }
    },
  },
})