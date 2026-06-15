<template>
  <section id="gift" class="section gift-section" aria-labelledby="gift-title">
    <div class="section__inner gift-section__inner">
      <SectionHeading eyebrow="Wedding Gift" title="Tanda Kasih" id="gift-title">
        Kehadiran dan doa adalah hadiah terbaik. Bila ingin menitipkan tanda kasih, berikut
        informasi yang dapat digunakan.
      </SectionHeading>

      <div class="gift-section__layout">
        <GlassCard class="gift-section__account">
          <p>Bank Syariah Indonesia</p>
          <h3>{{ accountNumber }}</h3>
          <span>a.n. Adi Dwi Saputra</span>
          <button class="primary-button" type="button" @click="copyAccount">
            {{ copied ? 'Nomor Tersalin' : 'Salin Nomor' }}
          </button>
        </GlassCard>

        <GlassCard class="gift-section__qr-card">
          <div class="gift-section__qr" role="img" aria-label="Placeholder QR code wedding gift">
            <span v-for="index in 36" :key="index" :class="{ active: qrPattern.includes(index) }" />
          </div>
          <p>Placeholder QRIS</p>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'

const accountNumber = '1234 5678 9012'
const copied = ref(false)
const qrPattern = [1, 2, 3, 6, 7, 9, 12, 13, 15, 16, 19, 21, 22, 24, 25, 27, 30, 31, 33, 34, 35, 36]

async function copyAccount() {
  await navigator.clipboard?.writeText(accountNumber.replaceAll(' ', ''))
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1800)
}

// TODO: tambahkan subtle glow pada QR saat section masuk viewport.
</script>

<style scoped>
.gift-section {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(245, 230, 204, 0.22)),
    var(--color-background);
}

.gift-section__inner {
  max-width: 880px;
}

.gift-section__layout {
  display: grid;
  gap: 1rem;
}

.gift-section__account {
  display: grid;
  gap: 0.85rem;
}

.gift-section__account p,
.gift-section__qr-card p {
  margin: 0;
  color: var(--color-text-secondary);
  font-weight: 700;
}

.gift-section__account h3 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: clamp(2rem, 10vw, 3.2rem);
  line-height: 1;
}

.gift-section__account span {
  color: var(--color-text-primary);
}

.gift-section__account button {
  justify-self: start;
}

.gift-section__qr-card {
  display: grid;
  place-items: center;
  gap: 1rem;
}

.gift-section__qr {
  display: grid;
  width: min(100%, 12rem);
  aspect-ratio: 1;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.3rem;
  border: 1px solid rgba(201, 168, 76, 0.56);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  background: var(--color-surface);
}

.gift-section__qr span {
  border-radius: 2px;
  background: rgba(64, 157, 221, 0.12);
}

.gift-section__qr span.active {
  background: var(--color-primary);
}

@media (min-width: 720px) {
  .gift-section__layout {
    grid-template-columns: 1.45fr 0.85fr;
    align-items: stretch;
  }
}
</style>
