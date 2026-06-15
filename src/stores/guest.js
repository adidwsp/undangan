import { defineStore } from 'pinia'

import { useSupabase } from '@/composables/useSupabase'

const defaultGuestName = 'Tamu Undangan'

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

      try {
        const { getGuestBySlug } = useSupabase()
        const guest = await getGuestBySlug(slug)

        this.name = guest?.name || defaultGuestName
        this.attendanceStatus = guest?.attendance_status || ''
      } catch (error) {
        this.error = error.message
        this.name = defaultGuestName
        this.attendanceStatus = ''
      } finally {
        this.isLoading = false
      }
    },
  },
})
