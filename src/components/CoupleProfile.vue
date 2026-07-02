<template>
  <section id="profil" class="section profil-section" aria-labelledby="profil-title">
    <img
          src="@/assets/images/topleft-blossom-gold.png"
          class="profil-section__ornament profil-section__ornament--left"
          alt=""
          aria-hidden="true"
        />
        <!-- Ornamen bunga kanan -->
        <img
          src="@/assets/images/topleft-blossom-gold.png"
          class="profil-section__ornament profil-section__ornament--right"
          alt=""
          aria-hidden="true"
        />
    <div class="section__inner">
      <!-- INTRO -->
      <div class="profil-section__intro">
        <!-- Ornamen bunga kiri
        <img
          src="@/assets/images/topleft-blossom-gold.png"
          class="profil-section__ornament profil-section__ornament--left"
          alt=""
          aria-hidden="true"
        /> -->
        <!-- Ornamen bunga kanan -->
        <!-- <img
          src="@/assets/images/topleft-blossom-gold.png"
          class="profil-section__ornament profil-section__ornament--right"
          alt=""
          aria-hidden="true"
        /> -->

        <div class="profil-section__heading-oval">
          <SectionHeading
            eyebrow="Profil Mempelai"
            title="Dua Pribadi, Satu Tujuan"
            id="profil-title"
          >
            Berawal dari dua orang yang tidak saling mengenal, dipertemukan karena
            kesamaan cara pandang dalam melihat masa depan. Di atas perbedaan karakter
            yang saling melengkapi, komitmen tumbuh untuk memulai perjalanan baru ini
            bersama-sama.
          </SectionHeading>
        </div>
      </div>

      <!-- ZIG-ZAG LAYOUT -->
      <div class="profil-section__zigzag">
        <!-- ROW 1: Pria (text left, photo right) -->
        <div class="profil-section__row profil-section__row--groom">
          <div class="profil-section__item profil-section__item--text profil-section__item--groom-text">
            <div class="profil-section__content">
              <p class="profil-section__role">{{ people[0].role }}</p>
              <h3 class="profil-section__name">{{ people[0].name }}</h3>
              <div class="profil-section__details">
                <span v-for="item in people[0].details" :key="item" class="profil-section__detail">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

          <div class="profil-section__item profil-section__item--photo profil-section__item--groom-photo">
            <div class="profil-section__photo-wrapper">
              <div class="profil-section__photo-placeholder"></div>
              <img
                :src="frameBlossom"
                class="profil-section__frame"
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <!-- ROW 2: Ampersand -->
        <div class="profil-section__row profil-section__row--ampersand">
          <div class="profil-section__item profil-section__item--ampersand">
            <span class="profil-section__ampersand">&amp;</span>
          </div>
        </div>

        <!-- ROW 3: Wanita (photo left, text right) -->
        <div class="profil-section__row profil-section__row--bride">
          <div class="profil-section__item profil-section__item--photo profil-section__item--bride-photo">
            <div class="profil-section__photo-wrapper">
              <div class="profil-section__photo-placeholder"></div>
              <img
                :src="frameBlossom"
                class="profil-section__frame"
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>

          <div class="profil-section__item profil-section__item--text profil-section__item--bride-text">
            <div class="profil-section__content">
              <p class="profil-section__role">{{ people[1].role }}</p>
              <h3 class="profil-section__name">{{ people[1].name }}</h3>
              <div class="profil-section__details">
                <span v-for="item in people[1].details" :key="item" class="profil-section__detail">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import groomImage from '@/assets/images/groom-placeholder.webp'
import brideImage from '@/assets/images/bride-placeholder.webp'
import frameBlossom from '@/assets/images/frame-blossom.png'
import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FlowerDecoration from '@/components/common/FlowerDecoration.vue'

gsap.registerPlugin(ScrollTrigger)

