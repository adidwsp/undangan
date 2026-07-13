<template>
  <section
    id="detail"
    ref="detailSection"
    class="section detail-section"
    aria-labelledby="detail-title"
  >
    <img
      :src="floralOrnament"
      class="detail-section__ornament detail-section__ornament--top-left"
      alt=""
      aria-hidden="true"
    />

    <img
      :src="floralOrnament"
      class="detail-section__ornament detail-section__ornament--top-right"
      alt=""
      aria-hidden="true"
    />

    <div class="detail-section__shell">
      <header class="detail-section__heading">
        <p class="detail-section__eyebrow">Detail Acara</p>

        <div class="detail-section__heading-divider" aria-hidden="true">
          <span></span>
          <i>✦</i>
          <span></span>
        </div>

        <h2 id="detail-title" class="detail-section__title">
          Waktu &amp; Tempat
        </h2>

        <p class="detail-section__lead">
          Dengan memohon rahmat Allah, kami mengundang Bapak/Ibu/Saudara/i
          untuk hadir dan mendoakan.
        </p>
      </header>

      <div class="detail-section__cards">
        <article
          v-for="event in events"
          :key="event.title"
          class="detail-section__card"
        >
          <img
            :src="floralOrnament"
            class="detail-section__card-flower"
            alt=""
            aria-hidden="true"
          />

          <div class="detail-section__badge" aria-hidden="true">
            <svg
              v-if="event.icon === 'calendar'"
              viewBox="0 0 24 24"
              class="detail-section__badge-icon"
            >
              <path d="M7 2v3M17 2v3M4 9h16" />
              <rect x="4" y="5" width="16" height="17" rx="2.5" />
              <path d="M8 13h2M12 13h2M16 13h2M8 17h2M12 17h2M16 17h2" />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              class="detail-section__badge-icon"
            >
              <path d="M12 13c-2.8-1.5-5.5-3.8-5.5-6.4A3.1 3.1 0 0 1 12 4.5a3.1 3.1 0 0 1 5.5 2.1c0 2.6-2.7 4.9-5.5 6.4Z" />
              <path d="M12 13v8M8 18l4 3 4-3" />
              <path d="M7 12c-1.7.3-3 1.4-4 3M17 12c1.7.3 3 1.4 4 3" />
            </svg>
          </div>

          <div class="detail-section__line" aria-hidden="true"></div>

          <div class="detail-section__content">
            <p class="detail-section__label">{{ event.label }}</p>
            <h3 class="detail-section__event-title">{{ event.title }}</h3>

            <dl class="detail-section__list">
              <div
                v-for="item in event.items"
                :key="item.label"
                class="detail-section__item"
              >
                <dt>
                  <span class="detail-section__item-icon" aria-hidden="true">
                    <svg
                      v-if="item.icon === 'date'"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 2v3M17 2v3M4 9h16" />
                      <rect x="4" y="5" width="16" height="17" rx="2.5" />
                      <path d="M8 13h2M12 13h2M16 13h2M8 17h2M12 17h2" />
                    </svg>

                    <svg
                      v-else-if="item.icon === 'time'"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>

                    <svg
                      v-else
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>

                  <span>{{ item.label }}</span>
                </dt>

                <dd>{{ item.value }}</dd>
              </div>
            </dl>

            <a
              class="detail-section__maps-button"
              :href="event.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>Buka Google Maps</span>
            </a>
          </div>
        </article>
      </div>

      <div class="detail-section__bottom-divider" aria-hidden="true">
        <span></span>
        <i>💙</i>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import floralOrnament from '@/assets/images/topleft-blossom-gold.png'

gsap.registerPlugin(ScrollTrigger)

const detailSection = ref(null)
let animationContext

