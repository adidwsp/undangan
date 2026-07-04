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

      <a
        class="footer-section__credit"
        href="https://www.instagram.com/adi.dwsp/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buka Instagram Adi Dwi Saputra"
      >
        <span class="footer-section__credit-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" />
            <path d="M16.5 7.5h.01" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
        </span>

        <span class="footer-section__credit-text">
          <small>Digital invitation crafted with love by</small>
          <strong>Adi Dwi Saputra</strong>
        </span>
      </a>

      <div class="footer-section__bottom-line" aria-hidden="true">
        <span></span>
        <i>✦</i>
        <span></span>
      </div>

      <p class="footer-section__closing-note">
        With Love &amp; Gratitude
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
  margin-top: 2.2rem;
  width: min(100%, 32rem);
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

.footer-section__credit {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  width: min(100%, 28rem);
  padding: 1rem 1.2rem;
  border: 2px solid rgba(237, 198, 119, 0.85);
  border-radius: 999px;
  color: #1f3d69;
  text-decoration: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(245, 249, 255, 0.95));
  box-shadow:
    0 14px 28px rgba(18, 49, 95, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease;
}

.footer-section__credit:hover {
  transform: translateY(-2px);
  filter: brightness(1.01);
  box-shadow:
    0 18px 34px rgba(18, 49, 95, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.footer-section__credit-icon {
  display: grid;
  place-items: center;
  width: 4.2rem;
  aspect-ratio: 1;
  border-radius: 999px;
  color: #2b568f;
  background: linear-gradient(180deg, #ffffff, #edf4ff);
  box-shadow: 0 8px 18px rgba(38, 79, 134, 0.12);
  flex: 0 0 auto;
}

.footer-section__credit-icon svg {
  width: 1.6rem;
  height: 1.6rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.footer-section__credit-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.footer-section__credit-text small {
  color: #556c8f;
  font-size: 0.9rem;
  line-height: 1.45;
}

.footer-section__credit-text strong {
  color: #1f3d69;
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.4;
}

.footer-section__closing-note {
  margin: 1.2rem 0 0;
  color: rgba(255, 244, 222, 0.94);
  font-size: clamp(0.88rem, 2.4vw, 1rem);
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
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
    gap: 0.85rem;
    padding: 0.85rem 0.95rem;
  }

  .footer-section__credit-icon {
    width: 3.5rem;
  }

  .footer-section__credit-text small {
    font-size: 0.82rem;
  }

  .footer-section__credit-text strong {
    font-size: 0.9rem;
  }

  .footer-section__closing-note {
    letter-spacing: 0.22em;
    font-size: 0.8rem;
  }
}
</style>