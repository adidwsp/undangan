<template>
  <section id="cover" class="section cover-section" aria-labelledby="cover-title">
    <div id="cover-stars" class="cover-section__particles" aria-hidden="true" />
    <div class="cover-section__sky" aria-hidden="true">
      <span class="cover-section__cloud cover-section__cloud--one" />
      <span class="cover-section__cloud cover-section__cloud--two" />
      <span class="cover-section__floral cover-section__floral--left" />
      <span class="cover-section__floral cover-section__floral--right" />
    </div>

    <div class="cover-section__inner section__inner">
      <p class="section__eyebrow">The Wedding of</p>
      <h1 id="cover-title" class="cover-section__title">Adi &amp; Annisa</h1>

      <div class="cover-section__date">Sabtu, 5 September 2026</div>

      <div class="cover-section__guest glass-card">
        <span>Kepada Yth.</span>
        <strong>{{ guestStore.displayName }}</strong>
      </div>

      <button class="primary-button cover-section__button" type="button" @click="openInvitation">
        Buka Undangan
      </button>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

import audioSrc from '@/assets/audio/nasyid-instrumental-placeholder.wav'
import { useGuestStore } from '@/stores/guest'

const guestStore = useGuestStore()
let sound
let particlesInstance

async function initParticles() {
  const [{ tsParticles }, { loadFull }] = await Promise.all([
    import('@tsparticles/engine'),
    import('tsparticles'),
  ])

  await loadFull(tsParticles)
  particlesInstance = await tsParticles.load({
    id: 'cover-stars',
    options: {
      background: { color: 'transparent' },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        color: { value: ['#1F3A5F', '#409DDD', '#72C7F7', '#C9A84C'] },
        links: { enable: false },
        move: {
          direction: 'top',
          enable: true,
          outModes: { default: 'out' },
          random: true,
          speed: { min: 0.12, max: 0.42 },
        },
        number: { density: { enable: true, width: 800, height: 800 }, value: 42 },
        opacity: {
          value: { min: 0.18, max: 0.62 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 2.6 } },
      },
    },
  })
}

async function openInvitation() {
  if (!sound) {
    const { Howl } = await import('howler')

    sound = new Howl({
      src: [audioSrc],
      loop: true,
      volume: 0.22,
      html5: false,
    })
  }

  if (!sound.playing()) sound.play()
  document.getElementById('ayat')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  initParticles()
  // TODO: pasang fade-in nama pasangan dan falling petals dengan GSAP setelah struktur final.
})

onBeforeUnmount(() => {
  particlesInstance?.destroy()
  sound?.stop()
})
</script>

<style scoped>
.cover-section {
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(239, 249, 255, 0.58), rgba(244, 251, 255, 0.95)),
    radial-gradient(circle at 50% 8%, rgba(114, 199, 247, 0.78), transparent 23rem),
    linear-gradient(165deg, #dff4ff 0%, #f7fcff 52%, #edf8ff 100%);
  text-align: center;
}

.cover-section::before {
  position: absolute;
  inset: auto -16% -13rem;
  z-index: -1;
  height: 31rem;
  background:
    radial-gradient(circle at 22% 44%, rgba(245, 230, 204, 0.64), transparent 16rem),
    radial-gradient(circle at 76% 34%, rgba(114, 199, 247, 0.48), transparent 18rem),
    linear-gradient(180deg, transparent, rgba(182, 219, 247, 0.34));
  content: '';
}

.cover-section::after {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.52) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.42) 1px, transparent 1px);
  background-size: 4rem 4rem;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 64%);
  content: '';
}

.cover-section__particles {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.cover-section__sky {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.cover-section__cloud {
  position: absolute;
  width: clamp(9rem, 26vw, 22rem);
  height: clamp(3.8rem, 10vw, 8rem);
  border-radius: 999px;
  background:
    radial-gradient(circle at 18% 50%, rgba(255, 255, 255, 0.82) 0 34%, transparent 35%),
    radial-gradient(circle at 46% 38%, rgba(255, 255, 255, 0.86) 0 42%, transparent 43%),
    radial-gradient(circle at 74% 54%, rgba(255, 255, 255, 0.72) 0 31%, transparent 32%);
  filter: blur(0.2px);
  opacity: 0.72;
}

.cover-section__cloud--one {
  top: 14vh;
  left: -3rem;
  animation: cloud-drift 23s ease-in-out infinite;
}

.cover-section__cloud--two {
  right: -4rem;
  bottom: 22vh;
  opacity: 0.54;
  transform: scale(0.82);
  animation: cloud-drift 28s ease-in-out infinite reverse;
}

.cover-section__floral {
  position: absolute;
  width: clamp(8rem, 24vw, 18rem);
  height: clamp(8rem, 24vw, 18rem);
  opacity: 0.56;
}

.cover-section__floral::before,
.cover-section__floral::after {
  position: absolute;
  border-radius: 999px 999px 999px 0;
  background:
    radial-gradient(circle at 35% 32%, rgba(255, 255, 255, 0.86), transparent 30%),
    linear-gradient(145deg, rgba(114, 199, 247, 0.52), rgba(245, 230, 204, 0.42));
  box-shadow:
    2.8rem 1.4rem 0 -0.55rem rgba(182, 219, 247, 0.45),
    1.35rem 3rem 0 -0.72rem rgba(245, 230, 204, 0.54);
  content: '';
}

.cover-section__floral::before {
  inset: 18% 24% 28% 12%;
  transform: rotate(-22deg);
}

.cover-section__floral::after {
  inset: 42% 12% 12% 44%;
  transform: rotate(28deg);
}

.cover-section__floral--left {
  left: -3.8rem;
  bottom: 3.4rem;
}

.cover-section__floral--right {
  top: 5rem;
  right: -4.2rem;
  transform: scaleX(-1) rotate(-8deg);
}

.cover-section__inner {
  display: grid;
  justify-items: center;
  gap: 1.3rem;
}

.cover-section__title {
  max-width: 52rem;
  margin: 0;
  color: transparent;
  background: linear-gradient(135deg, var(--color-primary), #226fae 52%, var(--color-sky));
  background-clip: text;
  font-family: var(--font-heading);
  font-size: clamp(3rem, 15vw, 7.5rem);
  font-weight: 700;
  line-height: 0.98;
}

.cover-section__date {
  border-top: 1px solid rgba(201, 168, 76, 0.62);
  border-bottom: 1px solid rgba(64, 157, 221, 0.36);
  padding: 0.5rem 0.9rem;
  color: var(--color-primary);
  font-weight: 600;
}

.cover-section__guest {
  display: grid;
  width: min(100%, 24rem);
  gap: 0.28rem;
  padding: 1rem;
}

.cover-section__guest span {
  color: var(--color-text-secondary);
  font-size: 0.88rem;
}

.cover-section__guest strong {
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.55rem;
  line-height: 1.2;
}

.cover-section__button {
  margin-top: 0.35rem;
}

@keyframes cloud-drift {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 2.4rem -0.45rem;
  }
}

@media (max-width: 640px) {
  .cover-section__floral {
    opacity: 0.38;
  }

  .cover-section__floral--right {
    top: 2.8rem;
  }
}
</style>
