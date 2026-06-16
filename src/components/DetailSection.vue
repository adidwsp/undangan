<template>
  <section id="detail" class="section detail-section blue-band" aria-labelledby="detail-title">
    <div class="section__inner">
      <SectionHeading eyebrow="Detail Acara" title="Waktu dan Tempat" id="detail-title">
        Dengan memohon rahmat Allah, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan
        mendoakan.
      </SectionHeading>

      <div class="detail-section__grid">
        <GlassCard v-for="event in events" :key="event.title" class="detail-section__card">
          <p>{{ event.label }}</p>
          <h3>{{ event.title }}</h3>
          <dl>
            <div>
              <dt>Tanggal</dt>
              <dd>{{ event.date }}</dd>
            </div>
            <div>
              <dt>Waktu</dt>
              <dd>{{ event.time }}</dd>
            </div>
            <div>
              <dt>Lokasi</dt>
              <dd>{{ event.place }}</dd>
            </div>
          </dl>
          <a class="secondary-button" :href="event.mapsUrl" target="_blank" rel="noreferrer">
            Buka Google Maps
          </a>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'

const events = [
  {
    label: 'Ijab Qabul',
    title: 'Akad Nikah',
    date: 'Sabtu, 5 September 2026',
    time: '10.00 WIB - selesai',
    place: 'Masjid Miftahul Jannah, Cileungsi, Bogor',
    mapsUrl: 'https://maps.app.goo.gl/it56yWVq7sD3X5JL9',
  },
  {
    label: 'Walimatul Ursy',
    title: 'Resepsi',
    date: 'Sabtu, 5 September 2026',
    time: '13.00 - 17.00 WIB',
    place: 'Masjid Miftahul Jannah, Cileungsi, Bogor',
    mapsUrl: 'https://maps.app.goo.gl/it56yWVq7sD3X5JL9',
  },
]

// TODO: tambahkan parallax ringan pada kartu acara saat scroll.
</script>

<style scoped>
.detail-section__grid {
  display: grid;
  gap: 1rem;
}

.detail-section__card {
  display: grid;
  gap: 1rem;
}

.detail-section__card > p {
  margin: 0;
  color: var(--color-secondary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.detail-section__card h3 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 2rem;
  line-height: 1.1;
}

.detail-section__card dl {
  display: grid;
  gap: 0.8rem;
  margin: 0;
}

.detail-section__card dl div {
  border-left: 1px solid rgba(201, 168, 76, 0.58);
  padding-left: 0.8rem;
}

.detail-section__card dt {
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.detail-section__card dd {
  margin: 0.1rem 0 0;
  color: var(--color-text-primary);
}

.detail-section__card a {
  justify-self: start;
}

@media (min-width: 760px) {
  .detail-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
