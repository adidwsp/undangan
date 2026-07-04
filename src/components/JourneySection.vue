<template>
  <section
    id="journey"
    ref="journeySection"
    class="section journey-section"
    aria-labelledby="journey-title"
  >
    <img
      :src="floralOrnament"
      class="journey-section__ornament journey-section__ornament--left"
      alt=""
      aria-hidden="true"
    />

    <img
      :src="floralOrnament"
      class="journey-section__ornament journey-section__ornament--right"
      alt=""
      aria-hidden="true"
    />

    <div class="journey-section__shell">
      <header class="journey-section__heading">
        <p class="journey-section__eyebrow">Perjalanan Kami</p>

        <div class="journey-section__mini-divider" aria-hidden="true">
          <span></span>
          <i>♥</i>
          <span></span>
        </div>

        <h2 id="journey-title" class="journey-section__title">
          Melalui Jalan<br />
          yang Baik
        </h2>

        <p class="journey-section__lead">
          Setiap pernikahan memiliki kisahnya masing-masing.
          Perjalanan ini kami lalui selangkah demi selangkah dengan menjaga niat,
          dibersamai keluarga, dan memohon petunjuk Allah di setiap prosesnya.
        </p>

        <p class="journey-section__lead journey-section__lead--closing">
          Semoga setiap langkah yang dimulai dengan kebaikan,
          berakhir dengan keberkahan.
        </p>

        <div class="journey-section__heading-divider" aria-hidden="true">
          <span></span>
          <i>❧</i>
          <span></span>
        </div>
      </header>

      <ol class="journey-section__timeline">
        <li
          v-for="(item, index) in journey"
          :key="item.title"
          class="journey-section__item"
        >
          <div class="journey-section__marker">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </div>

          <article class="journey-section__card">
            <div class="journey-section__icon" aria-hidden="true">
              <svg v-if="item.icon === 'preparation'">
                <image href="/src/assets/images/journey/preparation.png"/>
              </svg>

              <svg v-else-if="item.icon === 'taaruf'">
                <image href="/src/assets/images/journey/taaruf.png"/>
              </svg>

              <svg v-else-if="item.icon === 'nadzhar'">
                <image href="/src/assets/images/journey/nadzhar.png"/>
              </svg>

              <svg v-else-if="item.icon === 'khitbah'">
                <image href="/src/assets/images/journey/khitbah.png"/>
              </svg>

              <svg v-else if="item.icon === 'akad'" width="inherit">
                <image href="/src/assets/images/journey/akad.png"/>
              </svg>
            </div>

            <div class="journey-section__card-content">
              <h3>{{ item.title }}</h3>
              <div class="journey-section__title-line" aria-hidden="true"></div>
              <p>{{ item.description }}</p>
            </div>

            <span class="journey-section__sparkle" aria-hidden="true">✦</span>
            <span class="journey-section__leaf" aria-hidden="true"></span>
          </article>
        </li>
      </ol>

      <div class="journey-section__bottom-divider" aria-hidden="true">
        <span></span>
        <i>♥</i>
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

const journeySection = ref(null)
let animationContext

const journey = [
  {
    title: 'Persiapan Diri',
    icon: 'preparation',
    description:
      'Menata hati, memperbaiki niat, dan mempersiapkan diri untuk memikul amanah dalam membangun sebuah keluarga.',
  },
  {
    title: 'Taaruf',
    icon: 'taaruf',
    description:
      'Saling mengenal dengan tujuan yang jelas, dalam proses yang terjaga dan dengan keluarga yang membersamai.',
  },
  {
    title: 'Nadzhar',
    icon: 'nadzhar',
    description:
      'Pertemuan untuk saling melihat dan mengenal secara langsung sebagai bagian dari ikhtiar menuju pernikahan.',
  },
  {
    title: 'Khitbah',
    icon: 'khitbah',
    description:
      'Pertemuan dua keluarga sebagai tanda keseriusan untuk melangkah menuju akad.',
  },
  {
    title: 'Akad',
    icon: 'akad',
    description:
      'Mengikat janji dalam ridha Allah, disaksikan keluarga dan orang-orang tercinta. Semoga menjadi awal dari keberkahan selamanya.',
  },
]

onMounted(() => {
  animationContext = gsap.context(() => {
    gsap.fromTo(
      '.journey-section__heading',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.journey-section__heading',
          start: 'top 88%',
        },
      },
    )

    gsap.fromTo(
      '.journey-section__item',
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.journey-section__timeline',
          start: 'top 82%',
        },
      },
    )
  }, journeySection)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<style scoped>
