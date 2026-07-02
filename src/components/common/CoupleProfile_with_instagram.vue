<template>
  <section
    id="profil"
    ref="profileSection"
    class="section profil-section"
    aria-labelledby="profil-title"
  >
    <!-- Main floral ornaments -->
    <img
      :src="floralOrnament"
      class="profil-section__ornament profil-section__ornament--top-left"
      alt=""
      aria-hidden="true"
    />
    <img
      :src="floralOrnament"
      class="profil-section__ornament profil-section__ornament--bottom-right"
      alt=""
      aria-hidden="true"
    />

    <div class="profil-section__shell">
      <div class="profil-section__glow profil-section__glow--left" aria-hidden="true"></div>
      <div class="profil-section__glow profil-section__glow--right" aria-hidden="true"></div>

      <div class="section__inner profil-section__inner">
        <!-- Intro / hero copy -->
        <header class="profil-section__intro-card">
          <p class="profil-section__eyebrow">Profil Mempelai</p>

          <h2 id="profil-title" class="profil-section__title">
            <span class="profil-section__title-main">Dua Pribadi,</span>
            <span class="profil-section__title-script">Satu Tujuan</span>
          </h2>

          <p class="profil-section__lead">
            Berawal dari dua orang yang tidak saling mengenal, dipertemukan karena
            kesamaan cara pandang dalam melihat masa depan. Di atas perbedaan karakter
            yang saling melengkapi, komitmen tumbuh untuk memulai perjalanan baru ini
            bersama-sama.
          </p>

          <div class="profil-section__divider" aria-hidden="true">
            <span></span>
            <i>♡</i>
            <span></span>
          </div>
        </header>

        <!-- Couple profile -->
        <div class="profil-section__couple">
          <!-- Groom: text left, image right -->
          <article class="profil-section__row profil-section__row--groom">
            <div class="profil-section__content profil-section__content--groom">
              <p class="profil-section__role">{{ people[0].role }}</p>
              <h3 class="profil-section__name">{{ people[0].name }}</h3>
              <p class="profil-section__details">{{ people[0].details }}</p>

              <a
                :href="people[0].instagramUrl"
                class="profil-section__instagram profil-section__instagram--groom"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Buka Instagram ${people[0].name}`"
              >
                <svg
                  class="profil-section__instagram-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Zm5-2.05a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
                  />
                </svg>
                <span>{{ people[0].instagram }}</span>
              </a>
            </div>

            <div class="profil-section__photo-wrap profil-section__photo-wrap--groom">
              <div class="profil-section__photo-card">
                <img
                  :src="people[0].image"
                  :alt="people[0].alt"
                  class="profil-section__person profil-section__person--groom"
                />
                <img
                  :src="frameBlossom"
                  class="profil-section__frame"
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>
          </article>

          <div class="profil-section__ampersand-wrap" aria-hidden="true">
            <span class="profil-section__ampersand">&amp;</span>
          </div>

          <!-- Bride: image left, text right -->
          <article class="profil-section__row profil-section__row--bride">
            <div class="profil-section__photo-wrap profil-section__photo-wrap--bride">
              <div class="profil-section__photo-card">
                <img
                  :src="people[1].image"
                  :alt="people[1].alt"
                  class="profil-section__person profil-section__person--bride"
                />
                <img
                  :src="frameBlossom"
                  class="profil-section__frame"
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>

            <div class="profil-section__content profil-section__content--bride">
              <p class="profil-section__role">{{ people[1].role }}</p>
              <h3 class="profil-section__name">{{ people[1].name }}</h3>
              <p class="profil-section__details">{{ people[1].details }}</p>

              <a
                :href="people[1].instagramUrl"
                class="profil-section__instagram profil-section__instagram--bride"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Buka Instagram ${people[1].name}`"
              >
                <svg
                  class="profil-section__instagram-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Zm5-2.05a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
                  />
                </svg>
                <span>{{ people[1].instagram }}</span>
              </a>
            </div>
          </article>
        </div>

        <!-- Closing invitation copy, mengikuti UI referensi pertama -->
        <footer class="profil-section__closing">
          <p>
            “Dengan penuh rasa syukur dan cinta,<br />
            kami mengundang Bapak/Ibu/Saudara/i<br />
            untuk menjadi bagian dari hari istimewa kami.”
          </p>
          <div class="profil-section__closing-divider" aria-hidden="true">
            <span></span>
            <i>♥</i>
            <span></span>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import groomImage from '@/assets/images/couple/male.png'
