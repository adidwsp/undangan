<template>
  <section
    id="gift"
    ref="giftSection"
    class="section gift-section"
    aria-labelledby="gift-title"
  >
    <div class="gift-section__shell">
      <header class="gift-section__heading">
        <p class="gift-section__eyebrow">Wedding Gift</p>

        <h2 id="gift-title" class="gift-section__title">
          Tanda Kasih
        </h2>

        <div class="gift-section__divider" aria-hidden="true">
          <span></span>
          <i>♡</i>
          <span></span>
        </div>

        <p class="gift-section__lead">
          Kehadiran dan doa adalah hadiah terbaik.<br />
          Bila ingin menitipkan tanda kasih,<br />
          berikut informasi yang dapat digunakan.
        </p>
      </header>

      <div class="gift-section__accounts">
        <article
          v-for="account in accounts"
          :key="account.number"
          class="gift-section__account-card"
        >
          <div class="gift-section__bank-panel">
            <div class="gift-section__bank-logo">
              <span class="gift-section__bank-mark">BCA</span>
            </div>
            <div class="gift-section__bank-leaf" aria-hidden="true"></div>
          </div>

          <div class="gift-section__account-content">
            <p class="gift-section__account-label">Rekening Atas Nama</p>
            <h3 class="gift-section__account-name">{{ account.name }}</h3>

            <div class="gift-section__dash-line" aria-hidden="true"></div>

            <p class="gift-section__number-label">No. Rekening</p>

            <div class="gift-section__number-row">
              <strong>{{ account.number }}</strong>

              <button
                class="gift-section__copy-button"
                type="button"
                @click="copyAccount(account)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="8" y="8" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                <span>{{ copiedAccount === account.rawNumber ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <div class="gift-section__thanks">
        <div class="gift-section__heart" aria-hidden="true">♥</div>
        <p>
          Terima kasih atas doa dan kebaikannya.<br />
          Semoga Allah membalas dengan keberkahan.
        </p>
      </div>

      <div class="gift-section__bottom-divider" aria-hidden="true">
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

gsap.registerPlugin(ScrollTrigger)

const giftSection = ref(null)
const copiedAccount = ref('')
let animationContext

const accounts = [
  {
    bank: 'BCA',
    name: 'Adi Dwi Saputra',
    number: '109 316 7973',
    rawNumber: '1093167973',
  },
  {
    bank: 'BCA',
    name: 'Zahro Annisa',
    number: '2345 6789 0123',
    rawNumber: '234567890123',
  },
]

async function copyAccount(account) {
  try {
    await navigator.clipboard?.writeText(account.rawNumber)
    copiedAccount.value = account.rawNumber

    window.setTimeout(() => {
      copiedAccount.value = ''
    }, 1800)
  } catch {
    copiedAccount.value = ''
  }
}

onMounted(() => {
  animationContext = gsap.context(() => {
    gsap.fromTo(
      '.gift-section__heading',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gift-section__heading',
          start: 'top 88%',
        },
      },
    )

    gsap.fromTo(
      '.gift-section__account-card',
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gift-section__accounts',
          start: 'top 84%',
        },
      },
    )

    gsap.fromTo(
      '.gift-section__thanks',
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gift-section__thanks',
          start: 'top 90%',
        },
      },
    )
  }, giftSection)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<style scoped>
.gift-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #1c416c;
  background:
    radial-gradient(circle at 10% 18%, rgba(255, 255, 255, 0.92) 0 8rem, transparent 19rem),
    radial-gradient(circle at 88% 24%, rgba(255, 255, 255, 0.88) 0 7rem, transparent 17rem),
    linear-gradient(180deg, #eef8ff 0%, #f9fdff 48%, #edf8ff 100%);
}

.gift-section::before {
  content: '';
  position: absolute;
  inset: 0.85rem;
  z-index: 0;
  border: 2px solid rgba(151, 192, 232, 0.28);
  border-top: 0;
  border-radius: 0 0 3.8rem 3.8rem;
  pointer-events: none;
}

.gift-section::after {
  content: '';
  position: absolute;
  top: 0.85rem;
  left: 50%;
  z-index: 0;
  width: min(78%, 44rem);
  height: 7.8rem;
  border-top: 2px solid rgba(151, 192, 232, 0.28);
  border-left: 2px solid rgba(151, 192, 232, 0.28);
  border-right: 2px solid rgba(151, 192, 232, 0.28);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  transform: translateX(-50%);
  pointer-events: none;
}

