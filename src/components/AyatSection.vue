<template>
  <section
    id="ayat"
    ref="ayatSection"
    class="section ayat-section"
    aria-labelledby="ayat-title"
  >
    <img
      :src="floralOrnament"
      class="ayat-section__ornament ayat-section__ornament--left"
      alt=""
      aria-hidden="true"
    />

    <img
      :src="floralOrnament"
      class="ayat-section__ornament ayat-section__ornament--right"
      alt=""
      aria-hidden="true"
    />

    <div class="ayat-section__shell">
      <header class="ayat-section__heading">
        <div class="ayat-section__top-divider" aria-hidden="true">
          <span></span>
          <i>◇</i>
          <span></span>
        </div>

        <p class="ayat-section__eyebrow">Ayat Pernikahan</p>

        <h2 id="ayat-title" class="ayat-section__title">
          Tanda Kebesaran-<br />
          Nya
        </h2>

        <div class="ayat-section__heading-divider" aria-hidden="true">
          <span></span>
          <i>❧</i>
          <span></span>
        </div>
      </header>

      <article class="ayat-section__card">
        <div class="ayat-section__card-top" aria-hidden="true">
          <span></span>
        </div>

        <div class="ayat-section__calligraphy" aria-hidden="true">
          ۞
        </div>

        <p class="ayat-section__arabic" lang="ar" dir="rtl">
          وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا
          لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً
        </p>

        <div class="ayat-section__verse-divider" aria-hidden="true">
          <span></span>
          <i>♡</i>
          <span></span>
        </div>

        <p class="ayat-section__translation">
          “Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan
          untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
          dan Dia menjadikan di antaramu rasa kasih dan sayang.”
        </p>

        <div class="ayat-section__source">
          QS. Ar-Rum: 21
        </div>

        <img
          :src="floralOrnament"
          class="ayat-section__card-flower ayat-section__card-flower--left"
          alt=""
          aria-hidden="true"
        />

        <img
          :src="floralOrnament"
          class="ayat-section__card-flower ayat-section__card-flower--right"
          alt=""
          aria-hidden="true"
        />
      </article>

      <div class="ayat-section__bottom-divider" aria-hidden="true">
        <span></span>
        <i>♡</i>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import floralOrnament from '@/assets/images/topleft-blossom-gold.png'

gsap.registerPlugin(ScrollTrigger)

const ayatSection = ref(null)
let animationContext

onMounted(() => {
  animationContext = gsap.context(() => {
    gsap.fromTo(
      '.ayat-section__heading',
      {
        y: 28,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ayat-section__heading',
          start: 'top 88%',
        },
      },
    )

    gsap.fromTo(
      '.ayat-section__card',
      {
        y: 38,
        scale: 0.96,
        opacity: 0,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ayat-section__card',
          start: 'top 84%',
        },
      },
    )

    gsap.fromTo(
      '.ayat-section__arabic, .ayat-section__translation, .ayat-section__source',
      {
        y: 18,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.ayat-section__card',
          start: 'top 78%',
        },
      },
    )
  }, ayatSection)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<style scoped>
.ayat-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #173a64;
  background:
    radial-gradient(circle at 8% 15%, rgba(255, 255, 255, 0.96) 0 8rem, transparent 18rem),
    radial-gradient(circle at 92% 18%, rgba(255, 255, 255, 0.9) 0 8rem, transparent 18rem),
    radial-gradient(circle at 50% 92%, rgba(136, 199, 242, 0.22) 0 10rem, transparent 24rem),
    linear-gradient(180deg, #f8fdff 0%, #eef8ff 48%, #f9fdff 100%);
}

.ayat-section::before {
  content: '';
  position: absolute;
  inset: 0.7rem;
  z-index: -1;
  border: 1px solid rgba(123, 174, 222, 0.22);
  border-radius: 0 0 4rem 4rem;
  pointer-events: none;
}

.ayat-section__shell {
  position: relative;
  z-index: 2;
  width: min(100%, 58rem);
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2.6rem) clamp(3.2rem, 8vw, 5rem);
}

.ayat-section__ornament {
  position: absolute;
  z-index: 1;
  width: clamp(11rem, 31vw, 21rem);
  opacity: 0.55;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 14px 24px rgba(61, 111, 164, 0.1));
}

