<template>
  <section id="cover" class="section cover-section" aria-labelledby="cover-title">
    <div id="cover-particles" class="cover-section__particles" aria-hidden="true" />

    <div class="cover-section__backdrop" aria-hidden="true">
      <p ref="eyebrowRef" class="cover-section__eyebrow">The Wedding of</p>
      <span class="cover-section__grain" />
      <span class="cover-section__orb cover-section__orb--one" />
      <span class="cover-section__orb cover-section__orb--two" />
      <span class="cover-section__orb cover-section__orb--three" />
      <span class="cover-section__veil" />
    </div>

    <div class="cover-section__backdrop cover-section__backdrop--static" aria-hidden="true">
      <img :src="botanical01" class="cover-section__flower cover-section__flower--one" alt="" />
      <img :src="botanical02" class="cover-section__flower cover-section__flower--two" alt="" />
      <img :src="botanical03" class="cover-section__flower cover-section__flower--three" alt="" />
      <img :src="botanical04" class="cover-section__flower cover-section__flower--four" alt="" />

      <img
        :src="floralCorner"
        class="cover-section__flower-border cover-section__flower-border--left"
        alt=""
      />

      <img
        :src="floralCornerRight"
        class="cover-section__flower-border cover-section__flower-border--right"
        alt=""
      />

      <img :src="topImage" class="cover-section__top-image" alt="" />
      <img :src="bottomBlossom" class="cover-section__blossom cover-section__blossom--bottom" alt="" />
      <img :src="bottomFlowers" class="cover-section__blossom cover-section__blossom--flowers" alt="" />

      <img :src="botanical02" class="cover-section__leaf cover-section__leaf--one" alt="" />
      <img :src="botanical03" class="cover-section__leaf cover-section__leaf--two" alt="" />
    </div>

    <div class="cover-section__gate">
      <img
        :src="leftBorderWhite"
        class="cover-section__gate-flower cover-section__gate-flower--left"
        alt=""
      />

      <img
        :src="leftBorderWhite"
        class="cover-section__gate-flower cover-section__gate-flower--right"
        alt=""
      />

      <span class="cover-section__butterfly cover-section__butterfly--left" />
      <span class="cover-section__butterfly cover-section__butterfly--right" />

      <div class="section__inner cover-section__inner">
        <div class="cover-section__title-stack">
          <div class="cover-section__ornament-wrap">
            <img :src="rose" class="cover-section__islamic-ornament-img" alt="ornament" />
          </div>

          <h1 ref="titleRef" id="cover-title" class="cover-section__title">
            Adi <span>&amp;</span> Anis
          </h1>
        </div>

        <p ref="dateRef" class="cover-section__date">Ahad, 6 September 2026</p>

        <div class="cover-section__countdown" role="timer" aria-live="polite">
          <GlassCard
            v-for="item in countdownItems"
            :key="item.label"
            class="cover-section__countdown-item"
          >
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </GlassCard>
        </div>

        <div ref="guestRef" class="cover-section__guest glass-card">
          <span>Kepada Yth.</span>
          <strong>{{ guestStore.displayName }}</strong>
        </div>

        <div class="cover-section__open-wrap">
          <button
            ref="buttonRef"
            class="primary-button cover-section__button"
            :class="{ 'cover-section__button--opened': isOpened }"
            type="button"
            @click="openInvitation"
          >
            <svg
              v-if="!isOpened"
              class="button-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              v-else
              class="button-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 5v13"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="m6 12 6 6 6-6"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>{{ isOpened ? 'Lanjut Scroll' : 'Buka Undangan' }}</span>
          </button>

          <div
            v-if="isOpened"
            ref="scrollHintRef"
            class="cover-section__scroll-hint"
            aria-hidden="true"
          >
            <span>Scroll ke bawah</span>

            <svg viewBox="0 0 24 24">
              <path d="M12 5v14" />
              <path d="m7 14 5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