.journey-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #173a64;
  background:
    radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.94) 0 8rem, transparent 18rem),
    radial-gradient(circle at 92% 18%, rgba(255, 255, 255, 0.9) 0 8rem, transparent 18rem),
    radial-gradient(circle at 50% 94%, rgba(136, 199, 242, 0.22) 0 10rem, transparent 24rem),
    linear-gradient(180deg, #f8fdff 0%, #eef8ff 48%, #f9fdff 100%);
}

.journey-section::before {
  content: '';
  position: absolute;
  inset: 0.7rem;
  z-index: -1;
  border: 1px solid rgba(123, 174, 222, 0.22);
  border-radius: 0 0 4rem 4rem;
  pointer-events: none;
}

.journey-section__shell {
  position: relative;
  z-index: 2;
  width: min(100%, 58rem);
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2.6rem) clamp(3.2rem, 8vw, 5rem);
}

.journey-section__ornament {
  position: absolute;
  z-index: 1;
  width: clamp(11rem, 31vw, 21rem);
  opacity: 0.7;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 14px 24px rgba(61, 111, 164, 0.1));
}

.journey-section__ornament--left {
  top: 6.8rem;
  left: -5.8rem;
  transform: rotate(-6deg);
}

.journey-section__ornament--right {
  top: 9rem;
  right: -5.8rem;
  transform: rotate(92deg) scaleX(-1);
}

.journey-section__heading {
  position: relative;
  z-index: 3;
  width: min(100%, 46rem);
  margin: 0 auto clamp(2.7rem, 6vw, 4rem);
  text-align: center;
}

.journey-section__eyebrow {
  margin: 0;
  color: #4d84cc;
  font-size: clamp(0.8rem, 2.5vw, 1.05rem);
  font-weight: 800;
  letter-spacing: 0.34em;
  line-height: 1.25;
  text-transform: uppercase;
}

.journey-section__title {
  margin: clamp(0.85rem, 2.8vw, 1.15rem) 0 0;
  color: #123762;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(3rem, 9vw, 5.7rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.05em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.86);
}

.journey-section__lead {
  max-width: 43rem;
  margin: clamp(1.45rem, 4vw, 1.9rem) auto 0;
  color: #596f87;
  font-size: clamp(1rem, 3vw, 1.32rem);
  line-height: 1.72;
}

.journey-section__lead--closing {
  max-width: 38rem;
  margin-top: clamp(1.3rem, 3.4vw, 1.7rem);
}

.journey-section__mini-divider,
.journey-section__heading-divider,
.journey-section__bottom-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-inline: auto;
  color: #caa34a;
}

.journey-section__mini-divider {
  width: min(15rem, 58%);
  margin-top: 0.8rem;
}

.journey-section__heading-divider {
  width: min(16rem, 62%);
  margin-top: clamp(1.4rem, 4vw, 2rem);
}

.journey-section__bottom-divider {
  width: min(15rem, 62%);
  margin-top: clamp(2rem, 5vw, 3rem);
}

.journey-section__mini-divider span,
.journey-section__heading-divider span,
.journey-section__bottom-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(202, 163, 74, 0.82), transparent);
}

.journey-section__mini-divider i,
.journey-section__heading-divider i,
.journey-section__bottom-divider i {
  font-style: normal;
  line-height: 1;
}

.journey-section__mini-divider i,
.journey-section__bottom-divider i {
  color: #4f86cc;
}

.journey-section__timeline {
  position: relative;
  z-index: 3;
  display: grid;
  gap: clamp(1rem, 3vw, 1.5rem);
  width: min(100%, 50rem);
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.journey-section__timeline::before {
  content: '';
  position: absolute;
  top: 2.6rem;
  bottom: 2.6rem;
  left: 2.4rem;
  width: 1px;
  background-image: linear-gradient(
    180deg,
    rgba(202, 163, 74, 0.75) 0 45%,
    transparent 45% 100%
  );
  background-size: 1px 1rem;
}

.journey-section__item {
  position: relative;
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr);
  gap: 1.1rem;
  align-items: center;
}

.journey-section__marker {
  position: relative;
  z-index: 3;
  display: grid;
  place-items: center;
}

.journey-section__marker::after {
  content: '';
  position: absolute;
  right: -0.75rem;
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 999px;
  background: #d1a852;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.75);
}