.ayat-section__ornament--left {
  top: 8rem;
  left: -6rem;
  transform: rotate(-6deg);
}

.ayat-section__ornament--right {
  top: 10rem;
  right: -6rem;
  transform: rotate(92deg) scaleX(-1);
}

.ayat-section__heading {
  position: relative;
  z-index: 3;
  width: min(100%, 46rem);
  margin: 0 auto clamp(2.4rem, 6vw, 3.8rem);
  text-align: center;
}

.ayat-section__top-divider,
.ayat-section__heading-divider,
.ayat-section__verse-divider,
.ayat-section__bottom-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-inline: auto;
  color: #caa34a;
}

.ayat-section__top-divider {
  width: min(15rem, 58%);
  margin-bottom: 1.25rem;
}

.ayat-section__heading-divider {
  width: min(16rem, 62%);
  margin-top: clamp(1.4rem, 4vw, 2rem);
}

.ayat-section__verse-divider {
  width: min(18rem, 72%);
  margin: clamp(1.4rem, 4vw, 2rem) auto;
}

.ayat-section__bottom-divider {
  width: min(15rem, 62%);
  margin-top: clamp(2rem, 5vw, 3rem);
}

.ayat-section__top-divider span,
.ayat-section__heading-divider span,
.ayat-section__verse-divider span,
.ayat-section__bottom-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(202, 163, 74, 0.82), transparent);
}

.ayat-section__top-divider i,
.ayat-section__heading-divider i,
.ayat-section__verse-divider i,
.ayat-section__bottom-divider i {
  font-style: normal;
  line-height: 1;
}

.ayat-section__verse-divider i,
.ayat-section__bottom-divider i {
  color: #4f86cc;
}

.ayat-section__eyebrow {
  margin: 0;
  color: #4d84cc;
  font-size: clamp(0.8rem, 2.5vw, 1.05rem);
  font-weight: 800;
  letter-spacing: 0.34em;
  line-height: 1.25;
  text-transform: uppercase;
}

.ayat-section__title {
  margin: clamp(0.95rem, 2.8vw, 1.2rem) 0 0;
  color: #123762;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(3rem, 9vw, 5.8rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.05em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.86);
}

.ayat-section__card {
  position: relative;
  z-index: 3;
  width: min(100%, 48rem);
  margin: 0 auto;
  overflow: hidden;
  padding: clamp(3.1rem, 8vw, 5.2rem) clamp(1.25rem, 5vw, 4rem) clamp(2rem, 6vw, 3.3rem);
  text-align: center;
  border: 1px solid rgba(202, 163, 74, 0.46);
  border-radius: clamp(2rem, 6vw, 4rem);
  border-top-left-radius: clamp(4rem, 10vw, 7rem);
  border-top-right-radius: clamp(4rem, 10vw, 7rem);
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.96), transparent 46%),
    radial-gradient(circle at 18% 100%, rgba(210, 235, 253, 0.38), transparent 42%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(248, 253, 255, 0.82));
  box-shadow:
    0 26px 55px rgba(59, 111, 163, 0.13),
    inset 0 1px 0 rgba(255, 255, 255, 0.94);
}

.ayat-section__card::before {
  content: '';
  position: absolute;
  inset: 0.75rem;
  z-index: 0;
  border: 1px solid rgba(123, 174, 222, 0.22);
  border-radius: inherit;
  pointer-events: none;
}

.ayat-section__card::after {
  content: '';
  position: absolute;
  top: -7.5rem;
  left: 50%;
  z-index: 0;
  width: min(72%, 26rem);
  height: 13rem;
  border: 1px solid rgba(202, 163, 74, 0.42);
  border-bottom: 0;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  transform: translateX(-50%);
  pointer-events: none;
}

.ayat-section__card-top {
  position: absolute;
  top: 1.05rem;
  left: 50%;
  z-index: 2;
  width: 5rem;
  height: 5rem;
  transform: translateX(-50%);
  pointer-events: none;
}

.ayat-section__card-top span {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(202, 163, 74, 0.4);
  border-radius: 40% 60% 45% 55%;
  transform: rotate(45deg);
  opacity: 0.45;
}