const people = [
  {
    role: 'Mempelai Pria',
    name: 'Adi Dwi Saputra',
    image: groomImage,
    alt: 'Placeholder foto formal mempelai pria dengan jas putih',
    modifier: 'profil-section__photo--groom',
    details: ['Putra ke-2 dari Bapak Jupri dan Ibu Wasriyah'],
  },
  {
    role: 'Mempelai Wanita',
    name: 'Zahro Annisa',
    image: brideImage,
    alt: 'Placeholder foto formal mempelai wanita dengan gamis putih dan hijab syari',
    modifier: 'profil-section__photo--bride',
    details: ['Putri pertama dari Bapak Ghor Wignesworo dan Ibu Yusnani'],
  },
]

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.profil-section__zigzag',
      start: 'top 82%',
    },
  })

  tl.fromTo(
    '.profil-section__item--groom-text',
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
  )
    .fromTo(
      '.profil-section__item--groom-photo',
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3',
    )
    .fromTo(
      '.profil-section__item--ampersand',
      { opacity: 0, scale: 0.5, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' },
      '-=0.2',
    )
    .fromTo(
      '.profil-section__item--bride-photo',
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2',
    )
    .fromTo(
      '.profil-section__item--bride-text',
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.3',
    )
})
</script>

<style scoped>
/* ===== ZIG-ZAG LAYOUT ===== */
.profil-section__zigzag {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-top: 1.5rem;
}

.profil-section__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 62rem;
  align-items: center;
}

/* Ampersand row – single column centered */
.profil-section__row--ampersand {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-template-columns: none;
  width: auto;
  max-width: none;
  margin: 0.25rem 0;
}

/* ===== ITEMS ===== */
.profil-section__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profil-section__item--text {
  padding: 0.5rem 0;
}

/* Groom: text left, photo right */
.profil-section__row--groom .profil-section__item--groom-text {
  align-items: flex-start;
  text-align: left;
}
.profil-section__row--groom .profil-section__item--groom-photo {
  align-items: flex-end;
}

/* Bride: photo left, text right */
.profil-section__row--bride .profil-section__item--bride-photo {
  align-items: flex-start;
}
.profil-section__row--bride .profil-section__item--bride-text {
  align-items: flex-end;
  text-align: right;
}

/* ===== PHOTO WRAPPER ===== */
.profil-section__photo-wrapper {
  position: relative;
  width: 100%;
  max-width: 15rem;
  aspect-ratio: 420 / 520;
  border-radius: 1.2rem;
  overflow: visible;
  background: transparent;
}

/* Placeholder for AI cartoon image */
.profil-section__photo-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), transparent 60%),
    radial-gradient(circle at 70% 70%, rgba(114,199,247,0.15), transparent 50%),
    linear-gradient(145deg, #eaf6fe, #d4eaf8);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.5),
    0 8px 24px rgba(34,75,121,0.08);
  position: relative;
  z-index: 1;
}

/* Frame blossom – decorative overlay, larger than photo */
.profil-section__frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 130%;
  height: 130%;
  object-fit: contain;
  pointer-events: none;
  opacity: 0.75;
  filter: drop-shadow(0 4px 12px rgba(201,168,76,0.15));
}

