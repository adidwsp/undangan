<template>
  <button
    class="floating-audio-btn"
    :aria-pressed="isPlaying.toString()"
    :aria-label="isPlaying ? 'Pause background music' : 'Play background music'"
    @click="togglePlay"
  >
    <span v-if="!isPlaying">►</span>
    <span v-else>❚❚</span>
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

async function togglePlay() {
  await ensureSound()
  if (!sound) return

  if (sound.playing && sound.playing()) {
    sound.pause()
    isPlaying.value = false
  } else {
    sound.play()
    isPlaying.value = true
  }
}

onMounted(async () => {
  await ensureSound()
  if (sound && sound.playing && sound.playing()) isPlaying.value = true
})

onBeforeUnmount(() => {
  // don't unload the sound so App.vue or other parts can continue using it
})
</script>

<style scoped>
.floating-audio-btn {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 9999;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  display: inline-grid;
  place-items: center;
  font-size: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(16,24,40,0.3);
}

.floating-audio-btn:focus {
  outline: 2px solid rgba(255,255,255,0.18);
}
</style>
