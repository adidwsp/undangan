<template>
  <div class="decorative-ornaments" aria-hidden="true">
    <img :src="topBlossom" class="floral-highlight floral-highlight--top" alt="" loading="eager" />
    <img :src="bottomCorner" class="floral-highlight floral-highlight--bottom" alt="" loading="eager" />

    <img
      v-for="corner in floralCorners"
      :key="corner.className"
      :src="floralCorner"
      :class="['floral-corner', corner.className]"
      alt=""
      loading="eager"
    />

    <img
      v-for="item in fallingItems"
      :key="item.className"
      :src="item.src"
      :class="['falling-botanical', item.className]"
      :style="item.style"
      alt=""
      loading="eager"
    />

    <span
      v-for="butterfly in butterflies"
      :key="`butterfly-${butterfly}`"
      :class="['ornament ornament--butterfly', `ornament--butterfly-${butterfly}`]"
    />
    <span
      v-for="bird in birds"
      :key="`bird-${bird}`"
      :class="['ornament ornament--bird', `ornament--bird-${bird}`]"
    />
  </div>
</template>

<script setup>
import floralCorner from '@/assets/images/floral-corner.webp'
import topBlossom from '@/assets/images/top_blossom.png'
import bottomCorner from '@/assets/images/bottomright-corner.png'

const botanicalAssets = [
  new URL('../../assets/images/botanicals/botanical-01.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-02.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-03.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-04.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-05.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-07.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-08.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-10.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-14.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-17.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-18.webp', import.meta.url).href,
  new URL('../../assets/images/botanicals/botanical-21.webp', import.meta.url).href,
]

const floralCorners = [
  { className: 'floral-corner--top-left' },
  { className: 'floral-corner--top-right' },
  { className: 'floral-corner--bottom-left' },
  { className: 'floral-corner--bottom-right' },
]

const fallingItems = [
  { src: botanicalAssets[0], className: 'falling-botanical--1', style: '--left: 5%; --size: 4.2rem; --duration: 18s; --delay: -2s; --sway: 4rem; --spin: 280deg;' },
  { src: botanicalAssets[3], className: 'falling-botanical--2', style: '--left: 17%; --size: 3.2rem; --duration: 22s; --delay: -12s; --sway: -3rem; --spin: -220deg;' },
  { src: botanicalAssets[6], className: 'falling-botanical--3', style: '--left: 29%; --size: 3.9rem; --duration: 26s; --delay: -7s; --sway: 3.4rem; --spin: 260deg;' },
  { src: botanicalAssets[1], className: 'falling-botanical--4', style: '--left: 41%; --size: 4.6rem; --duration: 24s; --delay: -18s; --sway: -4.2rem; --spin: -300deg;' },
  { src: botanicalAssets[8], className: 'falling-botanical--5', style: '--left: 53%; --size: 3.4rem; --duration: 20s; --delay: -5s; --sway: 2.6rem; --spin: 180deg;' },
  { src: botanicalAssets[9], className: 'falling-botanical--6', style: '--left: 64%; --size: 4.8rem; --duration: 28s; --delay: -15s; --sway: -3.2rem; --spin: -260deg;' },
  { src: botanicalAssets[4], className: 'falling-botanical--7', style: '--left: 76%; --size: 3.8rem; --duration: 21s; --delay: -9s; --sway: 4rem; --spin: 240deg;' },
  { src: botanicalAssets[11], className: 'falling-botanical--8', style: '--left: 88%; --size: 3.5rem; --duration: 25s; --delay: -20s; --sway: -3.8rem; --spin: -210deg;' },
  { src: botanicalAssets[2], className: 'falling-botanical--9', style: '--left: 12%; --size: 3.4rem; --duration: 29s; --delay: -23s; --sway: 4.4rem; --spin: 310deg;' },
  { src: botanicalAssets[5], className: 'falling-botanical--10', style: '--left: 35%; --size: 3.1rem; --duration: 27s; --delay: -16s; --sway: -2.8rem; --spin: -260deg;' },
  { src: botanicalAssets[7], className: 'falling-botanical--11', style: '--left: 70%; --size: 3.2rem; --duration: 30s; --delay: -11s; --sway: 3.8rem; --spin: 220deg;' },
  { src: botanicalAssets[10], className: 'falling-botanical--12', style: '--left: 93%; --size: 4rem; --duration: 32s; --delay: -27s; --sway: -4.8rem; --spin: -320deg;' },
]

const butterflies = [1, 2, 3]
const birds = [1, 2, 3]
</script>

<style scoped>
.decorative-ornaments {
  position: fixed;
  inset: 0;
  z-index: 3;
  overflow: hidden;
  pointer-events: none;
}

.floral-highlight,
.floral-corner,
.falling-botanical,
.ornament {
  position: absolute;
  display: block;
  user-select: none;
  will-change: transform;
}

.floral-highlight {
  position: absolute;
  display: block;
  opacity: 0.5;
  user-select: none;
  pointer-events: none;
  z-index: 2;
}

.floral-highlight--top {
  top: -1rem;
  left: 50%;
  width: clamp(15rem, 35vw, 24rem);
  transform: translateX(-50%);
}

.floral-highlight--bottom {
  right: -1rem;
  bottom: -2rem;
  width: clamp(13rem, 28vw, 19rem);
  opacity: 0.28;
  transform: rotate(-8deg);
}

.floral-corner {
  width: clamp(15rem, 30vw, 30rem);
  opacity: 0.58;
  filter: drop-shadow(0 1.5rem 2.8rem rgba(64, 157, 221, 0.16));
  animation: floral-breathe 9s ease-in-out infinite;
  z-index: 2;
}