.gift-section__shell {
  position: relative;
  z-index: 2;
  width: min(100%, 58rem);
  margin: 0 auto;
  padding: clamp(4.8rem, 11vw, 7.2rem) clamp(1.1rem, 4vw, 3rem) clamp(3.3rem, 8vw, 5rem);
}

.gift-section__heading {
  position: relative;
  width: min(100%, 43rem);
  margin: 0 auto clamp(2.6rem, 6vw, 4rem);
  text-align: center;
}

.gift-section__eyebrow {
  margin: 0 0 1.1rem;
  color: #5a8fd1;
  font-size: clamp(0.78rem, 2.5vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.36em;
  line-height: 1.25;
  text-transform: uppercase;
}

.gift-section__title {
  margin: 0;
  color: #173a64;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(3rem, 9vw, 5.8rem);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: -0.045em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.85);
}

.gift-section__divider,
.gift-section__bottom-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: min(18rem, 66%);
  margin: clamp(1.2rem, 3.4vw, 1.6rem) auto 0;
  color: #caa34a;
}

.gift-section__divider span,
.gift-section__bottom-divider span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(202, 163, 74, 0.85), transparent);
}

.gift-section__divider i,
.gift-section__bottom-divider i {
  font-style: normal;
  line-height: 1;
}

.gift-section__lead {
  margin: clamp(1.25rem, 3.8vw, 1.9rem) auto 0;
  color: #65778b;
  font-size: clamp(1.05rem, 3.1vw, 1.45rem);
  line-height: 1.68;
}

.gift-section__accounts {
  display: grid;
  gap: clamp(1.1rem, 3vw, 1.6rem);
}

.gift-section__account-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(8rem, 15rem) minmax(0, 1fr);
  align-items: stretch;
  overflow: hidden;
  min-height: clamp(12rem, 25vw, 16.5rem);
  border: 1px solid rgba(134, 184, 226, 0.34);
  border-radius: 1.35rem;
  background:
    radial-gradient(circle at 48% 0%, rgba(255, 255, 255, 0.98), transparent 45%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(250, 254, 255, 0.85));
  box-shadow:
    0 20px 46px rgba(61, 112, 163, 0.13),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.gift-section__bank-panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 100%;
  padding: 1.4rem;
  color: #ffffff;
  background:
    radial-gradient(circle at 16% 22%, rgba(255, 255, 255, 0.18), transparent 28%),
    linear-gradient(145deg, #5c91d5 0%, #153e70 100%);
}

.gift-section__bank-panel::before,
.gift-section__bank-panel::after,
.gift-section__bank-leaf {
  content: '';
  position: absolute;
  pointer-events: none;
  opacity: 0.22;
}

.gift-section__bank-panel::before {
  width: 8rem;
  height: 8rem;
  left: -3rem;
  bottom: -2.4rem;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 999px;
}

.gift-section__bank-panel::after {
  width: 11rem;
  height: 11rem;
  right: -5rem;
  top: -5rem;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 999px;
}

