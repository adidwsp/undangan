<template>
  <button
    class="floating-audio-btn"
    :class="{ 'floating-audio-btn--playing': isPlaying }"
    :aria-pressed="isPlaying.toString()"
    :aria-label="isPlaying ? 'Pause background music' : 'Play background music'"
    @click="togglePlay"
  >
    <!-- Ikon speaker + gelombang suara -->
    <svg
      v-if="!isPlaying"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="audio-icon"
    >
      <path d="M3 9v6h4l5 4V5L7 9H3z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19 6a9 9 0 0 1 0 12" />
    </svg>

    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="audio-icon audio-icon--playing"
    >
      <path d="M3 9v6h4l5 4V5L7 9H3z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19 6a9 9 0 0 1 0 12" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isPlaying = ref(false)
let sound = null

async function ensureSound() {
  if (window.invitationSound) {
    sound = window.invitationSound
    return
  }

  try {
    const { Howl } = await import('howler')
    const audioSrc = (await import('@/assets/audio/backsound.mp3')).default

    sound = new Howl({
      src: [audioSrc],
      loop: true,
      volume: 0.6,
      html5: false,
    })

    window.invitationSound = sound
  } catch (e) {
    console.warn('Unable to load background audio', e)
  }
}

// 🔥 Ekspos method agar bisa dipanggil dari luar
async function play() {
  await ensureSound()
  if (!sound) return
  sound.play()
  isPlaying.value = true
}

async function pause() {
  if (!sound) return
  sound.pause()
  isPlaying.value = false
}

async function togglePlay() {
  await ensureSound()
  if (!sound) return

  if (sound.playing && sound.playing()) {
    await pause()
  } else {
    await play()
  }
}

// Ekspos ke parent
defineExpose({
  play,
  pause,
  togglePlay,
  isPlaying,
})

onMounted(async () => {
  await ensureSound()
  if (sound && sound.playing && sound.playing()) {
    isPlaying.value = true
  }
})

onBeforeUnmount(() => {
  // jangan unload sound agar bisa dipakai di komponen lain
})
</script>

<style scoped>
.floating-audio-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.85), rgba(180, 140, 50, 0.95));
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow:
    0 8px 24px rgba(201, 168, 76, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}

.floating-audio-btn::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(201, 168, 76, 0.3), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.floating-audio-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 12px 32px rgba(201, 168, 76, 0.5);
}

.floating-audio-btn:active {
  transform: scale(0.94);
}

.floating-audio-btn:focus-visible {
  outline: 2px solid #c9a84c;
  outline-offset: 3px;
}

/* State sedang diputar → efek pulsasi */
.floating-audio-btn--playing {
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.9), rgba(160, 120, 40, 0.95));
  box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.6);
  animation: audio-pulse 1.8s ease-in-out infinite;
}

.floating-audio-btn--playing::after {
  opacity: 1;
}

.audio-icon {
  width: 26px;
  height: 26px;
  stroke: #fff;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Ikon bergerak saat play */
.audio-icon--playing path:first-child {
  animation: speaker-wave 0.8s ease-in-out infinite alternate;
}
.audio-icon--playing path:nth-child(2) {
  animation: speaker-wave 1.2s ease-in-out infinite alternate-reverse 0.2s;
}
.audio-icon--playing path:nth-child(3) {
  animation: speaker-wave 1.6s ease-in-out infinite alternate 0.4s;
}

@keyframes audio-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.5);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(201, 168, 76, 0);
  }
}

@keyframes speaker-wave {
  0% {
    opacity: 0.4;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
}
</style>