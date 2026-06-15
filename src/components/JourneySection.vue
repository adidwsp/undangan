<template>
  <section id="journey" class="section journey-section soft-band" aria-labelledby="journey-title">
    <div class="section__inner">
      <SectionHeading eyebrow="Perjalanan Kami" title="Melalui Jalan yang Baik" id="journey-title">
        Tahapan ini ditampilkan sebagai pengingat bahwa pernikahan dapat dimulai dengan cara yang
        terjaga, jelas, dan melibatkan keluarga.
      </SectionHeading>

      <ol class="journey-section__timeline">
        <li v-for="(item, index) in journey" :key="item.title" class="journey-section__item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import SectionHeading from '@/components/common/SectionHeading.vue'

const journey = [
  {
    title: 'Persiapan Diri',
    description: 'Memperbaiki niat, menata kesiapan, dan meminta nasihat dari keluarga serta guru.',
  },
  {
    title: 'Tukar CV',
    description: 'Saling mengenal informasi utama secara tertulis dengan batasan yang terjaga.',
  },
  {
    title: 'Taaruf',
    description: 'Proses mengenal yang diarahkan pada tujuan pernikahan, bukan sekadar kedekatan.',
  },
  {
    title: 'Nadzhar',
    description: 'Pertemuan terarah dengan pendamping untuk memantapkan ikhtiar dan keputusan.',
  },
  {
    title: 'Khitbah',
    description: 'Keluarga bertemu untuk menyampaikan keseriusan dan menyepakati langkah berikutnya.',
  },
  {
    title: 'Akad',
    description: 'Mengikat janji dalam ridha Allah, disaksikan keluarga dan orang-orang tercinta.',
  },
]

// TODO: aktifkan slide-in timeline bertahap dengan ScrollTrigger.
</script>

<style scoped>
.journey-section__timeline {
  position: relative;
  display: grid;
  gap: 1rem;
  max-width: 760px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.journey-section__timeline::before {
  position: absolute;
  top: 0.6rem;
  bottom: 0.6rem;
  left: 1.15rem;
  width: 1px;
  background: rgba(201, 168, 76, 0.58);
  content: '';
}

.journey-section__item {
  position: relative;
  display: grid;
  grid-template-columns: 2.4rem 1fr;
  gap: 0.85rem;
}

.journey-section__item span {
  z-index: 1;
  display: grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border: 1px solid rgba(201, 168, 76, 0.68);
  border-radius: 999px;
  color: var(--color-primary);
  background: var(--color-surface);
  font-size: 0.72rem;
  font-weight: 800;
}

.journey-section__item div {
  border: 1px solid rgba(64, 157, 221, 0.14);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: var(--shadow-card);
}

.journey-section__item h3 {
  margin: 0 0 0.35rem;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.35rem;
}

.journey-section__item p {
  margin: 0;
  color: var(--color-text-secondary);
}
</style>