import brideImage from '@/assets/images/couple/female.png'
import frameBlossom from '@/assets/images/frame-blossom.png'
import floralOrnament from '@/assets/images/topleft-blossom-gold.png'

gsap.registerPlugin(ScrollTrigger)

const profileSection = ref(null)
let animationContext

const people = [
  {
    role: 'Mempelai Pria',
    name: 'Adi Dwi Saputra',
    image: groomImage,
    alt: 'Ilustrasi mempelai pria Adi Dwi Saputra',
    details: 'Putra ke-2 dari Bapak Jupri dan Ibu Wasriyah',
    instagram: '@adi.dwsp',
    instagramUrl: 'https://www.instagram.com/adi.dwsp/',
  },
  {
    role: 'Mempelai Wanita',
    name: 'Zahro Annisa',
    image: brideImage,
    alt: 'Ilustrasi mempelai wanita Zahro Annisa',
    details: 'Putri pertama dari Bapak Ghor Wignesworo dan Ibu Yusnani',
    instagram: '@zahro__annisa',
    instagramUrl: 'https://www.instagram.com/zahro__annisa/',
  },
]

onMounted(() => {
  animationContext = gsap.context(() => {
    gsap.fromTo(
      '.profil-section__intro-card',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.profil-section__intro-card',
          start: 'top 88%',
        },
      },
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.profil-section__couple',
        start: 'top 82%',
      },
    })

    tl.fromTo(
      '.profil-section__content--groom',
      { x: -36, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
    )
      .fromTo(
        '.profil-section__photo-wrap--groom',
        { x: 28, scale: 0.94, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.32',
      )
      .fromTo(
        '.profil-section__ampersand-wrap',
        { y: 20, scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.12',
      )
      .fromTo(
        '.profil-section__photo-wrap--bride',
        { x: -28, scale: 0.94, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.15',
      )
      .fromTo(
        '.profil-section__content--bride',
        { x: 36, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.3',
      )
      .fromTo(
        '.profil-section__closing',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.05',
      )
  }, profileSection)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<style scoped>
.profil-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #1f3f69;
  background:
    radial-gradient(circle at 4% 7%, rgba(255, 255, 255, 0.98) 0 9rem, transparent 17rem),
    radial-gradient(circle at 92% 25%, rgba(255, 255, 255, 0.88) 0 8rem, transparent 18rem),
    radial-gradient(circle at 12% 86%, rgba(155, 211, 246, 0.42) 0 9rem, transparent 17rem),
    linear-gradient(180deg, #f7fcff 0%, #eaf6fe 42%, #f8fcff 100%);
}

.profil-section::before,
.profil-section::after {
  content: '';
  position: absolute;
  z-index: -1;
  pointer-events: none;
}

.profil-section::before {
  inset: 0.85rem;
  border: 1px solid rgba(108, 157, 204, 0.25);
  border-radius: 0 0 5.5rem 0;
}

.profil-section::after {
  width: 18rem;
  height: 18rem;
  left: -8rem;
  top: 30%;
  border-radius: 999px;
  background: rgba(139, 199, 239, 0.16);
  filter: blur(4px);
}

.profil-section__shell {
  position: relative;
  min-height: 100%;
  padding: clamp(3rem, 8vw, 5rem) 0 clamp(4rem, 9vw, 6rem);
}

.profil-section__inner {
  position: relative;
  z-index: 2;
  width: min(100%, 48rem);
  margin: 0 auto;
  padding-inline: clamp(1.2rem, 4vw, 3rem);
}

.profil-section__glow {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.74);
  filter: blur(10px);
}

.profil-section__glow--left {
  width: 17rem;
  height: 17rem;
  left: -8rem;
  top: 37%;
}

.profil-section__glow--right {
  width: 14rem;
  height: 14rem;
  right: -7rem;
  bottom: 10%;
}

.profil-section__ornament {
  position: absolute;
  z-index: 4;
  pointer-events: none;
  user-select: none;
  width: clamp(9rem, 26vw, 16rem);
  opacity: 0.95;
  filter: drop-shadow(0 12px 20px rgba(42, 88, 136, 0.08));
}

.profil-section__ornament--top-left {
  top: -0.7rem;
  left: -1.4rem;
  transform: rotate(-6deg);
}

.profil-section__ornament--bottom-right {
  right: 1rem;
  bottom: -1.1rem;
  transform: rotate(90deg) scaleX(-1);
}

.profil-section__intro-card {
  position: relative;
  width: min(100%, 42rem);
  margin: 0 auto clamp(3.4rem, 8vw, 5.4rem);
  padding: clamp(2.05rem, 6vw, 4.1rem) clamp(1.4rem, 5.5vw, 4.4rem) clamp(1.9rem, 5vw, 3rem);
  text-align: center;
  border: 1px solid rgba(113, 163, 205, 0.25);
  border-top-color: rgba(255, 255, 255, 0.85);
  border-radius: 0 0 4.2rem 4.2rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 253, 255, 0.62)),
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.75), transparent 60%);
  box-shadow:
    0 18px 44px rgba(43, 92, 136, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
}

