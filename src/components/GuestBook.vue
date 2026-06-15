<template>
  <section id="wishes" class="section wishes-section soft-band" aria-labelledby="wishes-title">
    <div class="section__inner">
      <SectionHeading eyebrow="Doa & Ucapan" title="Tinggalkan Doa Terbaik" id="wishes-title">
        Setiap doa baik yang dititipkan menjadi bagian hangat dari perjalanan ini.
      </SectionHeading>

      <div class="wishes-section__layout">
        <GlassCard class="wishes-section__form-card">
          <form class="wishes-section__form" @submit.prevent="submitGuestBook">
            <label>
              Nama
              <input v-model.trim="form.guest_name" class="input-field" type="text" required />
            </label>

            <label>
              Konfirmasi Kehadiran
              <select v-model="form.attendance" class="input-field">
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Belum Pasti">Belum Pasti</option>
              </select>
            </label>

            <label>
              Jumlah Tamu
              <input v-model.number="form.guest_count" class="input-field" type="number" min="1" max="10" required />
            </label>

            <label>
              Ucapan / Doa
              <textarea v-model.trim="form.message" class="input-field" rows="3" required />
            </label>

            <div class="wishes-section__chips" aria-label="Rekomendasi ucapan">
              <button v-for="chip in chips" :key="chip" type="button" @click="applyChip(chip)">
                {{ chip }}
              </button>
            </div>

            <button class="primary-button" type="submit" :disabled="wishesStore.isSubmitting || rsvpStore.isSubmitting">
              {{ wishesStore.isSubmitting || rsvpStore.isSubmitting ? 'Mengirim...' : 'Kirim Ucapan' }}
            </button>

            <p v-if="feedback" class="wishes-section__feedback">{{ feedback }}</p>
            <p v-if="wishesStore.error" class="wishes-section__error">{{ wishesStore.error }}</p>
            <p v-if="rsvpStore.error" class="wishes-section__error">{{ rsvpStore.error }}</p>
          </form>
        </GlassCard>

        <div class="wishes-section__list" aria-live="polite">
          <GlassCard v-if="wishesStore.isLoading" class="wishes-section__wish">
            Memuat ucapan...
          </GlassCard>

          <GlassCard v-for="wish in wishesStore.items" :key="wish.id" class="wishes-section__wish">
            <h3>{{ wish.guest_name }}</h3>
            <p>{{ wish.message }}</p>
            <blockquote>{{ wish.prayer }}</blockquote>
          </GlassCard>

          <GlassCard v-if="!wishesStore.isLoading && wishesStore.items.length === 0" class="wishes-section__wish">
            Jadilah yang pertama menitipkan doa.
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useGuestStore } from '@/stores/guest'
import { useRsvpStore } from '@/stores/rsvp'
import { useWishesStore } from '@/stores/wishes'

gsap.registerPlugin(ScrollTrigger)

const guestStore = useGuestStore()
const wishesStore = useWishesStore()
const rsvpStore = useRsvpStore()
const feedback = ref('')

const form = reactive({
  guest_name: guestStore.displayName,
  attendance: 'Hadir',
  guest_count: 2,
  message: '',
})

const chips = [
  'Barakallahu lakuma',
  'Semoga menjadi keluarga sakinah',
  'Semoga Allah mudahkan setiap langkah',
]

watch(
  () => guestStore.displayName,
  (name) => {
    if (!form.guest_name || form.guest_name === 'Tamu Undangan') form.guest_name = name
  },
)

function applyChip(chip) {
  form.message = chip
}

async function submitGuestBook() {
  feedback.value = ''

  try {
    await rsvpStore.submitRsvp({
      guest_slug: guestStore.slug || 'guest',
      guest_name: form.guest_name,
      status: form.attendance,
      guest_count: form.guest_count,
    })

    await wishesStore.addWish({
      guest_name: form.guest_name,
      message: `${form.attendance} · ${form.guest_count} tamu`,
      prayer: form.message,
    })

    if (!rsvpStore.error && !wishesStore.error) {
      feedback.value = 'Terima kasih, doa dan konfirmasi Anda telah tersimpan.'
      form.message = ''
    }
  } catch (error) {
    feedback.value = error.message
  }
}

onMounted(() => {
  wishesStore.loadWishes()
  wishesStore.subscribeToWishes()

  gsap.fromTo(
    '.wishes-section__form-card, .wishes-section__wish',
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.wishes-section__layout',
        start: 'top 82%',
      },
    },
  )
})

onBeforeUnmount(() => {
  wishesStore.clearSubscription()
})
</script>

<style scoped>
.wishes-section__layout {
  display: grid;
  gap: 1rem;
}

.wishes-section__form {
  display: grid;
  gap: 1rem;
}

.wishes-section__form label {
  display: grid;
  gap: 0.45rem;
  color: var(--color-primary);
  font-weight: 800;
}

.wishes-section__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.wishes-section__chips button {
  border: 1px solid rgba(64, 157, 221, 0.22);
  border-radius: 999px;
  padding: 0.48rem 0.72rem;
  color: var(--color-primary);
  background: rgba(255, 255, 255, 0.84);
  font-size: 0.84rem;
  font-weight: 700;
}

.wishes-section__form .primary-button {
  justify-self: start;
}

.wishes-section__form .primary-button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.wishes-section__feedback,
.wishes-section__error {
  margin: 0;
  font-size: 0.95rem;
}

.wishes-section__feedback {
  color: var(--color-primary);
}

.wishes-section__error {
  color: #a34242;
}

.wishes-section__list {
  display: grid;
  max-height: 38rem;
  gap: 0.75rem;
  overflow: auto;
  padding-right: 0.2rem;
}

.wishes-section__wish {
  padding: 1rem;
}

.wishes-section__wish h3 {
  margin: 0 0 0.4rem;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.35rem;
}

.wishes-section__wish p {
  margin: 0;
  color: var(--color-text-primary);
}

.wishes-section__wish blockquote {
  margin: 0.7rem 0 0;
  border-left: 1px solid rgba(201, 168, 76, 0.74);
  padding-left: 0.8rem;
  color: var(--color-text-secondary);
}

@media (min-width: 900px) {
  .wishes-section__layout {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
  }
}
</style>