import { useGuestStore } from '@/stores/guest'
import { useCountdown } from '@/composables/useCountdown'

import GlassCard from '@/components/common/GlassCard.vue'

import floralCorner from '@/assets/images/floral-corner.png'
import floralCornerRight from '@/assets/images/floral-corner-right.png'
import topImage from '@/assets/images/top.png'
import bottomBlossom from '@/assets/images/bottom-blossom-gold.png'
import bottomFlowers from '@/assets/images/flowers.png'
import rose from '@/assets/images/rose.png'
import leftBorderWhite from '@/assets/images/topleft-blossom-gold.png'

import botanical01 from '@/assets/images/botanicals/botanical-01.webp'
import botanical02 from '@/assets/images/botanicals/botanical-02.webp'
import botanical03 from '@/assets/images/botanicals/botanical-03.webp'
import botanical04 from '@/assets/images/botanicals/botanical-04.webp'

const emit = defineEmits(['open'])

const guestStore = useGuestStore()

const eyebrowRef = ref(null)
const titleRef = ref(null)
const dateRef = ref(null)
const guestRef = ref(null)
const buttonRef = ref(null)
const scrollHintRef = ref(null)

const isOpened = ref(false)

let particlesInstance

const { remaining } = useCountdown('2026-09-06T00:00:00+07:00')

const countdownItems = computed(() => [
  {
    label: 'Hari',
    value: String(Math.max(0, remaining.value.days || 0)).padStart(2, '0'),
  },
  {
    label: 'Jam',
    value: String(Math.max(0, remaining.value.hours || 0)).padStart(2, '0'),
  },
  {
    label: 'Menit',
    value: String(Math.max(0, remaining.value.minutes || 0)).padStart(2, '0'),
  },
  {
    label: 'Detik',
    value: String(Math.max(0, remaining.value.seconds || 0)).padStart(2, '0'),
  },
])

async function initParticles() {
  const [{ tsParticles }, { loadFull }] = await Promise.all([
    import('@tsparticles/engine'),
    import('tsparticles'),
  ])

  await loadFull(tsParticles)

  particlesInstance = await tsParticles.load({
    id: 'cover-particles',
    options: {
      background: {
        color: 'transparent',
      },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        color: {
          value: ['#c9a84c', '#72c7f7', '#1f3a5f'],
        },
        move: {
          enable: true,
          speed: {
            min: 0.15,
            max: 0.35,
          },
          direction: 'top',
          outModes: {
            default: 'out',
          },
        },
        number: {
          value: 36,
          density: {
            enable: true,
            width: 600,
            height: 600,
          },
        },
        opacity: {
          value: {
            min: 0.16,
            max: 0.3,
          },
        },
        size: {
          value: {
            min: 0.4,
            max: 1.6,
          },
        },
        links: {
          enable: false,
        },
      },
    },
  })
}

function playEntrance() {
  const targets = [
    eyebrowRef.value,
    titleRef.value,
    dateRef.value,
    guestRef.value,
    buttonRef.value,
  ].filter(Boolean)

  gsap.fromTo(
    targets,
    {
      y: 36,
      opacity: 0,
      scale: 0.97,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      clearProps: 'transform,opacity',
    },
  )
}

