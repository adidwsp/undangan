<template>
  <section id="wishes" class="section wishes-section soft-band" aria-labelledby="wishes-title">
    <div class="section__inner">
      <SectionHeading eyebrow="Doa & Ucapan" title="Tinggalkan Doa Terbaik" id="wishes-title">
        Setiap doa baik yang dititipkan menjadi bagian hangat dari perjalanan ini.
      </SectionHeading>

      <div class="wishes-section__layout">
        <GlassCard class="wishes-section__form-card">
          <form class="wishes-section__form" @submit.prevent="submitWish">
            <label>
              Nama
              <input v-model.trim="form.guest_name" class="input-field" type="text" required />
            </label>

            <label>
              Ucapan
              <textarea v-model.trim="form.message" class="input-field" rows="3" required />
            </label>

            <label>
              Doa
              <textarea v-model.trim="form.prayer" class="input-field" rows="3" required />
            </label>

            <div class="wishes-section__chips" aria-label="Rekomendasi ucapan">
              <button v-for="chip in chips" :key="chip" type="button" @click="applyChip(chip)">
                {{ chip }}
              </button>
            </div>

            <button class="primary-button" type="submit" :disabled="wishesStore.isSubmitting">
              {{ wishesStore.isSubmitting ? 'Mengirim...' : 'Kirim Ucapan' }}
            </button>

            <p v-if="wishesStore.error" class="wishes-section__error">{{ wishesStore.error }}</p>
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
import { onBeforeUnmount, onMounted, reactive, watch } from 'vue'

import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useGuestStore } from '@/stores/guest'
import { useWishesStore } from '@/stores/wishes'

const guestStore = useGuestStore()
const wishesStore = useWishesStore()

const form = reactive({
  guest_name: guestStore.displayName,
  message: '',
  prayer: '',
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

async function submitWish() {
  await wishesStore.addWish({
    guest_name: form.guest_name,
    message: form.message,
    prayer: form.prayer,
  })

  if (!wishesStore.error) {
    form.message = ''
    form.prayer = ''
  }
}

onMounted(() => {
  wishesStore.loadWishes()
  wishesStore.subscribeToWishes()
  // TODO: animasikan form dan list ucapan dengan reveal ringan.
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
  gap: 0.4rem;
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

.wishes-section__error {
  margin: 0;
  color: #a34242;
  font-size: 0.9rem;
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
