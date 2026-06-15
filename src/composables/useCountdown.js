import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useCountdown(targetDate) {
  const now = ref(new Date())
  let timerId

  const remaining = computed(() => {
    const target = new Date(targetDate).getTime()
    const diff = Math.max(target - now.value.getTime(), 0)

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    return { days, hours, minutes, seconds }
  })

  onMounted(() => {
    timerId = window.setInterval(() => {
      now.value = new Date()
    }, 1000)
  })

  onBeforeUnmount(() => {
    if (timerId) window.clearInterval(timerId)
  })

  return { remaining }
}