function scrollToNextSection() {
  const nextSection =
    document.querySelector('#ayat') ||
    document.querySelector('.ayat-section') ||
    document.querySelector('#profil') ||
    document.querySelector('#detail') ||
    Array.from(document.querySelectorAll('section')).find((section) => section.id !== 'cover')

  nextSection?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

async function openInvitation() {
  if (!isOpened.value) {
    isOpened.value = true
    emit('open')

    gsap.fromTo(
      buttonRef.value,
      {
        scale: 0.96,
      },
      {
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.8)',
      },
    )

    await nextTick()

    if (scrollHintRef.value) {
      gsap.fromTo(
        scrollHintRef.value,
        {
          y: -6,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
      )
    }

    return
  }

  scrollToNextSection()
}

onMounted(() => {
  playEntrance()
  initParticles()
})

onBeforeUnmount(() => {
  particlesInstance?.destroy()
})
</script>

<style scoped>
.cover-section {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  justify-content: center;
  min-height: 100svh;
  text-align: center;
  background:
    radial-gradient(circle at 50% 8%, rgba(114, 199, 247, 0.62), transparent 24rem),
    radial-gradient(circle at 12% 18%, rgba(201, 168, 76, 0.18), transparent 22rem),
    linear-gradient(
      145deg,
      rgba(242, 250, 255, 0.9) 0%,
      rgba(253, 253, 255, 0.86) 48%,
      rgba(233, 247, 255, 0.95) 100%
    );
}

.cover-section::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.48),
      transparent 30%,
      rgba(255, 255, 255, 0.16) 70%,
      rgba(255, 255, 255, 0.42)
    );
  opacity: 0.82;
  content: '';
  pointer-events: none;
}

.cover-section__top-image { 
  position: absolute; 
  top: -5rem; 
  left: 50%;
  transform: translateX(-50%);
}

.cover-section__particles {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.cover-section__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.cover-section__backdrop--static {
  z-index: 1;
}

.cover-section__grain {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 3rem 3rem;
  opacity: 0.18;
  mix-blend-mode: soft-light;
}

.cover-section__orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
  opacity: 0.45;
}

.cover-section__orb--one {
  inset: auto auto 8rem -3rem;
  width: 20rem;
  height: 20rem;
  background: radial-gradient(circle, rgba(201, 168, 76, 0.32), transparent 70%);
}

.cover-section__orb--two {
  inset: 3rem -4rem auto auto;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(114, 199, 247, 0.34), transparent 70%);
}

.cover-section__orb--three {
  inset: auto 8% 10% auto;
  width: 16rem;
  height: 16rem;
  background: radial-gradient(circle, rgba(31, 58, 95, 0.16), transparent 72%);
}

.cover-section__veil {
  position: absolute;
  inset: auto 0 0;
  height: 12rem;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.78));
}

.cover-section__flower {
  position: absolute;
  width: clamp(5rem, 8.5vw, 7.2rem);
  height: auto;
  opacity: 0.92;
  object-fit: contain;
  animation: floral-drift 9s ease-in-out infinite;
}

.cover-section__flower--one {
  left: 6%;
  bottom: 12%;
}

.cover-section__flower--two {
  top: 18%;
  left: 17%;
  transform: scale(0.85);
  animation-delay: -2.1s;
}

.cover-section__flower--three {
  top: 12%;
  right: 12%;
  transform: scale(0.92);
  animation-delay: -4.2s;
}

.cover-section__flower--four {
  right: 7%;
  bottom: 16%;
  transform: scale(0.78);
  animation-delay: -1.4s;
}

.cover-section__flower-border {
  position: absolute;
  width: clamp(16.4rem, 38vw, 26rem);
  height: auto;
  object-fit: contain;
  opacity: 1;
  filter: drop-shadow(0 12px 24px rgba(31, 58, 95, 0.16));
  animation: tree-sway 9.2s ease-in-out infinite;
  pointer-events: none;
}

.cover-section__flower-border--left {
  left: 0;
  bottom: 0;
  transform-origin: center bottom;
}

.cover-section__flower-border--right {
  right: 0;
  bottom: 0;
  transform: scaleX(-1);
  transform-origin: center bottom;
  animation-delay: -3.4s;
}

.cover-section__blossom {
  position: absolute;
  width: clamp(20rem, 50vw, 32rem);
  height: auto;
  object-fit: contain;
  opacity: 0.95;
  pointer-events: none;
  z-index: 2;
}

.cover-section__blossom--bottom {
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%);
}

.cover-section__blossom--flowers {
  bottom: -1.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(22rem, 48vw, 34rem);
  z-index: 3;
}

