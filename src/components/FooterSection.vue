<template>
  <footer
    id="footer"
    class="section footer-section"
    aria-labelledby="footer-title"
  >
    <img
      :src="floralOrnament"
      class="footer-section__ornament footer-section__ornament--left"
      alt=""
      aria-hidden="true"
    />
    <img
      :src="floralOrnament"
      class="footer-section__ornament footer-section__ornament--right"
      alt=""
      aria-hidden="true"
    />

    <div class="section__inner footer-section__inner">
      <div class="footer-section__top-divider" aria-hidden="true">
        <span></span>
        <i>♡</i>
        <span></span>
      </div>

      <p class="footer-section__eyebrow">Terima Kasih</p>

      <h2 id="footer-title" class="footer-section__title">
        Jazakumullahu
        <span>Khairan</span>
      </h2>

      <p class="footer-section__lead">
        Merupakan kehormatan dan kebahagiaan bagi kami apabila
        <strong>{{ guestStore.displayName }}</strong>
        berkenan hadir serta memberikan doa restu.
      </p>

      <div class="footer-section__middle-divider" aria-hidden="true">
        <span></span>
        <i>✦</i>
        <span></span>
      </div>

      <p class="footer-section__prayer">
        Semoga Allah menghimpun yang terserak dari keduanya, memberkahi setiap langkah,
        dan menjadikan keluarga ini berada dalam kebaikan.
      </p>

      <div class="footer-section__names">
        <span>Adi Dwi Saputra</span>
        <small>&amp;</small>
        <span>Zahro Annisa</span>
      </div>

      <div class="footer-section__curve-divider" aria-hidden="true">
        <span></span>
        <i>♡</i>
        <span></span>
      </div>

      <!-- CREDIT: lebih subtle, tidak mencolok -->
      <div class="footer-section__credit">
        <span class="footer-section__credit-text">
          <small>Digital Invitation by</small>
          <strong>Adi Dwi Saputra</strong>
        </span>
      </div>

      <div class="footer-section__bottom-line" aria-hidden="true">
        <span></span>
        <i>✦</i>
        <span></span>
      </div>

      <!-- Penutup yang lebih elegan -->
      <p class="footer-section__closing-note">
        <span class="footer-section__arabic">بارك الله فيكم</span>
        <span class="footer-section__transliteration">Barakallahu fiikum</span>
        <span class="footer-section__meaning">semoga Allah melimpahkan keberkahan kepada kalian semua</span>
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useGuestStore } from '@/stores/guest'
import floralOrnament from '@/assets/images/topleft-blossom-gold.png'

const guestStore = useGuestStore()
</script>

<style scoped>
.footer-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 100vh;
  color: #fff;
  background:
    radial-gradient(circle at 50% 0%, rgba(203, 227, 255, 0.42), transparent 26rem),
    radial-gradient(circle at 18% 80%, rgba(88, 140, 211, 0.22), transparent 18rem),
    radial-gradient(circle at 82% 28%, rgba(133, 185, 235, 0.16), transparent 16rem),
    linear-gradient(180deg, #7da8dd 0%, #2e5f9f 36%, #163f77 100%);
  text-align: center;
}

.footer-section::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 10% 15%, rgba(255, 255, 255, 0.8) 0 2px, transparent 3px),
    radial-gradient(circle at 22% 23%, rgba(255, 247, 213, 0.75) 0 2px, transparent 3px),
    radial-gradient(circle at 88% 18%, rgba(255, 255, 255, 0.8) 0 2px, transparent 3px),
    radial-gradient(circle at 83% 28%, rgba(255, 247, 213, 0.75) 0 2px, transparent 3px),
    radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.8) 0 2px, transparent 3px),
    radial-gradient(circle at 7% 30%, rgba(255, 255, 255, 0.7) 0 2px, transparent 3px);
  opacity: 0.8;
}

.footer-section__inner {
  position: relative;
  z-index: 2;
  max-width: 780px;
  padding-top: 0;
  padding-bottom: 0;
}

.footer-section__ornament {
  position: absolute;
  z-index: 1;
  width: clamp(12rem, 30vw, 18rem);
  opacity: 0.24;
  pointer-events: none;
  user-select: none;
  filter: blur(0.3px);
}

.footer-section__ornament--left {
  left: -4rem;
  top: 42%;
  transform: rotate(-8deg);
}

.footer-section__ornament--right {
  right: -4rem;
  top: 42%;
  transform: rotate(96deg) scaleX(-1);
}

.footer-section__top-divider,
.footer-section__middle-divider,
.footer-section__curve-divider,
.footer-section__bottom-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: min(100%, 20rem);
  margin-inline: auto;
  color: #f0d08a;
}

.footer-section__top-divider {
  margin-bottom: 1.8rem;
}

