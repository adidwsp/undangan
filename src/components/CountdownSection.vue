<template>
  <section
    id="countdown"
    ref="countdownSection"
    class="section countdown-section"
    aria-labelledby="countdown-title"
  >
    <img
      :src="floralOrnament"
      class="countdown-section__ornament countdown-section__ornament--left"
      alt=""
      aria-hidden="true"
    />

    <img
      :src="floralOrnament"
      class="countdown-section__ornament countdown-section__ornament--right"
      alt=""
      aria-hidden="true"
    />

    <div class="countdown-section__shell">
      <div class="countdown-section__top-divider" aria-hidden="true">
        <span></span>
        <i>♥</i>
        <span></span>
      </div>

      <header class="countdown-section__heading">
        <p class="countdown-section__eyebrow">Menuju Hari Akad</p>

        <h2 id="countdown-title" class="countdown-section__title">
          Menghitung Hari
        </h2>

        <div class="countdown-section__heading-divider" aria-hidden="true">
          <span></span>
          <i>❧</i>
          <span></span>
        </div>

        <p class="countdown-section__lead">
          Semoga setiap detik yang tersisa menjadi<br />
          waktu untuk memperbaiki niat dan<br />
          memperbanyak doa.
        </p>
      </header>

      <div
        class="countdown-section__grid"
        role="timer"
        aria-live="polite"
        :aria-label="timerLabel"
      >
        <article
          v-for="item in countdownItems"
          :key="item.label"
          class="countdown-section__item"
        >
          <span class="countdown-section__icon" aria-hidden="true">
            <svg v-if="item.icon === 'calendar'" viewBox="0 0 24 24">
              <path d="M7 2v3M17 2v3M4 9h16" />
              <rect x="4" y="5" width="16" height="17" rx="2.5" />
              <path d="M8 13h2M12 13h2M16 13h2M8 17h2M12 17h2" />
            </svg>

            <svg v-else-if="item.icon === 'clock'" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>

            <svg v-else-if="item.icon === 'hourglass'" viewBox="0 0 24 24">
              <path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" />
            </svg>

            <svg v-else viewBox="0 0 24 24">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 13V8M12 2v3M9 2h6M17.6 6.4l1.4-1.4" />
            </svg>
          </span>

          <span class="countdown-section__sparkle countdown-section__sparkle--left" aria-hidden="true">
            ✦
          </span>

          <span class="countdown-section__sparkle countdown-section__sparkle--right" aria-hidden="true">
            ✦
          </span>

          <strong>{{ item.value }}</strong>
          <span class="countdown-section__label">{{ item.label }}</span>

          <div class="countdown-section__item-divider" aria-hidden="true">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </article>
      </div>

      <aside class="countdown-section__quote">
        <div class="countdown-section__quote-icon" aria-hidden="true">
          ♥
        </div>

        <p>
          “Dan kepunyaan-Nya lah segala apa yang ada<br />
          di langit dan di bumi.”
          <br />
          <span>– QS. An-Nahl: 53 –</span>
        </p>

        <div class="countdown-section__quote-leaf" aria-hidden="true"></div>
      </aside>

      <p v-if="isWeddingDayPassed" class="countdown-section__passed">
        Hari akad telah tiba. Semoga Allah memberkahi perjalanan baru ini.
      </p>

      <div class="countdown-section__bottom-divider" aria-hidden="true">
        <span></span>
        <i>♥</i>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { useCountdown } from '@/composables/useCountdown'
import floralOrnament from '@/assets/images/topleft-blossom-gold.png'

gsap.registerPlugin(ScrollTrigger)

const countdownSection = ref(null)
let animationContext

// Tanggal target disamakan dengan jadwal akad pada section detail acara.
const { remaining } = useCountdown('2026-09-06T09:00:00+07:00')

const safeRemaining = computed(() => ({
  days: Math.max(0, remaining.value.days || 0),
  hours: Math.max(0, remaining.value.hours || 0),
  minutes: Math.max(0, remaining.value.minutes || 0),
  seconds: Math.max(0, remaining.value.seconds || 0),
}))

const countdownItems = computed(() => [
  {
    label: 'Hari',
    value: safeRemaining.value.days,
    icon: 'calendar',
  },
  {
    label: 'Jam',
    value: safeRemaining.value.hours,
    icon: 'clock',
  },
  {
    label: 'Menit',
    value: safeRemaining.value.minutes,
    icon: 'hourglass',
  },
  {
    label: 'Detik',
    value: safeRemaining.value.seconds,
    icon: 'stopwatch',
  },
])

const timerLabel = computed(() => {
  return `${safeRemaining.value.days} hari, ${safeRemaining.value.hours} jam, ${safeRemaining.value.minutes} menit, ${safeRemaining.value.seconds} detik menuju hari akad`
})

const isWeddingDayPassed = computed(() => {
  return (
    safeRemaining.value.days === 0 &&
    safeRemaining.value.hours === 0 &&
    safeRemaining.value.minutes === 0 &&
    safeRemaining.value.seconds === 0
  )
})

