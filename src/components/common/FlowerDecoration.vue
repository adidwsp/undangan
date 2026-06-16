<template>
  <div class="flower-decoration" aria-hidden="true">
    <img
      :src="topLeft"
      class="flower-decoration__item flower-decoration__item--top"
      alt=""
      loading="lazy"
    />
    <img
      :src="threeFlowers"
      class="flower-decoration__item flower-decoration__item--bottom"
      alt=""
      loading="lazy"
    />
  </div>
</template>

<script setup>
import topLeft from '@/assets/images/topleft-blossom-gold.png'
import threeFlowers from '@/assets/images/three-flowers.png'
</script>

<style scoped>
.flower-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.flower-decoration__item {
  position: absolute;
  display: block;
  user-select: none;
  max-width: 12rem;
  opacity: 0.92;
  transform-origin: center;
}

.flower-decoration__item--top {
  top: -2rem;
  left: 80%;
  width: clamp(10rem, 22vw, 14rem);
  transform: translateX(-50%) rotate(-4deg);
}

.flower-decoration__item--bottom {
  bottom: -4rem;
  right: 1.5rem;
  width: clamp(16rem, 18vw, 12rem);
  transform: rotate(6deg);
}
</style>
