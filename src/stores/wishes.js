import { defineStore } from 'pinia'

import { useSupabase } from '@/composables/useSupabase'
import { hasSupabaseConfig, supabase } from '@/supabase/client'

export const useWishesStore = defineStore('wishes', {
  state: () => ({
    items: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
    channel: null,
  }),
  actions: {
    async loadWishes() {
      this.isLoading = true
      this.error = null

      try {
        const { fetchWishes } = useSupabase()
        this.items = await fetchWishes()
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    subscribeToWishes() {
      if (!hasSupabaseConfig || this.channel) return

      this.channel = supabase
        .channel('wishes-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'wishes' },
          (payload) => {
            const incoming = payload.new
            if (!this.items.some((item) => item.id === incoming.id)) {
              this.items.unshift(incoming)
            }
          },
        )
        .subscribe()
    },
    async addWish(payload) {
      this.isSubmitting = true
      this.error = null

      try {
        const { sendWish } = useSupabase()
        const wish = await sendWish(payload)

        if (!hasSupabaseConfig) {
          this.items.unshift(wish)
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.isSubmitting = false
      }
    },
    clearSubscription() {
      if (this.channel) {
        supabase.removeChannel(this.channel)
        this.channel = null
      }
    },
  },
})
