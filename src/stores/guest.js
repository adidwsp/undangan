import { defineStore } from 'pinia'

import { useSupabase } from '@/composables/useSupabase'

const defaultGuestName = 'Tamu Undangan'

function formatGuestNameFromSlug(slug) {
  if (!slug) {
    return defaultGuestName
  }

  const formatted = slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))

  return formatted.length ? formatted.join(' ') : defaultGuestName
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
      this.setSlug(slug)
      this.error = null

      if (!slug) {
        this.name = defaultGuestName
        this.attendanceStatus = ''
        return
      }

      this.isLoading = true

      const fallbackName = formatGuestNameFromSlug(slug)

      try {
        const { getGuestBySlug } = useSupabase()
        const guest = await getGuestBySlug(slug)

        this.name = guest?.name || fallbackName
        this.attendanceStatus = guest?.attendance_status || ''
      } catch (error) {
        this.error = error.message
        this.name = fallbackName
        this.attendanceStatus = ''
      } finally {
        this.isLoading = false
      }
    },
  },
})