.journey-section__marker span {
  display: grid;
  place-items: center;
  width: clamp(3.4rem, 8vw, 4.4rem);
  aspect-ratio: 1;
  border: 2px solid rgba(216, 178, 89, 0.92);
  border-radius: 999px;
  color: #ffffff;
  background:
    radial-gradient(circle at 32% 20%, rgba(255, 255, 255, 0.28), transparent 38%),
    linear-gradient(180deg, #7fb0ec, #3f76bd);
  box-shadow:
    0 12px 24px rgba(64, 118, 185, 0.18),
    inset 0 0 0 0.34rem rgba(255, 255, 255, 0.3);
  font-size: clamp(0.9rem, 2.5vw, 1.15rem);
  font-weight: 800;
  letter-spacing: 0.02em;
}

.journey-section__card {
  position: relative;
  display: grid;
  grid-template-columns: clamp(5.2rem, 14vw, 8rem) minmax(0, 1fr);
  gap: clamp(1rem, 3vw, 1.8rem);
  align-items: center;
  overflow: hidden;
  min-height: clamp(10rem, 20vw, 13rem);
  border: 1px solid rgba(123, 174, 222, 0.3);
  border-radius: clamp(1.2rem, 3.6vw, 1.8rem);
  padding: clamp(1.2rem, 3.8vw, 1.8rem);
  background:
    radial-gradient(circle at 12% 12%, rgba(255, 255, 255, 0.98), transparent 42%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(248, 253, 255, 0.78));
  box-shadow:
    0 18px 40px rgba(59, 111, 163, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.94);
}

.journey-section__icon {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: clamp(4.8rem, 13vw, 7rem);
  aspect-ratio: 1;
  border-radius: 999px;
  color: #4f84cc;
  background:
    radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.96), rgba(235, 246, 255, 0.88));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 12px 26px rgba(64, 118, 185, 0.1);
}

.journey-section__icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.85;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.journey-section__card-content {
  position: relative;
  z-index: 2;
  min-width: 0;
}

.journey-section__card h3 {
  margin: 0;
  color: #123762;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(1.85rem, 5vw, 2.55rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.045em;
}

.journey-section__title-line {
  width: 2rem;
  height: 1px;
  margin: 0.55rem 0 0.9rem;
  background: #caa34a;
}

.journey-section__card p {
  margin: 0;
  color: #4f647d;
  font-size: clamp(0.95rem, 2.6vw, 1.08rem);
  line-height: 1.6;
}

.journey-section__sparkle {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  color: rgba(202, 163, 74, 0.85);
  font-size: 1.4rem;
}

.journey-section__leaf {
  position: absolute;
  right: -1.5rem;
  bottom: -1.4rem;
  width: 7rem;
  height: 5.2rem;
  border-left: 1px solid rgba(123, 174, 222, 0.22);
  border-bottom: 1px solid rgba(123, 174, 222, 0.22);
  border-radius: 70% 0 70% 0;
  transform: rotate(-18deg);
  opacity: 0.75;
}

@media (max-width: 700px) {
  .journey-section::before {
    inset: 0.55rem;
    border-radius: 0 0 3rem 3rem;
  }

  .journey-section__shell {
    padding-top: 2.7rem;
    padding-inline: 1.05rem;
  }

  .journey-section__ornament {
    width: clamp(9rem, 44vw, 14rem);
  }

  .journey-section__ornament--left {
    top: 7.5rem;
    left: -5.2rem;
  }

  .journey-section__ornament--right {
    top: 9rem;
    right: -5.3rem;
  }

  .journey-section__timeline::before {
    left: 2rem;
  }

  .journey-section__item {
    grid-template-columns: 4.2rem minmax(0, 1fr);
    gap: 0.8rem;
  }

  .journey-section__marker::after {
    right: -0.55rem;
  }

  .journey-section__card {
    grid-template-columns: 4.8rem minmax(0, 1fr);
    gap: 0.85rem;
    padding: 1.05rem;
  }

  .journey-section__sparkle {
    right: 1rem;
  }
}

@media (max-width: 430px) {
  .journey-section__shell {
    padding-top: 2.35rem;
    padding-bottom: 3.25rem;
  }

  .journey-section__title {
    font-size: clamp(2.45rem, 12.5vw, 3.25rem);
  }

  .journey-section__lead {
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .journey-section__timeline {
    gap: 0.95rem;
  }

  .journey-section__timeline::before {
    left: 1.55rem;
    top: 2.1rem;
    bottom: 2.1rem;
  }

  .journey-section__item {
    grid-template-columns: 3.25rem minmax(0, 1fr);
    gap: 0.65rem;
  }

  .journey-section__marker::after {
    right: -0.45rem;
    width: 0.54rem;
    height: 0.54rem;
  }

  .journey-section__marker span {
    width: 2.8rem;
    font-size: 0.8rem;
    border-width: 1.5px;
    box-shadow:
      0 10px 20px rgba(64, 118, 185, 0.16),
      inset 0 0 0 0.24rem rgba(255, 255, 255, 0.3);
  }

  .journey-section__card {
    grid-template-columns: 1fr;
    min-height: 0;
    padding: 1.05rem;
  }

  .journey-section__icon {
    width: 3.2rem;
  }

  .journey-section__card h3 {
    font-size: 1.65rem;
  }

  .journey-section__card p {
    font-size: 0.9rem;
  }
}
</style>