.gift-section__bank-leaf {
  right: 0.9rem;
  bottom: 0.8rem;
  width: 5.8rem;
  height: 3.8rem;
  border-left: 1px solid rgba(255, 255, 255, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 70% 0 70% 0;
  transform: rotate(-18deg);
}

.gift-section__bank-logo {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gift-section__bank-mark {
  color: #ffffff;
  font-size: clamp(2.4rem, 7vw, 4.2rem);
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.08em;
  line-height: 1;
}

.gift-section__account-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: clamp(1.35rem, 4vw, 3.1rem);
}

.gift-section__account-label {
  margin: 0 0 0.75rem;
  color: #5b8fd0;
  font-size: clamp(0.75rem, 2.2vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.28em;
  line-height: 1.25;
  text-transform: uppercase;
}

.gift-section__account-name {
  margin: 0;
  color: #173a64;
  font-family: var(--font-heading, Georgia, 'Times New Roman', serif);
  font-size: clamp(1.85rem, 5.4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.045em;
}

.gift-section__dash-line {
  width: 100%;
  height: 1px;
  margin: clamp(1rem, 2.8vw, 1.45rem) 0;
  background-image: linear-gradient(
    90deg,
    rgba(129, 162, 199, 0.35) 0 45%,
    transparent 45% 100%
  );
  background-size: 0.65rem 1px;
}

.gift-section__number-label {
  margin: 0 0 0.3rem;
  color: #697a8d;
  font-size: clamp(0.9rem, 2.4vw, 1.12rem);
  font-weight: 700;
}

.gift-section__number-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.gift-section__number-row strong {
  color: #5386c9;
  font-size: clamp(1.45rem, 4.5vw, 2.35rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.1;
  white-space: nowrap;
}

.gift-section__copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 0 0 auto;
  min-width: 8.1rem;
  padding: 0.78rem 1.1rem;
  border: 1px solid rgba(82, 134, 205, 0.68);
  border-radius: 999px;
  color: #4f82c6;
  background: rgba(255, 255, 255, 0.64);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);
  font: inherit;
  font-size: clamp(0.85rem, 2.4vw, 1rem);
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

.gift-section__copy-button svg {
  width: 1.15rem;
  height: 1.15rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.gift-section__copy-button:hover {
  transform: translateY(-2px);
  color: #c59a37;
  border-color: rgba(197, 154, 55, 0.75);
  background: rgba(255, 255, 255, 0.9);
}

.gift-section__thanks {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(1rem, 3vw, 1.45rem);
  margin: clamp(2.6rem, 6vw, 4rem) auto 0;
  padding: clamp(1.15rem, 3.4vw, 1.8rem);
  border: 1px solid rgba(137, 185, 226, 0.3);
  border-radius: 1.1rem;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.62), rgba(247, 253, 255, 0.38));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.gift-section__heart {
  display: grid;
  place-items: center;
  width: clamp(3.9rem, 9vw, 5.8rem);
  aspect-ratio: 1;
  border: 1px solid rgba(137, 185, 226, 0.26);
  border-radius: 999px;
  color: #92bee9;
  background: rgba(255, 255, 255, 0.44);
  font-size: clamp(1.7rem, 4vw, 2.4rem);
}

.gift-section__thanks p {
  margin: 0;
  color: #65778b;
  font-size: clamp(1rem, 3vw, 1.35rem);
  line-height: 1.58;
}

.gift-section__bottom-divider {
  margin-top: clamp(2rem, 5vw, 2.8rem);
}

@media (max-width: 700px) {
  .gift-section::before {
    inset: 0.55rem;
    border-radius: 0 0 3rem 3rem;
  }

  .gift-section::after {
    top: 0.55rem;
    width: 78%;
    height: 5.8rem;
  }

  .gift-section__shell {
    padding-top: 4.1rem;
    padding-inline: 1.05rem;
  }

  .gift-section__account-card {
    grid-template-columns: minmax(6.2rem, 8.7rem) minmax(0, 1fr);
    min-height: 10.5rem;
    border-radius: 1.15rem;
  }

  .gift-section__bank-panel {
    padding: 0.9rem;
  }

  .gift-section__bank-mark {
    font-size: clamp(2rem, 8.5vw, 2.8rem);
  }

  .gift-section__account-content {
    padding: 1.15rem;
  }

  .gift-section__number-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.8rem;
  }

  .gift-section__copy-button {
    min-width: 7.4rem;
    padding: 0.7rem 1rem;
  }
}

@media (max-width: 430px) {
  .gift-section__shell {
    padding-top: 3.7rem;
    padding-bottom: 3.2rem;
  }

  .gift-section__title {
    font-size: clamp(2.5rem, 13vw, 3.25rem);
  }

  .gift-section__lead {
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .gift-section__account-card {
    grid-template-columns: 6.5rem minmax(0, 1fr);
    min-height: 9.5rem;
  }

  .gift-section__bank-mark {
    font-size: 2rem;
  }

  .gift-section__account-label {
    margin-bottom: 0.45rem;
    font-size: 0.67rem;
    letter-spacing: 0.18em;
  }

  .gift-section__account-name {
    font-size: 1.45rem;
  }

  .gift-section__dash-line {
    margin: 0.8rem 0;
  }

  .gift-section__number-label {
    font-size: 0.82rem;
  }

  .gift-section__number-row strong {
    font-size: 1.15rem;
    letter-spacing: 0.05em;
  }

  .gift-section__copy-button {
    min-width: 6.7rem;
    padding: 0.65rem 0.85rem;
    font-size: 0.84rem;
  }

  .gift-section__thanks {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .gift-section__heart {
    margin-inline: auto;
  }

  .gift-section__thanks p {
    font-size: 0.95rem;
  }
}

@media (max-width: 360px) {
  .gift-section__account-card {
    grid-template-columns: 5.7rem minmax(0, 1fr);
  }

  .gift-section__account-content {
    padding: 1rem 0.85rem;
  }

  .gift-section__account-name {
    font-size: 1.28rem;
  }

  .gift-section__number-row strong {
    font-size: 1rem;
  }
}
</style>