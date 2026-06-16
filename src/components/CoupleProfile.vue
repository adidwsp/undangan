<template>
  <section id="profil" class="section profil-section" aria-labelledby="profil-title">
    <div class="section__inner">
      <SectionHeading eyebrow="Profil Mempelai" title="Dua Pribadi, Satu Tujuan" id="profil-title">
        Mengenal secara cukup, menjaga adab, dan menempatkan keluarga serta visi hidup sebagai
        bagian utama perjalanan ini.
      </SectionHeading>

      <div class="profil-section__grid">
        <GlassCard v-for="person in people" :key="person.name" class="profil-section__card">
          <figure :class="['profil-section__photo', person.modifier]">
            <div class="profil-section__media">
              <!-- <img :src="person.image" :alt="person.alt" loading="lazy" width="420" height="520" /> -->
              <img :src="frameBlossom" class="profil-section__frame" alt="" aria-hidden="true" />
            </div>
          </figure>
          <div class="profil-section__content">
            <p>{{ person.role }}</p>
            <h3>{{ person.name }}</h3>
            <ul>
              <li v-for="item in person.details" :key="item">{{ item }}</li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import groomImage from '@/assets/images/groom-placeholder.webp'
import brideImage from '@/assets/images/bride-placeholder.webp'
import frameBlossom from '@/assets/images/frame-blossom.png'
import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'

gsap.registerPlugin(ScrollTrigger)

const people = [
  {
    role: 'Mempelai Pria',
    name: 'Adi Dwi Saputra',
    image: groomImage,
    alt: 'Placeholder foto formal mempelai pria dengan jas putih',
    modifier: 'profil-section__photo--groom',
    details: ['Putra dari Bapak Jupri dan Ibu Wasriyah'],
  },
  {
    role: 'Mempelai Wanita',
    name: 'Zahro Annisa',
    image: brideImage,
    alt: 'Placeholder foto formal mempelai wanita dengan gamis putih dan hijab syari',
    modifier: 'profil-section__photo--bride',
    details: ['Putri dari Bapak Ghor Wignesworo dan Ibu Yusnani'],
  },
]

onMounted(() => {
  gsap.fromTo(
    '.profil-section__card',
    { y: 36, opacity: 0, scale: 0.97 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.85,
      stagger: 0.16,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.profil-section__grid',
        start: 'top 80%',
      },
    },
  )
})
</script>

<style scoped>
.profil-section__grid {
  display: grid;
  gap: 1rem;
}

.profil-section__card {
  overflow: hidden;
  padding: 0;
}

.profil-section__photo {
  position: relative;
  min-height: 19rem;
  margin: 0;
  overflow: hidden;
  padding: 0.95rem;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.62), transparent 44%),
    linear-gradient(180deg, rgba(114, 199, 247, 0.62), rgba(245, 230, 204, 0.46));
}

.profil-section__photo::before {
  position: absolute;
  inset: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 1.2rem;
  content: '';
  pointer-events: none;
}

.profil-section__photo::after {
  position: absolute;
  inset: auto 1.2rem 1.2rem auto;
  color: rgba(31, 95, 150, 0.26);
  font-family: var(--font-heading);
  font-size: 4rem;
  line-height: 1;
  content: 'AI';
}

.profil-section__media {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 19rem;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
}

.profil-section__media::before,
.profil-section__media::after {
  position: absolute;
  z-index: 2;
  border-radius: 999px;
  content: '';
  pointer-events: none;
}

.profil-section__media::before {
  top: -0.9rem;
  right: -0.8rem;
  width: 5.2rem;
  height: 5.2rem;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.72), transparent 70%);
}

.profil-section__media::after {
  bottom: -0.95rem;
  left: -0.9rem;
  width: 6rem;
  height: 6rem;
  background: radial-gradient(circle, rgba(201, 168, 76, 0.24), transparent 72%);
}

.profil-section__photo img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 19rem;
  border-radius: 1rem;
  object-fit: cover;
  opacity: 0.95;
}

.profil-section__frame {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  pointer-events: none;
  opacity: 0.95;
}

.profil-section__photo--bride {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.7), transparent 48%),
    linear-gradient(180deg, rgba(245, 230, 204, 0.66), rgba(114, 199, 247, 0.48));
}

.profil-section__content {
  padding: 1.3rem;
}

.profil-section__content p {
  margin: 0 0 0.2rem;
  color: var(--color-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.profil-section__content h3 {
  margin: 0 0 0.85rem;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.85rem;
  line-height: 1.12;
}

.profil-section__content ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1.05rem;
  color: var(--color-text-secondary);
}

@media (min-width: 760px) {
  .profil-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
