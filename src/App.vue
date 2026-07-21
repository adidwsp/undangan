<template>
  <AppPreloader v-if="showPreloader" @ready="handlePreloaderReady" />
  <NavigationDots :items="navigationItems" />
  <!-- <DecorativeOrnaments /> -->

  <main class="invitation-page">
    <HeroCover @open="handleInvitationOpen" />
    <AyatSection />
    <CoupleProfile />
    <JourneySection />
    <CountdownSection />
    <EventDetails />
    <GiftSection />
    <GuestBook />
    <FooterSection />
  </main>
  <FloatingAudioButton />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {supabase} from '@/utils/supabase'

import AppPreloader from '@/components/AppPreloader.vue'
import AyatSection from '@/components/AyatSection.vue'
import CountdownSection from '@/components/CountdownSection.vue'
import CoupleProfile from '@/components/CoupleProfile.vue'
import EventDetails from '@/components/EventDetails.vue'
import FooterSection from '@/components/FooterSection.vue'
import GiftSection from '@/components/GiftSection.vue'
import GuestBook from '@/components/GuestBook.vue'
import HeroCover from '@/components/HeroCover.vue'
import JourneySection from '@/components/JourneySection.vue'
import DecorativeOrnaments from '@/components/common/DecorativeOrnaments.vue'
import NavigationDots from '@/components/common/NavigationDots.vue'
import { useGuestStore } from '@/stores/guest'
import FloatingAudioButton from '@/components/FloatingAudioButton.vue'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const guestStore = useGuestStore()
const showPreloader = ref(true)

let lenis = null
let rafId = null
let sound = null
let hasOpened = false

function setScrollLocked(locked) {
  document.documentElement.classList.toggle('scroll-locked', locked)
  document.body.classList.toggle('scroll-locked', locked)

  if (locked) {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}

const navigationItems = [
  { id: 'cover', label: 'Cover' },
  { id: 'ayat', label: 'Ayat' },
  { id: 'profil', label: 'Profil' },
  { id: 'journey', label: 'Perjalanan' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'detail', label: 'Detail' },
  { id: 'gift', label: 'Gift' },
  { id: 'wishes', label: 'Ucapan' },
  { id: 'footer', label: 'Penutup' },
]

watch(
  () => route.params.slug,
  (slug) => {
    guestStore.loadGuest(Array.isArray(slug) ? slug[0] : slug)
  },
  { immediate: true },
)

function initLenis() {
  lenis = new Lenis({
    duration: 1.12,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.12,
  })
  window.lenis = lenis

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  lenis.on('scroll', ScrollTrigger.update)
  lenis.stop()
  setScrollLocked(true)
}

function scrollToNextSection() {
  const target = document.getElementById('ayat')

  if (!target) return

  setScrollLocked(false)

  requestAnimationFrame(() => {
    lenis?.start()
    const offset = window.innerWidth < 768 ? 24 : 48

    if (lenis) {
      lenis.scrollTo(target, { offset: -offset, duration: 1.1 })
      return
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

async function initializeSound() {
  if (sound) {
    sound?.fade(0, 0.2, 2000)
    return
  }

  try {
    const { Howl } = await import('howler')
    const audioSrc = (await import('@/assets/audio/backsound.mp3')).default

    sound = new Howl({
      src: [audioSrc],
      loop: true,
      volume: 0,
      html5: false,
    })

    window.invitationSound = sound

    sound.play()
    sound.fade(0, 0.2, 2000)
  } catch (error) {
    console.warn('Unable to initialize invitation sound:', error)
  }
}

function handleInvitationOpen() {
  if (!hasOpened) {
    hasOpened = true
    void initializeSound()
  }

  scrollToNextSection()
}

function handlePreloaderReady() {
  showPreloader.value = false
  lenis?.start()
}

onMounted(() => {
  initLenis()
  setScrollLocked(true)
  window.requestAnimationFrame(() => ScrollTrigger.refresh())
})

onBeforeUnmount(() => {
  setScrollLocked(false)
  if (rafId) window.cancelAnimationFrame(rafId)
  lenis?.destroy()
  delete window.lenis
  sound?.stop()
})
</script>