.cover-section__leaf {
  position: absolute;
  width: clamp(1.2rem, 2.6vw, 2rem);
  height: auto;
  opacity: 0.7;
  object-fit: contain;
  animation: leaf-drift 7.4s ease-in-out infinite;
}

.cover-section__leaf--one {
  left: 38%;
  top: 28%;
}

.cover-section__leaf--two {
  right: 32%;
  bottom: 24%;
  animation-delay: -3.4s;
}

.cover-section__title-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  flex-wrap: nowrap;
}

.cover-section__ornament-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-section__islamic-ornament-img {
  width: clamp(4rem, 8vw, 5.5rem);
  margin: 0;
  height: auto;
  object-fit: contain;
  animation: rotate-ornament 12s linear infinite;
}

.cover-section__gate {
  position: relative;
  z-index: 3;
  width: min(100%, 42rem);
  margin-top: 3rem;
  padding: 2.8rem 2rem 3rem;
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: 2.4rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.22));
  box-shadow: 0 24px 70px rgba(31, 58, 95, 0.16);
  backdrop-filter: blur(14px);
}

.cover-section__gate::before {
  position: absolute;
  inset: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 1.8rem;
  content: '';
  pointer-events: none;
}

.cover-section__gate-flower {
  position: absolute;
  width: clamp(10rem, 16vw, 12rem);
  height: auto;
  object-fit: contain;
  opacity: 0.9;
  pointer-events: none;
}

.cover-section__gate-flower--left {
  top: 0.45rem;
  left: -0.25rem;
}

.cover-section__gate-flower--right {
  top: 0.45rem;
  right: -0.25rem;
  transform: scaleX(-1);
}

.cover-section__butterfly {
  position: absolute;
  top: 1rem;
  width: 1.8rem;
  height: 1.2rem;
  opacity: 0.94;
  animation: butterfly-float 7.2s ease-in-out infinite;
}

.cover-section__butterfly::before,
.cover-section__butterfly::after {
  position: absolute;
  top: 0.08rem;
  width: 0.9rem;
  height: 0.95rem;
  border: 1px solid rgba(64, 157, 221, 0.35);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.84), rgba(241, 198, 101, 0.24));
  content: '';
}

.cover-section__butterfly::before {
  left: 0;
  border-radius: 90% 20% 70% 25%;
  transform: rotate(-18deg);
  transform-origin: right center;
}

.cover-section__butterfly::after {
  right: 0;
  border-radius: 20% 90% 25% 70%;
  transform: rotate(18deg);
  transform-origin: left center;
}

.cover-section__butterfly--left {
  left: 2.25rem;
  animation-delay: -2.2s;
}

.cover-section__butterfly--right {
  right: 2.25rem;
  animation-delay: -4.2s;
}

.cover-section__inner {
  position: relative;
  z-index: 3;
  display: grid;
  justify-items: center;
  gap: 1.3rem;
}

.cover-section__countdown {
  display: grid;
  grid-auto-flow: column;
  gap: 0.6rem;
  align-items: center;
}

.cover-section__countdown-item {
  display: grid;
  min-width: 3.6rem;
  min-height: 3.6rem;
  place-items: center;
  padding: 0.5rem;
  text-align: center;
}

.cover-section__countdown-item strong {
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 4.5vw, 2rem);
  line-height: 1;
}