.footer-section__middle-divider {
  margin-top: 1rem;
  margin-bottom: 1.2rem;
  width: min(100%, 12rem);
}

.footer-section__curve-divider {
  margin-top: 1.9rem;
  margin-bottom: 2rem;
  width: min(100%, 34rem);
}

.footer-section__bottom-line {
  margin-top: 1.8rem;
  margin-bottom: 1.2rem;
  width: min(100%, 20rem);
}

.footer-section__top-divider span,
.footer-section__middle-divider span,
.footer-section__curve-divider span,
.footer-section__bottom-line span {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(240, 208, 138, 0.85), transparent);
}

.footer-section__top-divider i,
.footer-section__middle-divider i,
.footer-section__curve-divider i,
.footer-section__bottom-line i {
  font-style: normal;
  line-height: 1;
}

.footer-section__eyebrow {
  margin: 0 0 1rem;
  color: #f4deb0;
  font-size: clamp(0.85rem, 2.5vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.footer-section__title {
  margin: 0;
  color: #fff7ea;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(3rem, 12vw, 5.4rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-shadow: 0 2px 12px rgba(10, 31, 70, 0.18);
}

.footer-section__title span {
  display: block;
}

.footer-section__lead,
.footer-section__prayer {
  max-width: 40rem;
  margin-inline: auto;
  color: rgba(255, 255, 255, 0.94);
  font-size: clamp(1.02rem, 3vw, 1.35rem);
  line-height: 1.72;
}

.footer-section__lead {
  margin-top: 1.35rem;
}

.footer-section__prayer {
  margin-top: 0;
}

.footer-section__lead strong {
  color: #ffffff;
  font-weight: 700;
}

.footer-section__names {
  margin-top: 2rem;
  color: #f7dec0;
  font-family: var(--font-script, 'Great Vibes', 'Allura', cursive);
  font-size: clamp(2.2rem, 8vw, 3.8rem);
  line-height: 1.15;
  text-shadow: 0 2px 10px rgba(10, 31, 70, 0.15);
}

.footer-section__names span {
  display: block;
}

.footer-section__names small {
  display: block;
  margin: 0.2rem 0;
  color: #fff1d3;
  font-family: var(--font-heading, Georgia, serif);
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  line-height: 1;
}

/* ===== CREDIT ===== */
/* Diperhalus: tidak mencolok, warna lembut, tanpa border tebal */
.footer-section__credit {
  display: inline-block;
  margin-top: 0.8rem;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.25s ease;
}

.footer-section__credit:hover {
  background: rgba(255, 255, 255, 0.12);
}

.footer-section__credit-text {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.footer-section__credit-text small {
  font-size: inherit;
  opacity: 0.7;
}

.footer-section__credit-text strong {
  color: rgba(255, 255, 255, 0.92);
  font-weight: 600;
  font-size: 0.85rem;
}

/* ===== CLOSING NOTE (elegan, islami) ===== */
.footer-section__closing-note {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin: 0.6rem 0 0;
  color: rgba(255, 244, 222, 0.85);
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  line-height: 1.6;
}

.footer-section__arabic {
  font-family: 'Traditional Arabic', 'Amiri', 'Scheherazade New', serif;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  line-height: 1.3;
  color: #f7dec0;
  letter-spacing: 0.04em;
}

.footer-section__transliteration {
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgba(255, 244, 222, 0.8);
}

.footer-section__meaning {
  font-size: clamp(0.8rem, 1.8vw, 0.95rem);
  font-weight: 300;
  color: rgba(255, 244, 222, 0.6);
  letter-spacing: 0.04em;
}

@media (max-width: 700px) {
  .footer-section__ornament {
    width: 12rem;
    opacity: 0.18;
  }

  .footer-section__ornament--left {
    left: -5rem;
    top: 48%;
  }

  .footer-section__ornament--right {
    right: -5rem;
    top: 48%;
  }

  .footer-section__curve-divider {
    width: min(100%, 24rem);
  }

  .footer-section__credit {
    padding: 0.3rem 1rem;
  }

  .footer-section__credit-text {
    font-size: 0.75rem;
  }
}

@media (max-width: 430px) {
  .footer-section {
    min-height: auto;
  }

  .footer-section__inner {
    padding-top: 2.8rem;
    padding-bottom: 3.2rem;
  }

  .footer-section__lead,
  .footer-section__prayer {
    font-size: 0.98rem;
    line-height: 1.66;
  }

  .footer-section__credit {
    padding: 0.25rem 0.8rem;
  }

  .footer-section__credit-text {
    font-size: 0.7rem;
    gap: 0.3rem;
  }

  .footer-section__closing-note {
    gap: 0.1rem;
  }

  .footer-section__arabic {
    font-size: 1.5rem;
  }

  .footer-section__transliteration {
    font-size: 0.8rem;
  }

  .footer-section__meaning {
    font-size: 0.75rem;
  }
}
</style>