.floral-corner--top-left {
  top: -4.7rem;
  left: -5.6rem;
  transform-origin: left top;
}

.floral-corner--top-right {
  top: -4.7rem;
  right: -5.6rem;
  transform: scaleX(-1) rotate(-2deg);
  transform-origin: right top;
  animation-delay: -3s;
}

.floral-corner--bottom-left {
  bottom: -5.6rem;
  left: -5.8rem;
  transform: scaleY(-1) rotate(-2deg);
  transform-origin: left bottom;
  animation-delay: -5s;
}

.floral-corner--bottom-right {
  right: -5.8rem;
  bottom: -5.6rem;
  transform: scale(-1) rotate(2deg);
  transform-origin: right bottom;
  animation-delay: -1s;
}

.falling-botanical {
  top: -8rem;
  left: var(--left);
  width: var(--size);
  opacity: 0.3;
  filter: drop-shadow(0 0.8rem 1.5rem rgba(64, 157, 221, 0.12));
  animation: botanical-fall var(--duration) linear infinite;
  animation-delay: var(--delay);
  z-index: 2;
}

.ornament {
  opacity: 0.74;
  z-index: 2;
}

.ornament--butterfly {
  width: 1.35rem;
  height: 1rem;
  animation: butterfly-drift ease-in-out infinite;
}

.ornament--butterfly::before,
.ornament--butterfly::after {
  position: absolute;
  top: 0.05rem;
  width: 0.65rem;
  height: 0.92rem;
  border: 1px solid rgba(64, 157, 221, 0.42);
  background:
    radial-gradient(circle at 55% 35%, rgba(255, 255, 255, 0.72), transparent 34%),
    linear-gradient(145deg, rgba(182, 219, 247, 0.72), rgba(245, 230, 204, 0.42));
  content: '';
}

.ornament--butterfly::before {
  left: 0;
  border-radius: 85% 20% 70% 25%;
  transform: rotate(-18deg);
  transform-origin: right center;
  animation: wing-left 1.8s ease-in-out infinite;
}

.ornament--butterfly::after {
  right: 0;
  border-radius: 20% 85% 25% 70%;
  transform: rotate(18deg);
  transform-origin: left center;
  animation: wing-right 1.8s ease-in-out infinite;
}

.ornament--bird {
  width: 2.2rem;
  height: 0.8rem;
  opacity: 0.3;
  animation: bird-float ease-in-out infinite;
}

.ornament--bird::before,
.ornament--bird::after {
  position: absolute;
  top: 0.18rem;
  width: 1.08rem;
  height: 0.54rem;
  border-top: 2px solid rgba(31, 95, 150, 0.46);
  content: '';
}

.ornament--bird::before {
  left: 0.08rem;
  border-radius: 100% 0 0 0;
  transform: rotate(14deg);
}

.ornament--bird::after {
  right: 0.08rem;
  border-radius: 0 100% 0 0;
  transform: rotate(-14deg);
}

.ornament--butterfly-1 {
  top: 18vh;
  left: 8vw;
  animation-duration: 8s;
}

.ornament--butterfly-2 {
  top: 38vh;
  right: 9vw;
  animation-duration: 9.5s;
  animation-delay: -3s;
}

.ornament--butterfly-3 {
  bottom: 19vh;
  left: 74vw;
  animation-duration: 11s;
  animation-delay: -5s;
}

.ornament--bird-1 {
  top: 11vh;
  left: 62vw;
  animation-duration: 7s;
}

.ornament--bird-2 {
  top: 20vh;
  left: 77vw;
  transform: scale(0.72);
  animation-duration: 8.5s;
  animation-delay: -2s;
}

.ornament--bird-3 {
  top: 8vh;
  left: 16vw;
  transform: scale(0.58);
  animation-duration: 9s;
  animation-delay: -4s;
}

@keyframes floral-breathe {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0.6rem -0.4rem;
  }
}

@keyframes botanical-fall {
  0% {
    transform: translate3d(0, -14vh, 0) rotate(0deg);
  }
  45% {
    transform: translate3d(calc(var(--sway) * 0.7), 48vh, 0) rotate(calc(var(--spin) * 0.55));
  }
  100% {
    transform: translate3d(var(--sway), 116vh, 0) rotate(var(--spin));
  }
}

@keyframes butterfly-drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-5deg);
  }
  45% {
    transform: translate3d(1.2rem, -1rem, 0) rotate(7deg);
  }
  70% {
    transform: translate3d(-0.65rem, 0.85rem, 0) rotate(-2deg);
  }
}

@keyframes wing-left {
  50% {
    transform: rotate(-34deg) scaleX(0.88);
  }
}

@keyframes wing-right {
  50% {
    transform: rotate(34deg) scaleX(0.88);
  }
}

@keyframes bird-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0.8rem -0.35rem;
  }
}

@media (max-width: 640px) {
  .floral-corner {
    width: 16rem;
    opacity: 0.3;
  }

  .floral-corner--top-left,
  .floral-corner--bottom-left {
    left: -7.5rem;
  }

  .floral-corner--top-right,
  .floral-corner--bottom-right {
    right: -7.5rem;
  }

  .falling-botanical {
    width: calc(var(--size) * 0.72);
    opacity: 0.56;
  }

  .falling-botanical--4,
  .falling-botanical--8,
  .falling-botanical--11,
  .falling-botanical--12,
  .ornament--butterfly-3,
  .ornament--bird-3 {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floral-corner,
  .falling-botanical,
  .ornament,
  .ornament--butterfly::before,
  .ornament--butterfly::after {
    animation: none;
  }
}
</style>
