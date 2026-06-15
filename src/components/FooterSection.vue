<template>
  <footer id="footer" class="section footer-section" aria-labelledby="footer-title">
    <div class="section__inner footer-section__inner">
      <p class="section__eyebrow">Terima Kasih</p>
      <h2 id="footer-title" class="footer-section__title">Jazakumullahu Khairan</h2>
      <p>
        Merupakan kehormatan dan kebahagiaan bagi kami apabila
        {{ guestStore.displayName }} berkenan hadir serta memberikan doa restu.
      </p>
      <p>
        Semoga Allah menghimpun yang terserak dari keduanya, memberkahi setiap langkah,
        dan menjadikan keluarga ini berada dalam kebaikan.
      </p>
      <strong>Adi Dwi Saputra &amp; Zahro Annisa</strong>
    </div>
  </footer>
</template>

<script setup>
import { useGuestStore } from '@/stores/guest'

const guestStore = useGuestStore()

// TODO: tambahkan closing fade dan partikel halus di bagian penutup.
</script>

<style scoped>
.footer-section {
  min-height: 82vh;
  color: var(--color-surface);
  background:
    linear-gradient(180deg, rgba(34, 111, 174, 0.9), rgba(31, 58, 95, 0.96)),
    radial-gradient(circle at 50% 0%, rgba(114, 199, 247, 0.36), transparent 28rem),
    radial-gradient(circle at 18% 72%, rgba(201, 168, 76, 0.18), transparent 18rem),
    var(--color-primary);
  text-align: center;
}

.footer-section__inner {
  max-width: 760px;
}

.footer-section .section__eyebrow {
  color: var(--color-accent-cream);
}

.footer-section__title {
  margin: 0 0 1.2rem;
  color: var(--color-surface);
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 11vw, 5rem);
  line-height: 1.02;
}

.footer-section p {
  margin: 0 auto 1rem;
  color: rgba(255, 255, 255, 0.82);
}

.footer-section strong {
  display: block;
  margin-top: 1.8rem;
  color: var(--color-accent-cream);
  font-family: var(--font-heading);
  font-size: clamp(1.65rem, 8vw, 3rem);
  line-height: 1.1;
}
</style>
