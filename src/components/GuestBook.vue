<template>
  <section
    id="wishes"
    ref="wishesSection"
    class="section wishes-section"
    aria-labelledby="wishes-title"
  >
    <img
      :src="floralOrnament"
      class="wishes-section__ornament wishes-section__ornament--left"
      alt=""
      aria-hidden="true"
    />

    <img
      :src="floralOrnament"
      class="wishes-section__ornament wishes-section__ornament--right"
      alt=""
      aria-hidden="true"
    />

    <div class="wishes-section__shell">
      <header class="wishes-section__heading">
        <p class="wishes-section__eyebrow">Doa &amp; Ucapan</p>

        <h2 id="wishes-title" class="wishes-section__title">
          Tinggalkan Doa Terbaik
        </h2>

        <p class="wishes-section__lead">
          Setiap doa baik yang dititipkan menjadi<br />
          bagian hangat dari perjalanan ini.
        </p>

        <div class="wishes-section__divider" aria-hidden="true">
          <span></span>
          <i>♡</i>
          <span></span>
        </div>
      </header>

      <div class="wishes-section__form-card">
        <form class="wishes-section__form" @submit.prevent="submitGuestBook">
          <div class="wishes-section__field wishes-section__field--full">
            <div class="wishes-section__field-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.6-4.5 14.4-4.5 16 0" />
              </svg>
            </div>

            <label>
              <span>Nama</span>
              <input
                v-model.trim="form.guest_name"
                class="wishes-section__input"
                type="text"
                placeholder="Tamu Undangan"
                required
              />
            </label>
          </div>

          <div class="wishes-section__field">
            <div class="wishes-section__field-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20c1.2-4 10.8-4 12 0" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M15 17c2.5-.8 5.2.2 6 3" />
              </svg>
            </div>

            <label>
              <span>Konfirmasi Kehadiran</span>
              <select v-model="form.attendance" class="wishes-section__input">
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Belum Pasti">Belum Pasti</option>
              </select>
            </label>
          </div>

          <div class="wishes-section__field">
            <div class="wishes-section__field-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20c1.2-4 10.8-4 12 0" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M15 17c2.5-.8 5.2.2 6 3" />
              </svg>
            </div>

            <label>
              <span>Jumlah Tamu</span>
              <select v-model.number="form.guest_count" class="wishes-section__input">
                <option v-for="count in guestCounts" :key="count" :value="count">
                  {{ count }}
                </option>
              </select>
            </label>
          </div>

          <div class="wishes-section__field wishes-section__field--full">
            <div class="wishes-section__field-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 5h14v11H8l-3 3V5Z" />
                <path d="M8 9h8M8 12h5" />
              </svg>
            </div>

            <label>
              <span>Ucapan / Doa</span>
              <textarea
                v-model.trim="form.message"
                class="wishes-section__input wishes-section__textarea"
                rows="5"
                maxlength="500"
                placeholder="Tulis ucapan atau doa terbaik..."
                required
              />
              <small>{{ form.message.length }}/500</small>
            </label>
          </div>

          <div class="wishes-section__suggestion wishes-section__field--full">
            <p>
              <span aria-hidden="true">✣</span>
              Saran Doa
            </p>

            <div class="wishes-section__chips" aria-label="Rekomendasi ucapan">
              <button
                v-for="chip in chips"
                :key="chip.text"
                type="button"
                @click="applyChip(chip.text)"
              >
                <span aria-hidden="true">{{ chip.icon }}</span>
                {{ chip.text }}
              </button>
            </div>
          </div>

          <button
            class="wishes-section__submit"
            type="submit"
            :disabled="wishesStore.isSubmitting || rsvpStore.isSubmitting"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
            </svg>
            <span>
              {{ wishesStore.isSubmitting || rsvpStore.isSubmitting ? 'Mengirim...' : 'Kirim Ucapan' }}
            </span>
          </button>

          <p v-if="feedback" class="wishes-section__feedback">
            <span aria-hidden="true">♙</span>
            {{ feedback }}
          </p>

          <p v-if="wishesStore.error" class="wishes-section__error">
            {{ wishesStore.error }}
          </p>

          <p v-if="rsvpStore.error" class="wishes-section__error">
            {{ rsvpStore.error }}
          </p>
        </form>
      </div>

      <section class="wishes-section__list-card" aria-live="polite">
        <div class="wishes-section__list-header">
          <div class="wishes-section__list-title">
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 3v4M17 3v4M5 8h14" />
                <rect x="5" y="5" width="14" height="16" rx="2" />
              </svg>
            </span>
            <h3>Ucapan &amp; Doa Terkirim</h3>
          </div>

          <button class="wishes-section__filter" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />
            </svg>
            <span>Filter</span>
          </button>
        </div>

        <div class="wishes-section__list">
          <article v-if="wishesStore.isLoading" class="wishes-section__wish">
            <p class="wishes-section__empty">Memuat ucapan...</p>
          </article>

          <article
            v-for="wish in wishesStore.items"
            :key="wish.id"
            class="wishes-section__wish"
          >
            <div class="wishes-section__avatar" aria-hidden="true">
              {{ getInitial(wish.guest_name) }}
            </div>

            <div class="wishes-section__wish-body">
              <div class="wishes-section__wish-top">
                <div>
                  <h4>{{ wish.guest_name }}</h4>
                  <p>{{ formatWishMeta(wish) }}</p>
                </div>

                <div class="wishes-section__wish-badges">
                  <span
                    class="wishes-section__status"
                    :class="getStatusClass(wish.message)"
                  >
                    {{ getAttendanceStatus(wish.message) }}
                  </span>

                  <span class="wishes-section__guest-count">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="9" cy="8" r="3" />
                      <path d="M3 20c1.2-4 10.8-4 12 0" />
                      <circle cx="17" cy="9" r="2.5" />
                    </svg>
                    {{ getGuestCount(wish.message) }}
                  </span>
                </div>
              </div>

              <p class="wishes-section__message">
                {{ wish.prayer || wish.message }}
              </p>
            </div>
          </article>

          <article
            v-if="!wishesStore.isLoading && wishesStore.items.length === 0"
            class="wishes-section__wish"
          >
            <p class="wishes-section__empty">
              Jadilah yang pertama menitipkan doa.
            </p>
          </article>
        </div>
      </section>

      <div class="wishes-section__bottom-divider" aria-hidden="true">
        <span></span>
        <i>♡</i>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import floralOrnament from '@/assets/images/topleft-blossom-gold.png'