onMounted(() => {
  animationContext = gsap.context(() => {
    gsap.fromTo(
      '.countdown-section__heading',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.countdown-section__heading',
          start: 'top 88%',
        },
      },
    )

    gsap.fromTo(
      '.countdown-section__item',
      { y: 34, scale: 0.96, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.78,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.countdown-section__grid',
          start: 'top 84%',
        },
      },
    )

    gsap.fromTo(
      '.countdown-section__quote',
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.countdown-section__quote',
          start: 'top 90%',
        },
      },
    )
  }, countdownSection)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<style scoped>
.countdown-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #173a64;
  background:
    radial-gradient(circle at 8% 22%, rgba(255, 255, 255, 0.94) 0 8rem, transparent 19rem),
    radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.9) 0 7rem, transparent 18rem),
    radial-gradient(circle at 50% 90%, rgba(139, 201, 242, 0.2) 0 9rem, transparent 21rem),
    linear-gradient(180deg, #f8fdff 0%, #eef8ff 48%, #f9fdff 100%);
}

.countdown-section::before {
  content: '';
  position: absolute;
  inset: 0.7rem;
  z-index: -1;
  border: 1px solid rgba(123, 174, 222, 0.22);
  border-radius: 0 0 4rem 4rem;
  pointer-events: none;
}

.countdown-section__shell {
  position: relative;
  z-index: 2;
  width: min(100%, 58rem);
  margin: 0 auto;
  padding: clamp(2.8rem, 8vw, 4.8rem) clamp(1rem, 4vw, 2.6rem) clamp(3rem, 8vw, 4.8rem);
}

.countdown-section__ornament {
  position: absolute;
  z-index: 1;
  width: clamp(11rem, 31vw, 21rem);
  opacity: 0.7;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 14px 24px rgba(61, 111, 164, 0.1));
}

.countdown-section__ornament--left {
  top: 8rem;
  left: -6rem;
  transform: rotate(-5deg);
}

.countdown-section__ornament--right {
  top: 13rem;
  right: -5.8rem;
  transform: rotate(92deg) scaleX(-1);
}

.countdown-section__heading {
  position: relative;
  z-index: 3;
  width: min(100%, 44rem);
  margin: 0 auto clamp(2.5rem, 6vw, 3.9rem);
  text-align: center;
}

.countdown-section__eyebrow {
  margin: 0 0 1.05rem;
  color: #4d84cc;
  font-size: clamp(0.8rem, 2.5vw, 1.05rem);
  font-weight: 800;
  letter-spacing: 0.34em;
  line-height: 1.25;
  text-transform: uppercase;
}

.countdown-section__title {
  margin: 0;
  color: #123762;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(3rem, 9vw, 5.8rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.05em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.86);
}

.countdown-section__lead {
  max-width: 40rem;
  margin: clamp(1.25rem, 3.7vw, 1.8rem) auto 0;
  color: #65778b;
  font-size: clamp(1.05rem, 3vw, 1.42rem);
  line-height: 1.72;
}

.countdown-section__top-divider,
.countdown-section__heading-divider,
.countdown-section__bottom-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: min(17rem, 64%);
  margin-inline: auto;
  color: #caa34a;
}

.countdown-section__top-divider {
  margin-bottom: clamp(2.5rem, 6vw, 3.6rem);
}

.countdown-section__heading-divider {
  width: min(15rem, 56%);
  margin-top: clamp(1rem, 3vw, 1.35rem);
}

.countdown-section__bottom-divider {
  margin-top: clamp(1.9rem, 5vw, 2.7rem);
}

.countdown-section__top-divider span,
.countdown-section__heading-divider span,
.countdown-section__bottom-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(202, 163, 74, 0.82), transparent);
}

.countdown-section__top-divider i,
.countdown-section__heading-divider i,
.countdown-section__bottom-divider i {
  color: #4f86cc;
  font-style: normal;
  line-height: 1;
}

.countdown-section__heading-divider i {
  color: #caa34a;
}

.countdown-section__grid {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 3.2vw, 1.65rem);
  width: min(100%, 48rem);
  margin: 0 auto;
}

.countdown-section__item {
  position: relative;
  display: grid;
  place-items: center;
  min-height: clamp(13rem, 28vw, 18rem);
  overflow: hidden;
  border: 1px solid rgba(123, 174, 222, 0.32);
  border-radius: clamp(1.4rem, 4vw, 2rem);
  padding: clamp(1.35rem, 4vw, 2rem);
  text-align: center;
  background:
    radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.98), transparent 44%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(249, 253, 255, 0.8));
  box-shadow:
    0 20px 44px rgba(59, 111, 163, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.countdown-section__icon {
  display: grid;
  place-items: center;
  width: clamp(4.1rem, 9vw, 6rem);
  aspect-ratio: 1;
  margin-bottom: clamp(1.1rem, 3vw, 1.6rem);
  border: 1px solid rgba(123, 174, 222, 0.28);
  border-radius: 999px;
  color: #3f76bd;
  background:
    radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.98), rgba(239, 247, 255, 0.9));
  box-shadow:
    0 14px 26px rgba(64, 118, 185, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
}

