<template>
  <div v-if="isVisible" class="preloader" aria-live="polite" aria-label="Memuat undangan">
    <div class="preloader__card">
      <svg class="preloader__mark" viewBox="0 0 120 120" role="img" aria-hidden="true">
        <rect x="14" y="14" width="92" height="92" rx="24" />
        <path d="M36 82L60 40L84 82" />
        <path d="M48 82L60 64L72 82" />
      </svg>
      <p class="preloader__label">Menyiapkan undangan</p>
      <div class="preloader__bar" aria-hidden="true">
        <span />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['ready'])
const isVisible = ref(true)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.preloader__card', { opacity: 0, y: 20, duration: 0.45 })
    .from('.preloader__mark', { scale: 0.82, opacity: 0, duration: 0.7 }, '-=0.18')
    .from('.preloader__label', { y: 12, opacity: 0, duration: 0.45 }, '-=0.25')
    .from('.preloader__bar span', { width: '0%', duration: 0.95 }, '-=0.2')

  window.setTimeout(() => {
    gsap.to('.preloader__card', { opacity: 0, y: -18, duration: 0.45, ease: 'power2.inOut' })
    window.setTimeout(() => {
      isVisible.value = false
      emit('ready')
    }, 460)
  }, 1400)
})
</script>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.36), transparent 38%),
    linear-gradient(155deg, rgba(239, 249, 255, 0.98), rgba(240, 249, 255, 0.86));
}

.preloader__card {
  width: min(100%, 24rem);
  border: 1px solid rgba(64, 157, 221, 0.2);
  border-radius: 1.75rem;
  padding: 2rem 1.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 26px 70px rgba(31, 58, 95, 0.12);
  backdrop-filter: blur(16px);
}

.preloader__mark {
  width: 4.8rem;
  height: 4.8rem;
  margin: 0 auto 1rem;
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.preloader__label {
  margin: 0 0 0.8rem;
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.preloader__bar {
  overflow: hidden;
  height: 0.35rem;
  border-radius: 999px;
  background: rgba(64, 157, 221, 0.16);
}

.preloader__bar span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-primary), var(--color-sky), var(--color-secondary));
}
</style>
