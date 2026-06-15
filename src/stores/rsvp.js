import { defineStore } from 'pinia'

import { useSupabase } from '@/composables/useSupabase'

export const useRsvpStore = defineStore('rsvp', {
  state: () => ({
    status: '',
    guestCount: 1,
    isSubmitting: false,
    error: null,
  }),
  actions: {
    async submitRsvp(payload) {
      this.isSubmitting = true
      this.error = null

      try {
        const { saveRsvp } = useSupabase()
        const result = await saveRsvp(payload)
        this.status = result?.status || payload.status
        this.guestCount = result?.guest_count || payload.guest_count || 1
      } catch (error) {
        this.error = error.message
      } finally {
        this.isSubmitting = false
      }
    },
  },
})