import { useGuestStore } from '@/stores/guest'
import { useRsvpStore } from '@/stores/rsvp'
import { useWishesStore } from '@/stores/wishes'

gsap.registerPlugin(ScrollTrigger)

const wishesSection = ref(null)
let animationContext

const guestStore = useGuestStore()
const wishesStore = useWishesStore()
const rsvpStore = useRsvpStore()
const feedback = ref('')

const guestCounts = [1, 2, 3, 4, 5, 6]

const form = reactive({
  guest_name: guestStore.displayName,
  attendance: 'Hadir',
  guest_count: 1,
  message: '',
})

const chips = [
  {
    icon: '♡',
    text: 'Barakallahu lakuma',
  },
  {
    icon: '✿',
    text: 'Semoga menjadi keluarga sakinah',
  },
  {
    icon: '♧',
    text: 'Semoga Allah mudahkan setiap langkah',
  },
  {
    icon: '✧',
    text: 'Semoga selalu diberi kebahagiaan',
  },
]

watch(
  () => guestStore.displayName,
  (name) => {
    if (!form.guest_name || form.guest_name === 'Tamu Undangan') {
      form.guest_name = name
    }
  },
)

function applyChip(chip) {
  form.message = chip
}

function getInitial(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || 'T'
}

function getAttendanceStatus(message = '') {
  if (message.includes('Tidak Hadir')) return 'Tidak Hadir'
  if (message.includes('Belum Pasti')) return 'Belum Pasti'
  return 'Hadir'
}

function getStatusClass(message = '') {
  const status = getAttendanceStatus(message)

  return {
    'wishes-section__status--present': status === 'Hadir',
    'wishes-section__status--absent': status === 'Tidak Hadir',
    'wishes-section__status--maybe': status === 'Belum Pasti',
  }
}

function getGuestCount(message = '') {
  const result = message.match(/(\d+)\s*tamu/i)
  return result?.[1] || '0'
}

function formatWishMeta(wish) {
  if (!wish.created_at) return 'Baru saja'

  const date = new Date(wish.created_at)

  if (Number.isNaN(date.getTime())) return 'Baru saja'

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  })
    .format(date)
    .replace(' pukul ', ' · ')
    .replace('.', ':')
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

  animationContext = gsap.context(() => {
    gsap.fromTo(
      '.wishes-section__heading',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.wishes-section__heading',
          start: 'top 88%',
        },
      },
    )

    gsap.fromTo(
      '.wishes-section__form-card, .wishes-section__list-card',
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.wishes-section__form-card',
          start: 'top 82%',
        },
      },
    )
  }, wishesSection)
})