const events = [
  {
    label: 'Ijab Qabul',
    title: 'Akad Nikah',
    icon: 'calendar',
    mapsUrl: 'https://maps.app.goo.gl/CJ5EE6jL6GBaQCFh9',
    items: [
      {
        icon: 'date',
        label: 'Tanggal',
        value: 'Ahad, 6 September 2026',
      },
      {
        icon: 'time',
        label: 'Waktu',
        value: '09.00 WIB - 11.00 WIB',
      },
      {
        icon: 'location',
        label: 'Lokasi',
        value: 'Masjid Darussalam Kota Wisata, Gn. Putri, Bogor',
      },
    ],
  },
  {
    label: 'Walimatul Ursy',
    title: 'Resepsi',
    icon: 'bouquet',
    mapsUrl: 'https://maps.app.goo.gl/CJ5EE6jL6GBaQCFh9',
    items: [
      {
        icon: 'date',
        label: 'Tanggal',
        value: 'Ahad, 6 September 2026',
      },
      {
        icon: 'time',
        label: 'Waktu',
        value: '13.00 WIB - 16.00 WIB',
      },
      {
        icon: 'location',
        label: 'Lokasi',
        value: 'Gedung Firdaus Masjid Darussalam Kota Wisata, Gn. Putri, Bogor',
      },
    ],
  },
]

onMounted(() => {
  animationContext = gsap.context(() => {
    gsap.fromTo(
      '.detail-section__heading',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-section__heading',
          start: 'top 88%',
        },
      },
    )

    gsap.fromTo(
      '.detail-section__card',
      { y: 38, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-section__cards',
          start: 'top 82%',
        },
      },
    )
  }, detailSection)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<style scoped>
.detail-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #1e426d;
  background:
    radial-gradient(circle at 8% 12%, rgba(255, 255, 255, 0.96) 0 8rem, transparent 18rem),
    radial-gradient(circle at 88% 8%, rgba(255, 255, 255, 0.9) 0 7rem, transparent 17rem),
    radial-gradient(circle at 50% 92%, rgba(137, 199, 240, 0.22) 0 10rem, transparent 22rem),
    linear-gradient(180deg, #eef9ff 0%, #f9fdff 46%, #e9f6ff 100%);
}

.detail-section::before {
  content: '';
  position: absolute;
  inset: 0.75rem;
  z-index: -1;
  border: 1px solid rgba(106, 158, 209, 0.23);
  border-radius: 0 0 5rem 5rem;
  pointer-events: none;
}

.detail-section__shell {
  position: relative;
  z-index: 2;
  width: min(100%, 64rem);
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 5.4rem) clamp(1.05rem, 4vw, 2.5rem) clamp(3.4rem, 8vw, 5.2rem);
}

.detail-section__ornament {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  width: clamp(11rem, 30vw, 20rem);
  opacity: 0.72;
  filter: drop-shadow(0 14px 26px rgba(50, 94, 145, 0.1));
}

.detail-section__ornament--top-left {
  top: -3.4rem;
  left: -4.1rem;
  transform: rotate(-8deg);
}

.detail-section__ornament--top-right {
  top: 6rem;
  right: -5rem;
  transform: rotate(90deg) scaleX(-1);
}

.detail-section__heading {
  position: relative;
  z-index: 3;
  width: min(100%, 44rem);
  margin: 0 auto clamp(2.5rem, 6vw, 4rem);
  text-align: center;
}

.detail-section__eyebrow {
  margin: 0;
  color: #4d86cf;
  font-size: clamp(0.78rem, 2.6vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.32em;
  line-height: 1.25;
  text-transform: uppercase;
}

.detail-section__heading-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: min(15rem, 62%);
  margin: 1rem auto 1.1rem;
  color: #c9a24a;
}

.detail-section__heading-divider span,
.detail-section__bottom-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(201, 162, 74, 0.8), transparent);
}

.detail-section__heading-divider i,
.detail-section__bottom-divider i {
  font-style: normal;
  line-height: 1;
}

.detail-section__title {
  margin: 0;
  color: #173a64;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(2.7rem, 8.4vw, 5.6rem);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: -0.045em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.85);
}

