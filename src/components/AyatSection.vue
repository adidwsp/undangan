<template>
  <section id="ayat" class="section ayat-section blue-band" aria-labelledby="ayat-title">
    <div class="section__inner ayat-section__inner">
      <SectionHeading eyebrow="Ayat Pernikahan" title="Sakinah, Mawaddah, Rahmah" />

      <GlassCard class="ayat-section__card">
        <div class="ayat-section__calligraphy" aria-hidden="true">۞</div>
        <p class="ayat-section__arabic">
          وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً
        </p>
        <p id="ayat-title" class="ayat-section__translation">
          "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan
          untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
          dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <span>QS. Ar-Rum: 21</span>
      </GlassCard>
    </div>
  </section>
</template>

<script setup>
import GlassCard from '@/components/common/GlassCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'

// TODO: gunakan Lottie atau GSAP untuk reveal kaligrafi secara perlahan.
</script>

<style scoped>
.ayat-section__inner {
  max-width: 820px;
}

.ayat-section__card {
  display: grid;
  gap: 1.2rem;
  text-align: center;
}

.ayat-section__calligraphy {
  color: var(--color-secondary);
  font-size: 2.4rem;
  line-height: 1;
}

.ayat-section__arabic {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(1.45rem, 7vw, 2.7rem);
  line-height: 2;
}

.ayat-section__translation {
  margin: 0;
  color: var(--color-text-primary);
}

.ayat-section span {
  color: var(--color-text-secondary);
  font-weight: 700;
}
</style>