onBeforeUnmount(() => {
  animationContext?.revert()
  wishesStore.clearSubscription()
})
</script>

<style scoped>
.wishes-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #183b66;
  background:
    radial-gradient(circle at 9% 9%, rgba(255, 255, 255, 0.95) 0 8rem, transparent 18rem),
    radial-gradient(circle at 88% 16%, rgba(255, 255, 255, 0.9) 0 7rem, transparent 17rem),
    linear-gradient(180deg, #eef8ff 0%, #fbfdff 44%, #edf8ff 100%);
}

.wishes-section::before {
  content: '';
  position: absolute;
  inset: 0.7rem;
  z-index: -1;
  border: 1px solid rgba(123, 174, 222, 0.24);
  border-radius: 0 0 3.8rem 3.8rem;
  pointer-events: none;
}

.wishes-section__shell {
  position: relative;
  z-index: 2;
  width: min(100%, 58rem);
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2.4rem) clamp(3rem, 8vw, 4.8rem);
}

.wishes-section__ornament {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  width: clamp(9rem, 26vw, 17rem);
  opacity: 0.65;
  filter: drop-shadow(0 14px 24px rgba(61, 111, 164, 0.1));
}

.wishes-section__ornament--left {
  top: -2.2rem;
  left: -4rem;
  transform: rotate(-4deg);
}

.wishes-section__ornament--right {
  top: 8.8rem;
  right: -5.2rem;
  transform: rotate(92deg) scaleX(-1);
}

.wishes-section__heading {
  position: relative;
  z-index: 3;
  width: min(100%, 43rem);
  margin: 0 auto clamp(2.3rem, 6vw, 3.7rem);
  text-align: center;
}

.wishes-section__eyebrow {
  margin: 0 0 1rem;
  color: #4e86ce;
  font-size: clamp(0.78rem, 2.4vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.32em;
  line-height: 1.25;
  text-transform: uppercase;
}

.wishes-section__title {
  margin: 0;
  color: #173a64;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(2.65rem, 8.4vw, 4.9rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.045em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.85);
}

.wishes-section__lead {
  margin: clamp(1.35rem, 3.8vw, 1.8rem) auto 0;
  color: #65778c;
  font-size: clamp(1rem, 3vw, 1.32rem);
  line-height: 1.65;
}

.wishes-section__divider,
.wishes-section__bottom-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: min(15rem, 62%);
  margin: clamp(1.2rem, 3.5vw, 1.6rem) auto 0;
  color: #c9a24a;
}

.wishes-section__divider span,
.wishes-section__bottom-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(201, 162, 74, 0.85), transparent);
}

.wishes-section__divider i,
.wishes-section__bottom-divider i {
  font-style: normal;
  line-height: 1;
}

.wishes-section__form-card,
.wishes-section__list-card {
  position: relative;
  z-index: 3;
  border: 1px solid rgba(133, 185, 226, 0.32);
  border-radius: clamp(1.6rem, 4vw, 2.8rem);
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.96), transparent 46%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(248, 253, 255, 0.8));
  box-shadow:
    0 24px 50px rgba(57, 108, 160, 0.13),
    inset 0 1px 0 rgba(255, 255, 255, 0.94);
}

.wishes-section__form-card {
  padding: clamp(1.6rem, 5vw, 3rem);
}

.wishes-section__form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.2rem, 3.2vw, 2rem);
}

.wishes-section__field {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.wishes-section__field--full {
  grid-column: 1 / -1;
}

.wishes-section__field-icon {
  display: grid;
  place-items: center;
  width: clamp(3.1rem, 7vw, 4.3rem);
  aspect-ratio: 1;
  margin-top: 1.8rem;
  border-radius: 999px;
  color: #4d84cc;
  background:
    radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.98), rgba(239, 247, 255, 0.88));
  box-shadow:
    0 14px 26px rgba(64, 118, 185, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
}

