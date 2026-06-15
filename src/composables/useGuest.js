import { storeToRefs } from 'pinia'

import { useGuestStore } from '@/stores/guest'

export function useGuest() {
  const guestStore = useGuestStore()
  const refs = storeToRefs(guestStore)

  return {
    guestStore,
    ...refs,
  }
}