.profil-section__eyebrow {
  margin: 0 0 0.45rem;
  color: #6fa0c9;
  font-size: clamp(0.62rem, 2.5vw, 0.82rem);
  font-weight: 700;
  letter-spacing: 0.18em;
  line-height: 1.2;
  text-transform: uppercase;
}

.profil-section__title {
  margin: 0;
  color: #173965;
  line-height: 0.96;
}

.profil-section__title-main,
.profil-section__title-script {
  display: block;
}

.profil-section__title-main {
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(2.65rem, 9vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.045em;
  text-wrap: balance;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.8);
}

.profil-section__title-script {
  margin-top: 0.15rem;
  color: #c89b30;
  font-family: var(--font-script, 'Great Vibes', 'Allura', 'Brush Script MT', cursive);
  font-size: clamp(2.8rem, 10vw, 5.7rem);
  font-weight: 400;
  letter-spacing: 0.01em;
  transform: rotate(-1deg);
}

.profil-section__lead {
  max-width: 31.5rem;
  margin: clamp(1.3rem, 4vw, 2rem) auto 0;
  color: #63758a;
  font-size: clamp(1rem, 3.1vw, 1.32rem);
  font-weight: 400;
  line-height: 1.72;
}

.profil-section__divider,
.profil-section__closing-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: min(16rem, 72%);
  margin: clamp(1.45rem, 4vw, 2.15rem) auto 0;
  color: #c89b30;
}

.profil-section__divider span,
.profil-section__closing-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(200, 155, 48, 0.72), transparent);
}

.profil-section__divider i,
.profil-section__closing-divider i {
  font-style: normal;
  line-height: 1;
}

.profil-section__couple {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 6vw, 3.5rem);
}

.profil-section__couple::before,
.profil-section__couple::after {
  content: '✦';
  position: absolute;
  color: rgba(200, 155, 48, 0.35);
  font-size: 0.85rem;
}

.profil-section__couple::before {
  top: 28%;
  left: 0.75rem;
}

