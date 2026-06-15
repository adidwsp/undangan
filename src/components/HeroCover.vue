<template>
  <section id="cover" class="section cover-section" aria-labelledby="cover-title">
    <div id="cover-particles" class="cover-section__particles" aria-hidden="true" />
    <div class="cover-section__backdrop" aria-hidden="true">
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
      <img :src="treesImage" class="cover-section__tree cover-section__tree--left" alt="" />
      <img :src="treesImage" class="cover-section__tree cover-section__tree--right" alt="" />
      <img :src="botanical02" class="cover-section__leaf cover-section__leaf--one" alt="" />
      <img :src="botanical03" class="cover-section__leaf cover-section__leaf--two" alt="" />
    </div>

    <div class="cover-section__gate">
      <img :src="floralCorner" class="cover-section__gate-ornament cover-section__gate-ornament--top" alt="" />
      <img :src="floralCorner" class="cover-section__gate-ornament cover-section__gate-ornament--bottom" alt="" />
      <span class="cover-section__gate-flower cover-section__gate-flower--left" />
      <span class="cover-section__gate-flower cover-section__gate-flower--right" />
      <span class="cover-section__butterfly cover-section__butterfly--left" />
      <span class="cover-section__butterfly cover-section__butterfly--right" />

      <div class="section__inner cover-section__inner">
        <p ref="eyebrowRef" class="cover-section__eyebrow">The Wedding of</p>
        <div class="cover-section__title-stack">
          <img :src="calligraphy" class="cover-section__islamic-ornament-img" alt="ornament" />
          <h1 ref="titleRef" id="cover-title" class="cover-section__title">
            Adi <span>&</span> Annisa
          </h1>
        </div>
        <p ref="dateRef" class="cover-section__date">Sabtu, 5 September 2026</p>

        <div ref="guestRef" class="cover-section__guest glass-card">
          <span>Kepada Yth.</span>
          <strong>{{ guestStore.displayName }}</strong>
        </div>

        <button ref="buttonRef" class="primary-button cover-section__button" type="button" @click="openInvitation">
          Buka Undangan
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useGuestStore } from '@/stores/guest'
import treesImage from '@/assets/images/trees.png'
import floralCorner from '@/assets/images/floral-corner.png'
import calligraphy from '@/assets/images/calligraphy-placeholder.webp'
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
let particlesInstance

async function initParticles() {
  const [{ tsParticles }, { loadFull }] = await Promise.all([
    import('@tsparticles/engine'),
    import('tsparticles'),
  ])

  await loadFull(tsParticles)
  particlesInstance = await tsParticles.load({
    id: 'cover-particles',
    options: {
      background: { color: 'transparent' },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        color: { value: ['#c9a84c', '#72c7f7', '#1f3a5f'] },
        move: {
          enable: true,
          speed: { min: 0.15, max: 0.35 },
          direction: 'top',
          outModes: { default: 'out' },
        },
        number: { value: 36, density: { enable: true, width: 600, height: 600 } },
        opacity: { value: { min: 0.16, max: 0.3 } },
        size: { value: { min: 0.4, max: 1.6 } },
        links: { enable: false },
      },
    },
  })
}

function playEntrance() {
  const targets = [eyebrowRef.value, titleRef.value, dateRef.value, guestRef.value, buttonRef.value]

  gsap.fromTo(
    targets,
    { y: 36, opacity: 0, scale: 0.97 },
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

function openInvitation() {
  emit('open')

  gsap.to([guestRef.value, buttonRef.value], {
    y: -10,
    opacity: 0.95,
    scale: 0.98,
    duration: 0.55,
    ease: 'power2.inOut',
  })
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
  min-height: 100svh;
  text-align: center;
  background:
    radial-gradient(circle at 50% 8%, rgba(114, 199, 247, 0.62), transparent 24rem),
    radial-gradient(circle at 12% 18%, rgba(201, 168, 76, 0.18), transparent 22rem),
    linear-gradient(145deg, rgba(242, 250, 255, 0.9) 0%, rgba(253, 253, 255, 0.86) 48%, rgba(233, 247, 255, 0.95) 100%);
}

.cover-section::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.48), transparent 30%, rgba(255, 255, 255, 0.16) 70%, rgba(255, 255, 255, 0.42));
  opacity: 0.82;
  content: '';
  pointer-events: none;
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

.cover-section__tree {
  position: absolute;
  width: clamp(8.2rem, 19vw, 13rem);
  height: auto;
  object-fit: contain;
  opacity: 0.82;
  filter: drop-shadow(0 12px 24px rgba(31, 58, 95, 0.16));
  animation: tree-sway 9.2s ease-in-out infinite;
  pointer-events: none;
}