.wishes-section__field-icon svg,
.wishes-section__list-title svg,
.wishes-section__filter svg,
.wishes-section__submit svg,
.wishes-section__guest-count svg {
  width: 45%;
  height: 45%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.85;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wishes-section__field label {
  display: grid;
  min-width: 0;
  gap: 0.65rem;
  color: #0f3766;
  font-weight: 800;
}

.wishes-section__field label > span {
  font-size: clamp(0.9rem, 2.5vw, 1.05rem);
  line-height: 1.25;
}

.wishes-section__input {
  width: 100%;
  min-width: 0;
  border: 1px solid rgba(105, 157, 214, 0.34);
  border-radius: 0.65rem;
  padding: 0.95rem 1.1rem;
  color: #1f3f69;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78);
  font: inherit;
  font-weight: 500;
  outline: none;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.wishes-section__input::placeholder {
  color: rgba(91, 113, 137, 0.82);
}

.wishes-section__input:focus {
  border-color: rgba(79, 132, 203, 0.78);
  background: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 0 0 4px rgba(79, 132, 203, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.84);
}

.wishes-section__textarea {
  min-height: 9rem;
  resize: vertical;
}

.wishes-section__field small {
  justify-self: end;
  margin-top: -2rem;
  padding-right: 0.8rem;
  color: #637993;
  font-size: 0.85rem;
  font-weight: 600;
}

.wishes-section__suggestion {
  min-width: 0;
}

.wishes-section__suggestion > p {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 0.9rem;
  color: #103866;
  font-weight: 800;
}

.wishes-section__suggestion > p span {
  color: #4d84cc;
}

.wishes-section__chips {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.1rem 0 0.45rem;
  scrollbar-color: rgba(103, 128, 153, 0.5) rgba(103, 128, 153, 0.12);
}

.wishes-section__chips button {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  flex: 0 0 auto;
  max-width: 14rem;
  min-height: 4.4rem;
  border: 1px solid rgba(105, 157, 214, 0.3);
  border-radius: 0.75rem;
  padding: 0.85rem 1.05rem;
  color: #123d6f;
  background: rgba(255, 255, 255, 0.58);
  font: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

.wishes-section__chips button span {
  color: #4f84cc;
  font-size: 1.5rem;
  line-height: 1;
}

.wishes-section__chips button:hover {
  transform: translateY(-2px);
  border-color: rgba(79, 132, 204, 0.62);
  background: rgba(255, 255, 255, 0.9);
}

.wishes-section__submit {
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: min(100%, 46rem);
  margin: 0.4rem auto 0;
  border: 0;
  border-radius: 999px;
  padding: 1.1rem 1.4rem;
  color: #ffffff;
  background: linear-gradient(180deg, #7fabeb 0%, #477ac8 100%);
  box-shadow:
    0 15px 30px rgba(65, 118, 196, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
  font: inherit;
  font-size: clamp(1rem, 3vw, 1.22rem);
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    opacity 0.25s ease;
}

.wishes-section__submit svg {
  width: 1.35rem;
  height: 1.35rem;
}

.wishes-section__submit:hover {
  transform: translateY(-2px);
  box-shadow:
    0 18px 36px rgba(65, 118, 196, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}

.wishes-section__submit:disabled {
  cursor: wait;
  opacity: 0.72;
  transform: none;
}

.wishes-section__feedback,
.wishes-section__error {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin: 0;
  color: #6b7e94;
  font-size: 0.96rem;
  line-height: 1.45;
  text-align: center;
}

.wishes-section__error {
  color: #a34242;
}

.wishes-section__list-card {
  margin-top: clamp(1.4rem, 4vw, 2rem);
  padding: clamp(1rem, 3vw, 1.55rem);
}

.wishes-section__list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.wishes-section__list-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.wishes-section__list-title span {
  display: grid;
  place-items: center;
  width: 2.7rem;
  aspect-ratio: 1;
  border-radius: 0.65rem;
  color: #4f84cc;
  background: rgba(231, 241, 252, 0.82);
}

.wishes-section__list-title h3 {
  margin: 0;
  color: #103866;
  font-size: clamp(1.05rem, 3vw, 1.32rem);
  font-weight: 800;
}

.wishes-section__filter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(105, 157, 214, 0.3);
  border-radius: 0.55rem;
  padding: 0.65rem 0.9rem;
  color: #295f9f;
  background: rgba(255, 255, 255, 0.62);
  font: inherit;
  font-weight: 700;
}

.wishes-section__filter svg {
  width: 1rem;
  height: 1rem;
}

.wishes-section__list {
  display: grid;
  max-height: 35rem;
  gap: 0.75rem;
  overflow: auto;
  padding-right: 0.15rem;
}

.wishes-section__wish {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(105, 157, 214, 0.22);
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.76);
}

.wishes-section__avatar {
  display: grid;
  place-items: center;
  width: clamp(3.2rem, 7vw, 4rem);
  aspect-ratio: 1;
  border-radius: 999px;
  color: #477bc7;
  background: linear-gradient(180deg, #eef5ff, #e2edf9);
  font-size: 1.45rem;
  font-weight: 700;
}

.wishes-section__wish-body {
  min-width: 0;
}

.wishes-section__wish-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem;
}

.wishes-section__wish h4 {
  margin: 0;
  color: #123866;
  font-size: 1.05rem;
  font-weight: 800;
}

.wishes-section__wish-top p {
  margin: 0.25rem 0 0;
  color: #5d7087;
  font-size: 0.92rem;
}

.wishes-section__wish-badges {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex: 0 0 auto;
}

.wishes-section__status {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.38rem 0.72rem;
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.wishes-section__status--present {
  color: #2d7a2f;
  background: rgba(210, 242, 207, 0.9);
}

.wishes-section__status--absent {
  color: #c24747;
  background: rgba(250, 222, 222, 0.95);
}

.wishes-section__status--maybe {
  color: #9a741b;
  background: rgba(250, 235, 193, 0.95);
}

.wishes-section__guest-count {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #314c72;
  font-weight: 800;
}

.wishes-section__guest-count svg {
  width: 1rem;
  height: 1rem;
}

.wishes-section__message,
.wishes-section__empty {
  margin: 0.8rem 0 0;
  color: #40566f;
  font-size: 0.96rem;
  line-height: 1.55;
}

.wishes-section__empty {
  grid-column: 1 / -1;
  margin: 0;
  text-align: center;
}

.wishes-section__bottom-divider {
  margin-top: clamp(1.8rem, 5vw, 2.6rem);
}

@media (max-width: 700px) {
  .wishes-section::before {
    inset: 0.55rem;
    border-radius: 0 0 3rem 3rem;
  }

  .wishes-section__shell {
    padding-top: 2.8rem;
    padding-inline: 1.05rem;
  }

  .wishes-section__ornament {
    width: clamp(8.5rem, 42vw, 13rem);
  }

  .wishes-section__ornament--left {
    top: -2.5rem;
    left: -4.2rem;
  }

  .wishes-section__ornament--right {
    top: 8rem;
    right: -5rem;
  }

  .wishes-section__form {
    grid-template-columns: 1fr;
  }

  .wishes-section__field {
    grid-template-columns: 3.7rem minmax(0, 1fr);
    gap: 0.75rem;
  }

  .wishes-section__field-icon {
    margin-top: 1.65rem;
  }

  .wishes-section__wish-top {
    flex-direction: column;
  }

  .wishes-section__wish-badges {
    align-self: flex-start;
  }
}

@media (max-width: 430px) {
  .wishes-section__shell {
    padding-top: 2.4rem;
    padding-bottom: 3.2rem;
  }

  .wishes-section__title {
    font-size: clamp(2.25rem, 11.5vw, 3rem);
  }

  .wishes-section__lead {
    font-size: 0.98rem;
    line-height: 1.62;
  }

  .wishes-section__form-card {
    padding: 1.15rem 0.85rem;
    border-radius: 1.5rem;
  }

  .wishes-section__form {
    gap: 1rem;
  }

  .wishes-section__field {
    grid-template-columns: 2.85rem minmax(0, 1fr);
    gap: 0.6rem;
  }

  .wishes-section__field-icon {
    width: 2.65rem;
    margin-top: 1.55rem;
  }

  .wishes-section__input {
    padding: 0.82rem 0.9rem;
    border-radius: 0.58rem;
  }

  .wishes-section__textarea {
    min-height: 8rem;
  }

  .wishes-section__chips button {
    max-width: 12rem;
    min-height: 4rem;
    font-size: 0.84rem;
  }

  .wishes-section__submit {
    padding: 1rem 1.1rem;
  }

  .wishes-section__list-card {
    padding: 0.9rem 0.75rem;
    border-radius: 1.4rem;
  }

  .wishes-section__list-header {
    align-items: flex-start;
  }

  .wishes-section__filter {
    padding: 0.58rem 0.7rem;
  }

  .wishes-section__wish {
    grid-template-columns: 2.8rem minmax(0, 1fr);
    gap: 0.75rem;
    padding: 0.85rem;
  }

  .wishes-section__avatar {
    width: 2.8rem;
    font-size: 1.2rem;
  }

  .wishes-section__wish h4 {
    font-size: 0.98rem;
  }

  .wishes-section__wish-top p,
  .wishes-section__message {
    font-size: 0.86rem;
  }

  .wishes-section__status {
    font-size: 0.76rem;
  }
}
</style>