.detail-section__lead {
  max-width: 38rem;
  margin: clamp(1.2rem, 3.5vw, 1.65rem) auto 0;
  color: #627589;
  font-size: clamp(1rem, 3vw, 1.35rem);
  line-height: 1.75;
}

.detail-section__cards {
  position: relative;
  z-index: 3;
  display: grid;
  gap: clamp(1.1rem, 3vw, 1.6rem);
}

.detail-section__card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(5rem, 8.2rem) 1px minmax(0, 1fr);
  gap: clamp(1.2rem, 3.8vw, 2.2rem);
  align-items: start;
  min-height: clamp(18rem, 32vw, 23rem);
  padding: clamp(1.8rem, 5vw, 3.3rem) clamp(1.2rem, 5vw, 3.6rem);
  overflow: hidden;
  border: 1px solid rgba(133, 185, 226, 0.28);
  border-radius: clamp(1.8rem, 5vw, 3.5rem);
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.95), transparent 42%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.93), rgba(249, 253, 255, 0.82));
  box-shadow:
    0 24px 50px rgba(59, 114, 166, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.detail-section__card-flower {
  position: absolute;
  z-index: 1;
  right: -4.2rem;
  bottom: -3.2rem;
  width: clamp(13rem, 31vw, 21rem);
  opacity: 0.5;
  transform: rotate(92deg) scaleX(-1);
  pointer-events: none;
  user-select: none;
}

.detail-section__badge {
  position: relative;
  z-index: 3;
  display: grid;
  place-items: center;
  width: clamp(4.6rem, 10vw, 7.6rem);
  aspect-ratio: 1;
  margin-inline: auto;
  border: 1px solid rgba(202, 160, 62, 0.48);
  border-radius: 999px;
  background:
    radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.96), rgba(246, 251, 255, 0.88));
  box-shadow:
    0 16px 30px rgba(70, 121, 181, 0.14),
    inset 0 0 0 0.45rem rgba(255, 255, 255, 0.72);
}

.detail-section__badge-icon {
  width: 44%;
  height: 44%;
  fill: none;
  stroke: #4e83c7;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.detail-section__line {
  position: relative;
  z-index: 3;
  align-self: stretch;
  min-height: 14rem;
  background: linear-gradient(180deg, transparent, rgba(206, 171, 91, 0.58), transparent);
}

.detail-section__line::before,
.detail-section__line::after {
  content: '';
  position: absolute;
  left: 50%;
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 999px;
  background: rgba(224, 202, 151, 0.9);
  transform: translateX(-50%);
}

.detail-section__line::before {
  top: 0.2rem;
}

.detail-section__line::after {
  bottom: 0.2rem;
}

.detail-section__content {
  position: relative;
  z-index: 3;
  min-width: 0;
}

.detail-section__label {
  margin: 0 0 0.6rem;
  color: #c69a36;
  font-size: clamp(0.76rem, 2.2vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.28em;
  line-height: 1.25;
  text-transform: uppercase;
}

.detail-section__event-title {
  margin: 0;
  color: #173a64;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(2rem, 6.4vw, 3.9rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.045em;
}

.detail-section__list {
  display: grid;
  gap: clamp(0.95rem, 2.8vw, 1.25rem);
  margin: clamp(1.45rem, 4vw, 1.9rem) 0 0;
}

.detail-section__item {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr);
  column-gap: 0.8rem;
  align-items: start;
}

.detail-section__item dt {
  display: contents;
}

.detail-section__item-icon {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  margin-top: 0.05rem;
}

.detail-section__item-icon svg,
.detail-section__maps-button svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.85;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.detail-section__item dt span:last-child {
  color: #4f82c5;
  font-size: clamp(0.75rem, 2.2vw, 0.95rem);
  font-weight: 800;
  letter-spacing: 0.24em;
  line-height: 1.2;
  text-transform: uppercase;
}

.detail-section__item-icon {
  color: #4f82c5;
}

.detail-section__item dd {
  grid-column: 2;
  margin: 0.22rem 0 0;
  color: #40566f;
  font-size: clamp(0.96rem, 2.8vw, 1.28rem);
  line-height: 1.42;
}