.cover-section__tree--left {
  left: -1.8rem;
  bottom: -1.2rem;
  transform-origin: center bottom;
}

.cover-section__tree--right {
  right: -1.8rem;
  top: 13%;
  transform: scale(0.9);
  transform-origin: center bottom;
  animation-delay: -3.4s;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.cover-section__islamic-ornament {
  position: relative;
  flex-shrink: 0;
  width: clamp(3rem, 5vw, 4.25rem);
  height: clamp(3rem, 5vw, 4.25rem);
  border: 2px solid rgba(201, 168, 76, 0.43);
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9), transparent 24%),
    conic-gradient(from 0deg, rgba(201, 168, 76, 0.45), rgba(64, 157, 221, 0.26), rgba(201, 168, 76, 0.45));
  box-shadow: 0 12px 30px rgba(64, 157, 221, 0.16);
  animation: rotate-ornament 12s linear infinite;
}

.cover-section__islamic-ornament-img {
  width: clamp(3rem, 6vw, 4.25rem);
  height: auto;
  object-fit: contain;
  animation: rotate-ornament 12s linear infinite;
}

.cover-section__islamic-ornament::before,
.cover-section__islamic-ornament::after {
  position: absolute;
  inset: 0.62rem;
  border: 1px solid rgba(255, 255, 255, 0.44);
  border-radius: inherit;
  content: '';
}

.cover-section__islamic-ornament::after {
  inset: 1.05rem;
  border-color: rgba(31, 58, 95, 0.18);
}

.cover-section__gate {
  position: relative;
  z-index: 3;
  width: min(100%, 42rem);
  margin: 0 auto;
  padding: 2.35rem 1.8rem 2.55rem;
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

.cover-section__gate-ornament {
  position: absolute;
  left: 50%;
  width: clamp(10rem, 24vw, 13.5rem);
  object-fit: contain;
  opacity: 0.9;
  pointer-events: none;
  transform: translateX(-50%);
}

.cover-section__gate-ornament--top {
  top: -1.2rem;
}

.cover-section__gate-ornament--bottom {
  bottom: -1.35rem;
  transform: translateX(-50%) rotate(180deg);
}

.cover-section__gate-flower {
  position: absolute;
  width: clamp(2.4rem, 4vw, 3.4rem);
  height: clamp(2.4rem, 4vw, 3.4rem);
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.92), transparent 24%),
    radial-gradient(circle at 30% 30%, rgba(230, 126, 149, 0.82), transparent 24%),
    radial-gradient(circle at 70% 30%, rgba(230, 126, 149, 0.82), transparent 24%),
    radial-gradient(circle at 30% 70%, rgba(241, 198, 101, 0.76), transparent 24%),
    radial-gradient(circle at 70% 70%, rgba(241, 198, 101, 0.76), transparent 24%),
    linear-gradient(135deg, rgba(242, 174, 191, 0.92), rgba(114, 199, 247, 0.46));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.24);
  opacity: 0.9;
}

.cover-section__gate-flower::before,
.cover-section__gate-flower::after {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  content: '';
}

.cover-section__gate-flower::before {
  transform: rotate(35deg) scale(0.82);
  background: rgba(255, 255, 255, 0.2);
}

.cover-section__gate-flower::after {
  transform: rotate(-35deg) scale(0.7);
  background: rgba(64, 157, 221, 0.16);
}

.cover-section__gate-flower--left {
  top: 0.45rem;
  left: 0.75rem;
}

.cover-section__gate-flower--right {
  top: 0.45rem;
  right: 0.75rem;
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
  gap: 1.15rem;
}

.cover-section__eyebrow {
  margin: 0;
  color: var(--color-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  text-shadow: 0 8px 22px rgba(255, 255, 255, 0.5);
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
}

.cover-section__date {
  margin: 0;
  border-top: 1px solid rgba(201, 168, 76, 0.5);
  border-bottom: 1px solid rgba(64, 157, 221, 0.3);
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
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 55px rgba(64, 157, 221, 0.14);
  background: rgba(255, 255, 255, 0.66);
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

.cover-section__button {
  margin-top: 0.4rem;
  box-shadow: 0 18px 45px rgba(64, 157, 221, 0.25);
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

@media (max-width: 640px) {
  .cover-section__title-stack {
    gap: 0.55rem;
  }

  .cover-section__flower--two,
  .cover-section__flower--three {
    opacity: 0.62;
  }

  .cover-section__tree--right {
    top: 8%;
  }

  .cover-section__gate {
    padding: 2rem 1.2rem 2.3rem;
  }

  .cover-section__gate-ornament {
    width: clamp(8.5rem, 40vw, 10.5rem);
  }

  .cover-section__butterfly--right {
    right: 1.1rem;
  }
}
</style>