/* ===== CONTENT ===== */
.profil-section__role {
  margin: 0 0 0.1rem;
  color: var(--color-secondary, #4a7a9c);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.profil-section__name {
  margin: 0 0 0.4rem;
  color: var(--color-primary, #1f4a6b);
  font-family: var(--font-heading, 'Georgia', serif);
  font-size: 1.75rem;
  line-height: 1.15;
  font-weight: 600;
}

.profil-section__details {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--color-text-secondary, #4a5f6e);
  font-size: 0.85rem;
  line-height: 1.5;
}

.profil-section__detail {
  display: block;
  position: relative;
  padding-left: 1rem;
}

/* .profil-section__detail::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--color-gold, #c9a84c);
  font-weight: 400;
} */

/* For bride (right-aligned) we move dash to right */
.profil-section__row--bride .profil-section__detail {
  padding-left: 0;
  padding-right: 1rem;
}
.profil-section__row--bride .profil-section__detail::before {
  left: auto;
  right: 0;
}

/* ===== AMPERSAND ===== */
.profil-section__ampersand {
  font-family: var(--font-heading, 'Georgia', serif);
  font-size: 4rem;
  font-weight: 300;
  color: var(--color-gold, #c9a84c);
  line-height: 1;
  text-shadow: 0 2px 16px rgba(201,168,76,0.2);
  letter-spacing: -0.02em;
}

/* ===== INTRO WITH ORNAMENTS ===== */
.profil-section__intro {
  position: relative;
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 18rem;
}

.profil-section__heading-oval {
  position: relative;
  z-index: 5;
  max-width: 44rem;
  width: min(100%, 44rem);
  padding: 2rem 2.5rem;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(114, 199, 247, 0.28);
  border-radius: 7rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 22px 44px rgba(34, 75, 121, 0.06);
  backdrop-filter: blur(14px);
}

.profil-section__intro :is(.section-heading) {
  margin: 0;
  text-align: center;
}

/* Ornamen bunga */
.profil-section__ornament {
  position: absolute;
  z-index: 3;
  pointer-events: none;
  opacity: 0.8;
  width: clamp(10rem, 20vw, 15rem);
  /* width: clamp(4rem, 10vw, 7rem); */
}

.profil-section__ornament--left {
  left: 0.5rem;
  top: 0.5rem;
  transform: rotate(-10deg);
}

.profil-section__ornament--right {
  right: 0.5rem;
  bottom: 0.5rem;
  transform: rotate(170deg) scaleX(-1);
}

/* FlowerDecoration tetap digunakan sebagai tambahan */
.profil-section__flowers {
  position: absolute;
  z-index: 2;
  pointer-events: none;
  opacity: 0.95;
}

.profil-section__flowers--left {
  left: 0;
  top: 0.5rem;
  width: clamp(8rem, 18vw, 12rem);
  transform: translate(-22%, -8%) rotate(-14deg);
}

.profil-section__flowers--right {
  right: 0;
  bottom: 0.25rem;
  width: clamp(10rem, 20vw, 14rem);
  transform: translate(18%, 4%) rotate(8deg);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .profil-section__photo-wrapper {
    max-width: 13rem;
  }
  .profil-section__name {
    font-size: 1.5rem;
  }
  .profil-section__details {
    font-size: 0.8rem;
  }
  .profil-section__ampersand {
    font-size: 3.4rem;
  }
  .profil-section__row {
    gap: 1.5rem;
    max-width: 52rem;
  }
}

@media (max-width: 820px) {
  .profil-section__photo-wrapper {
    max-width: 11rem;
  }
  .profil-section__name {
    font-size: 1.3rem;
  }
  .profil-section__details {
    font-size: 0.75rem;
  }
  .profil-section__ampersand {
    font-size: 2.8rem;
  }
  .profil-section__row {
    gap: 1rem;
    max-width: 44rem;
  }
}

@media (max-width: 700px) {
  .profil-section__zigzag {
    gap: 1.25rem;
  }

  .profil-section__row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 1rem;
    max-width: 100%;
    align-items: center;
  }

  .profil-section__row--groom .profil-section__item--groom-text,
  .profil-section__row--bride .profil-section__item--bride-text {
    align-items: flex-start !important;
    text-align: left !important;
    width: 100%;
  }

  .profil-section__row--bride .profil-section__item--bride-text {
    align-items: flex-end !important;
    text-align: right !important;
  }

  .profil-section__row--groom .profil-section__item--groom-photo,
  .profil-section__row--bride .profil-section__item--bride-photo {
    align-items: center !important;
  }

  .profil-section__photo-wrapper {
    max-width: 11rem;
  }

  .profil-section__name {
    font-size: 1.35rem;
  }
  .profil-section__details {
    font-size: 0.78rem;
  }
  .profil-section__ampersand {
    font-size: 3rem;
  }

  .profil-section__heading-oval {
    border-radius: 4rem;
    padding: 1.5rem 1.5rem;
  }

  .profil-section__flowers--left {
    width: clamp(5rem, 14vw, 8rem);
    transform: translate(-18%, -4%) rotate(-10deg);
  }
  .profil-section__flowers--right {
    width: clamp(6rem, 16vw, 9rem);
    transform: translate(14%, 2%) rotate(6deg);
  }
}

@media (max-width: 480px) {
  .profil-section__row {
    gap: 0.75rem;
  }

  .profil-section__photo-wrapper {
    max-width: 9.5rem;
  }
  .profil-section__name {
    font-size: 1.15rem;
  }
  .profil-section__details {
    font-size: 0.72rem;
  }
  .profil-section__ampersand {
    font-size: 2.7rem;
  }

  .profil-section__heading-oval {
    border-radius: 3rem;
    padding: 1.2rem 1rem;
  }
  .profil-section__intro {
    min-height: 14rem;
    margin-bottom: 1.5rem;
  }
  .profil-section__flowers--left {
    width: clamp(4rem, 12vw, 6rem);
    transform: translate(-12%, -2%) rotate(-8deg);
  }
  .profil-section__flowers--right {
    width: clamp(5rem, 14vw, 7rem);
    transform: translate(10%, 0) rotate(4deg);
  }
}
</style>