.countdown-section__icon svg {
  width: 45%;
  height: 45%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.85;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.countdown-section__sparkle {
  position: absolute;
  top: 28%;
  color: rgba(202, 163, 74, 0.75);
  font-size: clamp(0.9rem, 2.4vw, 1.2rem);
}

.countdown-section__sparkle--left {
  left: 22%;
}

.countdown-section__sparkle--right {
  right: 22%;
  color: rgba(123, 174, 222, 0.72);
}

.countdown-section__item strong {
  color: #123762;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(4.2rem, 13vw, 7.3rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.055em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.86);
}

.countdown-section__label {
  margin-top: clamp(0.8rem, 2.6vw, 1.1rem);
  color: #4d84cc;
  font-size: clamp(0.95rem, 2.8vw, 1.35rem);
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1.2;
  text-transform: uppercase;
}

.countdown-section__item-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: min(7.5rem, 62%);
  margin-top: clamp(0.95rem, 2.5vw, 1.35rem);
  color: #caa34a;
}

.countdown-section__item-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(202, 163, 74, 0.8), transparent);
}

.countdown-section__item-divider i {
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 999px;
  background: currentColor;
}

.countdown-section__quote {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(1rem, 3vw, 1.6rem);
  width: min(100%, 48rem);
  margin: clamp(1.6rem, 4vw, 2.2rem) auto 0;
  overflow: hidden;
  border: 1px solid rgba(123, 174, 222, 0.3);
  border-radius: 1rem;
  padding: clamp(1rem, 3vw, 1.45rem) clamp(1.1rem, 3.6vw, 2rem);
  background:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.72), transparent 38%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(247, 253, 255, 0.48));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.countdown-section__quote-icon {
  display: grid;
  place-items: center;
  width: clamp(4rem, 9vw, 5.8rem);
  aspect-ratio: 1;
  border: 1px solid rgba(123, 174, 222, 0.24);
  border-radius: 999px;
  color: #4f86cc;
  background: rgba(255, 255, 255, 0.52);
  font-size: clamp(1.7rem, 4vw, 2.4rem);
}

.countdown-section__quote p {
  position: relative;
  z-index: 2;
  margin: 0;
  color: #40566f;
  font-size: clamp(1rem, 3vw, 1.28rem);
  line-height: 1.58;
}

.countdown-section__quote p span {
  color: #4f86cc;
}

.countdown-section__quote-leaf {
  position: absolute;
  right: 1rem;
  bottom: -1.2rem;
  width: 8rem;
  height: 5.5rem;
  border-left: 1px solid rgba(123, 174, 222, 0.26);
  border-bottom: 1px solid rgba(123, 174, 222, 0.26);
  border-radius: 70% 0 70% 0;
  transform: rotate(-18deg);
  opacity: 0.7;
}

.countdown-section__passed {
  width: min(100%, 42rem);
  margin: 1.4rem auto 0;
  color: #4f6782;
  font-size: 1rem;
  line-height: 1.55;
  text-align: center;
}

@media (max-width: 700px) {
  .countdown-section::before {
    inset: 0.55rem;
    border-radius: 0 0 3rem 3rem;
  }

  .countdown-section__shell {
    padding-top: 2.5rem;
    padding-inline: 1.05rem;
  }

  .countdown-section__ornament {
    width: clamp(9rem, 44vw, 14rem);
  }

  .countdown-section__ornament--left {
    top: 8rem;
    left: -5.2rem;
  }

  .countdown-section__ornament--right {
    top: 14.2rem;
    right: -5.3rem;
  }

  .countdown-section__top-divider {
    margin-bottom: 2.35rem;
  }

  .countdown-section__grid {
    gap: 0.9rem;
  }

  .countdown-section__item {
    min-height: 12rem;
    border-radius: 1.4rem;
    padding: 1.2rem 0.75rem;
  }

  .countdown-section__sparkle--left {
    left: 16%;
  }

  .countdown-section__sparkle--right {
    right: 16%;
  }

  .countdown-section__quote {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .countdown-section__quote-icon {
    margin-inline: auto;
  }
}

@media (max-width: 430px) {
  .countdown-section__shell {
    padding-top: 2.25rem;
    padding-bottom: 3.25rem;
  }

  .countdown-section__title {
    font-size: clamp(2.55rem, 13vw, 3.35rem);
  }

  .countdown-section__lead {
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .countdown-section__grid {
    gap: 0.75rem;
  }

  .countdown-section__item {
    min-height: 10.3rem;
    padding: 1rem 0.65rem;
    border-radius: 1.25rem;
  }

  .countdown-section__icon {
    width: 3.7rem;
    margin-bottom: 0.9rem;
  }

  .countdown-section__item strong {
    font-size: clamp(3.2rem, 18vw, 4.1rem);
  }

  .countdown-section__label {
    margin-top: 0.7rem;
    font-size: 0.86rem;
    letter-spacing: 0.16em;
  }

  .countdown-section__item-divider {
    margin-top: 0.8rem;
  }

  .countdown-section__quote {
    padding: 1rem;
  }

  .countdown-section__quote p {
    font-size: 0.92rem;
  }
}
</style>