.profil-section__couple::after {
  right: 1.2rem;
  bottom: 25%;
}

.profil-section__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(1rem, 5vw, 2.8rem);
  min-height: clamp(13rem, 38vw, 21.5rem);
}

.profil-section__content {
  position: relative;
  z-index: 3;
}

.profil-section__content--groom {
  text-align: left;
  justify-self: start;
}

.profil-section__content--bride {
  text-align: right;
  justify-self: end;
}

.profil-section__role {
  margin: 0 0 0.35rem;
  color: #caa03e;
  font-size: clamp(0.68rem, 2.45vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1.25;
  text-transform: uppercase;
}

.profil-section__name {
  margin: 0;
  color: #163963;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(1.35rem, 4.9vw, 2.9rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.78);
}

.profil-section__details {
  max-width: 17rem;
  margin: clamp(0.75rem, 2.4vw, 1.35rem) 0 0;
  color: #657588;
  font-size: clamp(0.78rem, 2.8vw, 1.12rem);
  line-height: 1.46;
}

.profil-section__content--bride .profil-section__details {
  margin-left: auto;
}

.profil-section__instagram {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  margin-top: clamp(0.7rem, 2vw, 1rem);
  padding: 0.42rem 0.7rem;
  color: #1f4f84;
  font-size: clamp(0.72rem, 2.55vw, 0.98rem);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  border: 1px solid rgba(92, 142, 190, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0 8px 18px rgba(40, 88, 138, 0.08);
  backdrop-filter: blur(10px);
  transition:
    transform 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.profil-section__instagram:hover,
.profil-section__instagram:focus-visible {
  color: #c99a2e;
  border-color: rgba(201, 154, 46, 0.46);
  background: rgba(255, 255, 255, 0.78);
  transform: translateY(-1px);
}

.profil-section__instagram:focus-visible {
  outline: 2px solid rgba(201, 154, 46, 0.42);
  outline-offset: 3px;
}

.profil-section__instagram-icon {
  width: 1.05em;
  height: 1.05em;
  fill: currentColor;
  flex: 0 0 auto;
}

.profil-section__photo-wrap {
  position: relative;
  z-index: 2;
  display: flex;
}

.profil-section__photo-wrap--groom {
  justify-content: flex-end;
}

.profil-section__photo-wrap--bride {
  justify-content: flex-start;
}

.profil-section__photo-card {
  position: relative;
  width: min(100%, clamp(9.6rem, 35vw, 18rem));
  aspect-ratio: 1 / 1.08;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 1.4rem;
  background:
    radial-gradient(circle at 45% 18%, rgba(255, 255, 255, 0.9), transparent 54%),
    linear-gradient(150deg, rgba(255, 255, 255, 0.82), rgba(224, 245, 255, 0.58));
  box-shadow:
    0 18px 38px rgba(39, 86, 130, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
  overflow: visible;
}

.profil-section__photo-card::after {
  content: '';
  position: absolute;
  inset: 0.45rem;
  z-index: 0;
  border-radius: 1.1rem;
  border: 1px solid rgba(51, 102, 160, 0.16);
}

.profil-section__person {
  position: absolute;
  left: 50%;
  bottom: -0.1rem;
  z-index: 2;
  width: 83%;
  height: 92%;
  object-fit: contain;
  object-position: center bottom;
  transform: translateX(-50%);
  filter: drop-shadow(0 8px 18px rgba(35, 73, 112, 0.12));
}

.profil-section__person--bride {
  width: 88%;
  height: 93%;
}

.profil-section__frame {
  position: absolute;
  inset: 50% auto auto 50%;
  z-index: 4;
  width: 132%;
  height: 132%;
  object-fit: contain;
  pointer-events: none;
  opacity: 0.86;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 8px 14px rgba(40, 88, 138, 0.12));
}

.profil-section__ampersand-wrap {
  display: flex;
  justify-content: center;
  margin: clamp(-0.8rem, -1vw, -0.25rem) 0 clamp(-0.7rem, -1vw, -0.15rem);
}

.profil-section__ampersand {
  color: #c99a2e;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(3.8rem, 12vw, 7rem);
  font-weight: 600;
  line-height: 0.78;
  text-shadow:
    0 2px 0 rgba(255, 255, 255, 0.9),
    0 12px 30px rgba(201, 154, 46, 0.22);
}

.profil-section__closing {
  position: relative;
  z-index: 3;
  width: min(100%, 34rem);
  margin: clamp(2.8rem, 7vw, 4.6rem) auto 0;
  text-align: center;
}

.profil-section__closing p {
  margin: 0;
  color: #194372;
  font-family: var(--font-script, 'Great Vibes', 'Allura', 'Brush Script MT', cursive);
  font-size: clamp(1.25rem, 4.6vw, 2.2rem);
  line-height: 1.38;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.78);
}

.profil-section__closing-divider {
  width: min(13rem, 62%);
  margin-top: 0.85rem;
}

@media (max-width: 700px) {
  .profil-section::before {
    inset: 0.55rem;
    border-radius: 0 0 4.5rem 0;
  }

  .profil-section__shell {
    padding-top: 2.6rem;
  }

  .profil-section__inner {
    padding-inline: 1.05rem;
  }

  .profil-section__intro-card {
    margin-bottom: 3.25rem;
    border-radius: 0 0 3.5rem 3.5rem;
  }

  .profil-section__row {
    gap: 0.95rem;
    min-height: 12rem;
  }

  .profil-section__photo-card {
    width: min(100%, 10.9rem);
    border-radius: 1.2rem;
  }

  .profil-section__frame {
    width: 138%;
    height: 138%;
  }

  .profil-section__details {
    max-width: 12rem;
  }

  .profil-section__ornament {
    width: clamp(8rem, 42vw, 12.5rem);
  }

  .profil-section__ornament--top-left {
    top: -0.5rem;
    left: -2.2rem;
  }

  .profil-section__ornament--bottom-right {
    right: -2.8rem;
    bottom: -1rem;
  }
}

@media (max-width: 430px) {
  .profil-section__shell {
    padding-top: 2.1rem;
    padding-bottom: 3.5rem;
  }

  .profil-section__intro-card {
    padding: 1.75rem 1rem 1.55rem;
    margin-bottom: 2.65rem;
    border-radius: 0 0 3rem 3rem;
  }

  .profil-section__lead {
    line-height: 1.68;
  }

  .profil-section__couple {
    gap: 1.8rem;
  }

  .profil-section__row {
    gap: 0.6rem;
    min-height: 11rem;
  }

  .profil-section__photo-card {
    width: min(100%, 9.25rem);
    border-radius: 1rem;
  }

  .profil-section__role {
    margin-bottom: 0.25rem;
    letter-spacing: 0.13em;
  }

  .profil-section__name {
    font-size: clamp(1.15rem, 6vw, 1.45rem);
  }

  .profil-section__details {
    max-width: 10.6rem;
    margin-top: 0.55rem;
    font-size: 0.72rem;
    line-height: 1.42;
  }

  .profil-section__instagram {
    gap: 0.3rem;
    margin-top: 0.52rem;
    padding: 0.36rem 0.55rem;
    font-size: 0.68rem;
  }

  .profil-section__ampersand-wrap {
    margin-block: -0.25rem;
  }

  .profil-section__closing {
    margin-top: 2.35rem;
  }
}

@media (max-width: 360px) {
  .profil-section__inner {
    padding-inline: 0.8rem;
  }

  .profil-section__row {
    gap: 0.45rem;
  }

  .profil-section__photo-card {
    width: min(100%, 8.45rem);
  }

  .profil-section__details {
    max-width: 9.5rem;
    font-size: 0.68rem;
  }
}
</style>