.cover-section__countdown-item span {
  color: var(--color-text-secondary);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.cover-section__eyebrow {
  margin: 4.5rem 0 2rem;
  color: var(--color-primary);
  font-family: 'Monsieur La Douceur', 'Great Vibes', cursive;
  font-size: 2rem;
  font-weight: 1000;
  font-style: bold;
  letter-spacing: 0.24em;
  text-transform: none;
  text-shadow: 0 16px 32px rgb(0, 160, 228);
}

.cover-section__title {
  max-width: 54rem;
  margin: 0;
  color: transparent;
  background: linear-gradient(135deg, var(--color-primary), #226fae 52%, var(--color-sky));
  background-clip: text;
  font-family: var(--font-heading);
  font-size: clamp(3.1rem, 10vw, 6.8rem);
  font-weight: 700;
  line-height: 0.95;
  text-shadow: 0 10px 40px rgba(255, 255, 255, 0.45);
}

.cover-section__title span {
  display: inline-block;
  padding: 0 0.2em;
  color: #c9a84c;
}

.cover-section__date {
  margin: 0;
  border-top: 1px solid rgba(201, 168, 76, 0.5);
  border-bottom: 1px solid rgba(201, 168, 76, 0.5);
  padding: 0.55rem 0.95rem;
  color: var(--color-primary);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cover-section__guest {
  display: grid;
  width: min(100%, 24rem);
  gap: 0.2rem;
  padding: 1rem;
  border: 2px solid rgba(201, 168, 76, 0.5);
  box-shadow: 0 20px 55px rgba(64, 157, 221, 0.14);
  background: linear-gradient(
    135deg,
    rgba(180, 210, 235, 0.65) 0%,
    rgba(235, 245, 255, 0.9) 45%,
    rgba(200, 225, 245, 0.7) 100%
  );
  backdrop-filter: blur(14px);
}

.cover-section__guest span {
  color: var(--color-text-secondary);
  font-size: 0.84rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.cover-section__guest strong {
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.5rem;
  line-height: 1.15;
}

.cover-section__open-wrap {
  display: grid;
  justify-items: center;
  gap: 0.85rem;
}

.cover-section__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 0.4rem;
  box-shadow: 0 18px 45px rgba(64, 157, 221, 0.25);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.cover-section__button--opened {
  background: linear-gradient(180deg, #7fabeb 0%, #477ac8 100%);
  box-shadow:
    0 16px 34px rgba(65, 118, 196, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.cover-section__button .button-icon {
  flex: 0 0 auto;
}

.cover-section__scroll-hint {
  display: grid;
  justify-items: center;
  gap: 0.25rem;
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0;
}

.cover-section__scroll-hint svg {
  width: 1.45rem;
  height: 1.45rem;
  fill: none;
  stroke: #c9a84c;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: cover-arrow-bounce 1.25s ease-in-out infinite;
}

@keyframes cover-arrow-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.55;
  }

  50% {
    transform: translateY(0.45rem);
    opacity: 1;
  }
}

@keyframes floral-drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(0.4rem, -0.55rem, 0) rotate(8deg);
  }
}

@keyframes tree-sway {
  0%,
  100% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(3deg);
  }
}

@keyframes leaf-drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(0.5rem, -0.35rem, 0) rotate(12deg);
  }
}

@keyframes rotate-ornament {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes butterfly-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-6deg);
  }

  50% {
    transform: translate3d(0.45rem, -0.4rem, 0) rotate(6deg);
  }
}

@media (min-width: 1024px) {
  .cover-section__gate {
    width: min(100%, 46rem);
    margin-top: 2rem;
    padding: 3rem 2.75rem 3.2rem;
  }

  .cover-section__inner {
    gap: 1.4rem;
  }

  .cover-section__title-stack {
    gap: 1.1rem;
  }

  .cover-section__flower-border {
    width: clamp(18rem, 24vw, 26rem);
  }

  .cover-section__blossom--flowers {
    width: clamp(24rem, 33vw, 34rem);
  }
}

@media (max-width: 640px) {
  .cover-section__title-stack {
    gap: 0.55rem;
  }

  .cover-section__flower--two,
  .cover-section__flower--three {
    opacity: 0.62;
  }

  .cover-section__flower-border--right {
    bottom: 0;
    right: 0;
    transform: scaleX(-1);
  }

  .cover-section__gate {
    padding: 2rem 1.2rem 2.3rem;
  }

  .cover-section__butterfly--right {
    right: 1.1rem;
  }

  .cover-section__scroll-hint {
    font-size: 0.72rem;
  }
}
</style>