.ayat-section__calligraphy {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: clamp(3.4rem, 8vw, 4.8rem);
  aspect-ratio: 1;
  margin: 0 auto clamp(1.4rem, 4vw, 2rem);
  color: #caa34a;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1;
  border: 1px solid rgba(202, 163, 74, 0.28);
  border-radius: 999px;
  background:
    radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.96), rgba(241, 248, 255, 0.78));
  box-shadow:
    0 12px 24px rgba(64, 118, 185, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.ayat-section__arabic {
  position: relative;
  z-index: 2;
  max-width: 41rem;
  margin: 0 auto;
  color: #123762;
  font-family: 'Amiri', 'Scheherazade New', serif;
  font-size: clamp(1.85rem, 6.3vw, 3.25rem);
  font-weight: 400;
  line-height: 2.05;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.86);
}

.ayat-section__translation {
  position: relative;
  z-index: 2;
  max-width: 39rem;
  margin: 0 auto;
  color: #344e6d;
  font-size: clamp(1.02rem, 3vw, 1.38rem);
  line-height: 1.72;
}

.ayat-section__source {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(1.5rem, 4vw, 2.2rem);
  padding: 0.78rem 1.8rem;
  border: 1px solid rgba(123, 174, 222, 0.38);
  border-radius: 999px;
  color: #123762;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(238, 247, 255, 0.66));
  box-shadow:
    0 10px 22px rgba(64, 118, 185, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(1rem, 2.8vw, 1.25rem);
  font-weight: 700;
}

.ayat-section__source::before,
.ayat-section__source::after {
  content: '✦';
  color: #caa34a;
  font-family: Georgia, serif;
  font-size: 0.72rem;
}

.ayat-section__source::before {
  margin-right: 0.85rem;
}

.ayat-section__source::after {
  margin-left: 0.85rem;
}

.ayat-section__card-flower {
  position: absolute;
  z-index: 1;
  width: clamp(10rem, 30vw, 18rem);
  opacity: 0.46;
  pointer-events: none;
  user-select: none;
}

.ayat-section__card-flower--left {
  left: -5.6rem;
  bottom: -3rem;
  transform: rotate(-8deg);
}

.ayat-section__card-flower--right {
  right: -5.3rem;
  bottom: -2.2rem;
  transform: rotate(92deg) scaleX(-1);
}

@media (max-width: 700px) {
  .ayat-section::before {
    inset: 0.55rem;
    border-radius: 0 0 3rem 3rem;
  }

  .ayat-section__shell {
    padding-top: 2.7rem;
    padding-inline: 1.05rem;
  }

  .ayat-section__ornament {
    width: clamp(9rem, 44vw, 14rem);
    opacity: 0.42;
  }

  .ayat-section__ornament--left {
    top: 8rem;
    left: -5.2rem;
  }

  .ayat-section__ornament--right {
    top: 9.5rem;
    right: -5.3rem;
  }

  .ayat-section__card {
    border-radius: 2rem;
    border-top-left-radius: 4rem;
    border-top-right-radius: 4rem;
  }

  .ayat-section__card-flower {
    width: 12rem;
    opacity: 0.32;
  }

  .ayat-section__card-flower--left {
    left: -5rem;
    bottom: -2.7rem;
  }

  .ayat-section__card-flower--right {
    right: -5rem;
    bottom: -2.3rem;
  }
}

@media (max-width: 430px) {
  .ayat-section__shell {
    padding-top: 2.35rem;
    padding-bottom: 3.25rem;
  }

  .ayat-section__title {
    font-size: clamp(2.5rem, 13vw, 3.25rem);
  }

  .ayat-section__card {
    padding: 2.8rem 1rem 1.7rem;
    border-radius: 1.65rem;
    border-top-left-radius: 3.3rem;
    border-top-right-radius: 3.3rem;
  }

  .ayat-section__card::before {
    inset: 0.5rem;
  }

  .ayat-section__card::after {
    top: -6.4rem;
    height: 11rem;
  }

  .ayat-section__calligraphy {
    width: 3.25rem;
    margin-bottom: 1.15rem;
    font-size: 1.9rem;
  }

  .ayat-section__arabic {
    font-size: clamp(1.55rem, 8vw, 2.05rem);
    line-height: 2.05;
  }

  .ayat-section__translation {
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .ayat-section__source {
    padding: 0.68rem 1.25rem;
  }

  .ayat-section__source::before {
    margin-right: 0.55rem;
  }

  .ayat-section__source::after {
    margin-left: 0.55rem;
  }
}
</style>