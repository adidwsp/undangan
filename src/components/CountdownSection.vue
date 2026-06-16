<template>
  <section id="countdown" class="section countdown-section" aria-labelledby="countdown-title">
    <div class="section__inner">
      <SectionHeading eyebrow="Menuju Hari Akad" title="Menghitung Hari" id="countdown-title">
        Semoga setiap detik yang tersisa menjadi waktu untuk memperbaiki niat dan memperbanyak doa.
      </SectionHeading>

      <div class="countdown-section__grid" role="timer" aria-live="polite">
        <GlassCard v-for="item in countdownItems" :key="item.label" class="countdown-section__item">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

import { useCountdown } from '@/composables/useCountdown'
import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'

const { remaining } = useCountdown('2026-09-05T08:00:00+07:00')

const countdownItems = computed(() => [
  { label: 'Hari', value: remaining.value.days },
  { label: 'Jam', value: remaining.value.hours },
  { label: 'Menit', value: remaining.value.minutes },
  { label: 'Detik', value: remaining.value.seconds },
])

// TODO: pasang reveal counter dan micro interaction angka dengan GSAP.
</script>

<style scoped>
.countdown-section {
  background:
    radial-gradient(circle at 20% 25%, rgba(114, 199, 247, 0.42), transparent 18rem),
    radial-gradient(circle at 50% 8%, rgba(182, 219, 247, 0.3), transparent 20rem),
    radial-gradient(circle at 80% 70%, rgba(245, 230, 204, 0.5), transparent 18rem),
    var(--color-background);
}

.countdown-section__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.countdown-section__item {
  display: grid;
  min-height: 8rem;
  place-items: center;
  padding: 1rem 0.5rem;
  text-align: center;
}

.countdown-section__item strong {
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: clamp(2.15rem, 11vw, 4.7rem);
  line-height: 1;
}

.countdown-section__item span {
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

@media (min-width: 700px) {
  .countdown-section__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
