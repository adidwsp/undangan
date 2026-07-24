<template>
  <nav ref="navRef" class="navigation-dots" aria-label="Navigasi undangan">
    <button
      v-for="item in items"
      :key="item.id"
      ref="dotRefs"
      class="navigation-dots__item"
      type="button"
      :class="{ 'navigation-dots__item--active': activeId === item.id }"
      :aria-label="`Menuju ${item.label}`"
      @click="scrollTo(item.id)"
    >
      <span class="navigation-dots__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const navRef = ref(null)
const dotRefs = ref([])
const activeId = ref('cover')

function scrollTo(id) {
  const target = document.getElementById(id)
  activeId.value = id

  if (window.lenis && target) {
    window.lenis.scrollTo(target)
    return
  }

  target?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Stagger slide-in from right
  if (navRef.value) {
    gsap.fromTo(
      navRef.value.querySelectorAll('.navigation-dots__item'),
      {
        x: 30,
        opacity: 0,
        scale: 0.6,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'back.out(1.7)',
        delay: 2.2,
      }
    )
  }

  // Track active section on scroll using ScrollTrigger
  const sectionIds = props.items.map((item) => `#${item.id}`)
  sectionIds.forEach((selector) => {
    ScrollTrigger.create({
      trigger: selector,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        const id = selector.replace('#', '')
        activeId.value = id
      },
      onEnterBack: () => {
        const id = selector.replace('#', '')
        activeId.value = id
      },
    })
  })
})
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
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  padding: 0;
}

.navigation-dots__item:hover {
  background: var(--color-primary);
  transform: scale(1.3);
}

.navigation-dots__item--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(64, 157, 221, 0.25);
  transform: scale(1.2);
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
