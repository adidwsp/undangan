<template>
  <nav class="navigation-dots" aria-label="Navigasi undangan">
    <button
      v-for="item in items"
      :key="item.id"
      class="navigation-dots__item"
      type="button"
      :aria-label="`Menuju ${item.label}`"
      @click="scrollTo(item.id)"
    >
      <span class="navigation-dots__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})

function scrollTo(id) {
  const target = document.getElementById(id)

  if (window.lenis && target) {
    window.lenis.scrollTo(target)
    return
  }

  target?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.navigation-dots {
  position: fixed;
  right: 0.8rem;
  bottom: 1rem;
  z-index: 20;
  display: none;
  flex-direction: column;
  gap: 0.55rem;
}

.navigation-dots__item {
  position: relative;
  width: 0.72rem;
  height: 0.72rem;
  border: 1px solid rgba(64, 157, 221, 0.42);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 6px 18px rgba(64, 157, 221, 0.16);
}

.navigation-dots__item:hover {
  background: var(--color-primary);
}

.navigation-dots__label {
  position: absolute;
  right: 1.15rem;
  top: 50%;
  width: max-content;
  max-width: 9rem;
  border: 1px solid rgba(64, 157, 221, 0.2);
  border-radius: var(--radius-sm);
  padding: 0.2rem 0.48rem;
  color: var(--color-primary);
  background: var(--color-surface);
  font-size: 0.72rem;
  opacity: 0;
  transform: translateY(-50%) translateX(0.25rem);
  transition:
    opacity 160ms ease,
    transform 160ms ease;
  pointer-events: none;
}

.navigation-dots__item:hover .navigation-dots__label {
  opacity: 1;
  transform: translateY(-50%);
}

@media (min-width: 860px) {
  .navigation-dots {
    display: flex;
  }
}
</style>