.detail-section__maps-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.62rem;
  min-width: min(100%, 15.4rem);
  margin-top: clamp(1.6rem, 4vw, 2.15rem);
  padding: 0.95rem 1.35rem;
  border: 1px solid rgba(64, 118, 196, 0.45);
  border-radius: 999px;
  color: #ffffff;
  background: linear-gradient(180deg, #7fabeb 0%, #477ac8 100%);
  box-shadow:
    0 12px 24px rgba(65, 118, 196, 0.23),
    inset 0 1px 0 rgba(255, 255, 255, 0.36);
  font-size: clamp(0.88rem, 2.5vw, 1rem);
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease;
}

.detail-section__maps-button svg {
  width: 1.1rem;
  height: 1.1rem;
}

.detail-section__maps-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.03);
  box-shadow:
    0 16px 30px rgba(65, 118, 196, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.36);
}

.detail-section__bottom-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: min(17rem, 64%);
  margin: clamp(1.7rem, 5vw, 2.3rem) auto 0;
  color: #c9a24a;
}

@media (max-width: 700px) {
  .detail-section::before {
    inset: 0.55rem;
    border-radius: 0 0 3.8rem 3.8rem;
  }

  .detail-section__shell {
    padding-top: 2.5rem;
    padding-inline: 1.05rem;
  }

  .detail-section__ornament {
    width: clamp(9rem, 42vw, 13rem);
  }

  .detail-section__ornament--top-left {
    top: -2.5rem;
    left: -3.2rem;
  }

  .detail-section__ornament--top-right {
    top: 6.2rem;
    right: -4.4rem;
  }

  .detail-section__heading {
    margin-bottom: 2.15rem;
  }

  .detail-section__card {
    grid-template-columns: 4.35rem 1px minmax(0, 1fr);
    gap: 0.9rem;
    min-height: 0;
    padding: 1.45rem 1.05rem 1.55rem;
    border-radius: 1.65rem;
  }

  .detail-section__badge {
    width: 4rem;
  }

  .detail-section__line {
    min-height: 12.5rem;
  }

  .detail-section__event-title {
    font-size: clamp(1.85rem, 9vw, 2.35rem);
  }

  .detail-section__list {
    gap: 0.9rem;
    margin-top: 1.25rem;
  }

  .detail-section__item {
    grid-template-columns: 1.85rem minmax(0, 1fr);
    column-gap: 0.65rem;
  }

  .detail-section__item-icon {
    width: 1.55rem;
    height: 1.55rem;
  }

  .detail-section__maps-button {
    width: 100%;
    min-width: 0;
    margin-top: 1.35rem;
    padding: 0.85rem 1rem;
  }

  .detail-section__card-flower {
    right: -4.8rem;
    bottom: -2.4rem;
    width: 13rem;
    opacity: 0.32;
  }
}

@media (max-width: 430px) {
  .detail-section__shell {
    padding-top: 2.15rem;
    padding-bottom: 3.2rem;
  }

  .detail-section__title {
    font-size: clamp(2.45rem, 13vw, 3.25rem);
  }

  .detail-section__lead {
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .detail-section__card {
    grid-template-columns: 3.75rem 1px minmax(0, 1fr);
    gap: 0.7rem;
    padding: 1.25rem 0.85rem 1.35rem;
  }

  .detail-section__badge {
    width: 3.45rem;
    box-shadow:
      0 10px 22px rgba(70, 121, 181, 0.13),
      inset 0 0 0 0.3rem rgba(255, 255, 255, 0.72);
  }

  .detail-section__label {
    margin-bottom: 0.45rem;
    letter-spacing: 0.2em;
  }

  .detail-section__event-title {
    font-size: clamp(1.65rem, 8.7vw, 2rem);
  }

  .detail-section__item dt span:last-child {
    letter-spacing: 0.18em;
  }

  .detail-section__item dd {
    font-size: 0.9rem;
  }
}
</style>