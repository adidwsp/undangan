  <template>
  <section
    id="gift"
    ref="giftSection"
    class="gift-section"
    aria-labelledby="gift-title"
  >
    <div
      class="gift-section__wash gift-section__wash--left"
      aria-hidden="true"
    ></div>
    <div
      class="gift-section__wash gift-section__wash--right"
      aria-hidden="true"
    ></div>

    <svg
      class="gift-section__floral gift-section__floral--top"
      viewBox="0 0 360 300"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M354 10C270 64 251 135 239 275" />
        <path d="M303 58c-29-11-57-7-77 12 31 8 56 3 77-12Z" />
        <path d="M275 103c-27 2-49 16-61 39 30-2 50-15 61-39Z" />
        <path d="M254 151c-25 9-42 28-48 52 28-9 43-27 48-52Z" />
        <path d="M325 38c-4-26 6-51 28-69 5 30-5 52-28 69Z" />
        <path d="M290 82c7-27 25-45 51-53-8 29-25 46-51 53Z" />
        <path d="M266 127c13-26 33-39 60-40-14 27-34 40-60 40Z" />
        <path d="M246 177c17-20 39-29 64-24-19 22-40 29-64 24Z" />
      </g>
      <g class="gift-section__flower">
        <circle cx="316" cy="25" r="17" />
        <ellipse cx="316" cy="-2" rx="17" ry="32" />
        <ellipse cx="316" cy="52" rx="17" ry="32" />
        <ellipse cx="289" cy="25" rx="32" ry="17" />
        <ellipse cx="343" cy="25" rx="32" ry="17" />
      </g>
    </svg>

    <svg
      class="gift-section__floral gift-section__floral--bottom"
      viewBox="0 0 330 360"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M7 355C84 275 111 185 117 43" />
        <path d="M55 298c29 3 52-7 69-29-31-1-54 9-69 29Z" />
        <path d="M82 247c28-5 49-21 59-47-31 5-50 21-59 47Z" />
        <path d="M100 194c24-12 39-33 42-58-27 12-41 31-42 58Z" />
        <path d="M29 326c2 28-10 51-33 68-2-31 10-54 33-68Z" />
        <path d="M69 280c-9 26-29 43-55 49 11-29 28-44 55-49Z" />
        <path d="M94 229c-15 24-37 35-64 33 16-25 38-36 64-33Z" />
      </g>
      <g class="gift-section__flower">
        <circle cx="39" cy="330" r="16" />
        <ellipse cx="39" cy="304" rx="16" ry="31" />
        <ellipse cx="39" cy="356" rx="16" ry="31" />
        <ellipse cx="13" cy="330" rx="31" ry="16" />
        <ellipse cx="65" cy="330" rx="31" ry="16" />
      </g>
    </svg>

    <div class="gift-section__shell">
      <header class="gift-section__heading">
        <div class="gift-section__top-divider" aria-hidden="true">
          <span></span>
          <i>•</i>
          <svg viewBox="0 0 48 48">
            <path
              d="M8 19h32v24H8zM24 19v24M5 13h38v7H5zM24 13H12c-5 0-7-3-7-6 0-4 4-6 7-4 4 2 8 6 12 10Zm0 0h12c5 0 7-3 7-6 0-4-4-6-7-4-4 2-8 6-12 10Z"
            />
          </svg>
          <i>•</i>
          <span></span>
        </div>

        <p class="gift-section__eyebrow">Wedding Gift</p>
        <h2 id="gift-title" class="gift-section__title">Tanda Kasih</h2>

        <div class="gift-section__divider" aria-hidden="true">
          <span></span><i>♡</i><span></span>
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
          :key="account.id"
          class="gift-section__account-card"
        >
          <div class="gift-section__bank-panel">
            <div class="gift-section__bank-logo">
              <img
                v-if="account.logo"
                :src="account.logo"
                :alt="'Logo ' + account.bank"
                class="gift-section__bank-image"
                loading="lazy"
                decoding="async"
                @error="handleLogoError(account)"
              />
              <span v-else class="gift-section__bank-mark">{{
                account.bank
              }}</span>
            </div>
          </div>

          <div class="gift-section__account-content">
            <p class="gift-section__account-label">Rekening Atas Nama</p>
            <h3 class="gift-section__account-name">{{ account.name }}</h3>
            <div class="gift-section__short-line" aria-hidden="true"></div>

            <p class="gift-section__number-label">No. Rekening</p>
            <strong class="gift-section__account-number">{{
              account.number
            }}</strong>

            <button
              class="gift-section__copy-button"
              :class="{ 'is-copied': copiedAccount === account.rawNumber }"
              type="button"
              :aria-label="'Salin nomor rekening ' + account.bank"
              @click="copyAccount(account)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="8" y="8" width="11" height="11" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
              <span>{{
                copiedAccount === account.rawNumber ? "Tersalin" : "Salin"
              }}</span>
            </button>
          </div>

          <svg
            class="gift-section__card-leaves"
            viewBox="0 0 190 190"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" stroke-linecap="round">
              <path d="M186 188C151 146 142 101 147 31" />
              <path d="M159 148c-21 1-37-7-47-24 23 0 38 8 47 24Z" />
              <path d="M147 111c-19-6-32-20-36-39 21 7 33 20 36 39Z" />
              <path d="M145 74c-17-11-25-26-22-44 19 12 26 26 22 44Z" />
              <path d="M165 161c20-4 34-15 43-32-22 3-36 14-43 32Z" />
              <path d="M151 126c20-9 31-24 32-44-22 10-32 24-32 44Z" />
              <path d="M146 88c18-13 26-30 21-49-19 14-26 30-21 49Z" />
            </g>
          </svg>
        </article>
      </div>

      <div class="gift-section__thanks">
        <div class="gift-section__heart" aria-hidden="true">♥</div>
        <p>
          Terima kasih atas doa dan kebaikannya.<br />
          Semoga Allah membalas dengan keberkahan.
        </p>
        <svg
          class="gift-section__thanks-flower"
          viewBox="0 0 130 130"
          aria-hidden="true"
        >
          <g>
            <circle cx="67" cy="66" r="13" />
            <ellipse cx="67" cy="28" rx="18" ry="33" />
            <ellipse cx="67" cy="104" rx="18" ry="33" />
            <ellipse cx="29" cy="66" rx="33" ry="18" />
            <ellipse cx="105" cy="66" rx="33" ry="18" />
          </g>
        </svg>
      </div>

      <div class="gift-section__bottom-divider" aria-hidden="true">
        <span></span><i>•</i><b>♥</b><i>•</i><span></span>
      </div>

      <p class="gift-section__sr-only" aria-live="polite">
        {{ copiedAccount ? "Nomor rekening berhasil disalin." : "" }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import bca from "../assets/images/account/bca.svg";
import seabank from "../assets/images/account/seabank.svg";

gsap.registerPlugin(ScrollTrigger);

const giftSection = ref(null);
const copiedAccount = ref("");
let animationContext = null;
let copyResetTimer = null;

const accounts = ref([
  {
    id: "bca",
    bank: "BCA",
    name: "Adi Dwi Saputra",
    number: "109 316 7973",
    rawNumber: "1093167973",
    logo: bca,
  },
  {
    id: "seabank",
    bank: "SeaBank",
    name: "Zahro Annisa",
    number: "9010 7624 6367",
    rawNumber: "901076246367",
    logo: seabank,
  },
]);

function handleLogoError(account) {
  account.logo = null;
}

async function writeToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const el = document.createElement("textarea");
  el.value = value;
  el.style.position = "fixed";
  el.style.opacity = "0";
  el.style.pointerEvents = "none";
  document.body.appendChild(el);
  el.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(el);

  if (!ok) throw new Error("Gagal menyalin.");
}

async function copyAccount(account) {
  clearTimeout(copyResetTimer);

  try {
    await writeToClipboard(account.rawNumber);
    copiedAccount.value = account.rawNumber;
    copyResetTimer = setTimeout(() => {
      copiedAccount.value = "";
    }, 1800);
  } catch (error) {
    copiedAccount.value = "";
    console.error(error);
  }
}

function entrance(selector, options = {}) {
    const {
      trigger = selector,
      start = "top 88%",
      y = 28,
      // duration = 1.2,
      duration = 0.3,
      stagger = 0,
    } = options;

  gsap.fromTo(
    selector,
    { y, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration,
      stagger,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger, start, once: true },
    },
  );
}

onMounted(async () => {
  await nextTick();

  animationContext = gsap.context(() => {
    entrance(".gift-section__accounts", {
      trigger: ".gift-section__accounts",
      start: "top 84%",
      y: 34,
      // duration: 1.3,
      duration: 0.2,
      stagger: 0.22,
    });

    entrance(".gift-section__thanks", {
      start: "top 90%",
      y: 24,
      duration: 1.1,
    });
  }, giftSection.value);
});

onBeforeUnmount(() => {
  clearTimeout(copyResetTimer);
  animationContext?.revert();
});
</script>

<style scoped>
.gift-section {
  --gift-navy: #123764;
  --gift-blue: #3f7fc7;
  --gift-blue-soft: #8eb9e4;
  --gift-gold: #d2a642;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: var(--gift-navy);
  background:
    radial-gradient(
      circle at 12% 18%,
      rgba(203, 226, 246, 0.35),
      transparent 23rem
    ),
    radial-gradient(
      circle at 88% 74%,
      rgba(199, 224, 246, 0.38),
      transparent 25rem
    ),
    linear-gradient(180deg, #fbfdff 0%, #ffffff 45%, #f5faff 100%);
}

.gift-section__wash {
  position: absolute;
  z-index: -1;
  width: 32rem;
  height: 42rem;
  border-radius: 50%;
  opacity: 0.46;
  /* reduce blur to lower paint cost */
  filter: blur(14px);
  pointer-events: none;
}

.gift-section__wash--left {
  top: 7%;
  left: -25rem;
  background: #cfe6f8;
}

.gift-section__wash--right {
  right: -25rem;
  bottom: 2%;
  background: #d6eafa;
}

.gift-section__floral {
  position: absolute;
  z-index: 0;
  color: rgba(111, 164, 215, 0.39);
  pointer-events: none;
}

.gift-section__floral--top {
  top: -0.4rem;
  right: -1.4rem;
  width: clamp(13rem, 31vw, 25rem);
  will-change: transform;
  /* GPU-friendly, long-running gentle float */
  animation: floral-top 12s ease-in-out infinite alternate;
}

.gift-section__floral--bottom {
  bottom: -1.3rem;
  left: -1.4rem;
  width: clamp(12rem, 28vw, 23rem);
  will-change: transform;
  animation: floral-bottom 14s ease-in-out infinite alternate;
}

.gift-section__flower {
  fill: rgba(232, 243, 252, 0.58);
  stroke: rgba(126, 173, 217, 0.26);
}

.gift-section__shell {
  position: relative;
  z-index: 2;
  width: min(100%, 64rem);
  margin: 0 auto;
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1rem, 4vw, 2.6rem)
    clamp(3rem, 7vw, 5rem);
}

.gift-section__heading {
  width: min(100%, 48rem);
  margin: 0 auto clamp(2.5rem, 5vw, 4rem);
  text-align: center;
}

.gift-section__top-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: min(23rem, 74%);
  margin: 0 auto clamp(1.6rem, 4vw, 2.5rem);
  color: var(--gift-gold);
}

.gift-section__top-divider span,
.gift-section__bottom-divider span {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(210, 166, 66, 0.9));
}

.gift-section__top-divider span:last-child,
.gift-section__bottom-divider span:last-child {
  background: linear-gradient(90deg, rgba(210, 166, 66, 0.9), transparent);
}

.gift-section__top-divider svg {
  width: clamp(2.4rem, 6vw, 3.4rem);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.gift-section__top-divider i,
.gift-section__bottom-divider i {
  font-style: normal;
  font-size: 0.62rem;
}

.gift-section__eyebrow {
  margin: 0 0 clamp(0.8rem, 2vw, 1.2rem);
  color: var(--gift-blue);
  font-size: clamp(0.76rem, 1.7vw, 1.08rem);
  font-weight: 800;
  letter-spacing: 0.35em;
  line-height: 1.25;
  text-transform: uppercase;
}

.gift-section__title {
  margin: 0;
  color: #0f315b;
  font-family: var(--font-heading, Georgia, "Times New Roman", serif);
  font-size: clamp(3.25rem, 9vw, 6.5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.045em;
}

.gift-section__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  width: min(26rem, 76%);
  margin: clamp(1.35rem, 3vw, 2rem) auto 0;
  color: var(--gift-gold);
}

.gift-section__divider span {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(210, 166, 66, 0.82),
    transparent
  );
}

.gift-section__divider i {
  font-style: normal;
  font-size: 1.8rem;
  line-height: 1;
}

.gift-section__lead {
  margin: clamp(1.25rem, 3vw, 2rem) auto 0;
  color: #445975;
  font-size: clamp(1rem, 2.5vw, 1.55rem);
  line-height: 1.7;
}

.gift-section__accounts {
  display: grid;
  gap: clamp(1.1rem, 2.5vw, 1.7rem);
}

.gift-section__account-card {
  position: relative;
  display: grid;
  grid-template-columns: clamp(9rem, 24vw, 15rem) minmax(0, 1fr);
  align-items: center;
  overflow: hidden;
  min-height: clamp(17rem, 32vw, 22rem);
  padding: clamp(1.4rem, 3vw, 2.4rem);
  border: 1px solid rgba(115, 170, 220, 0.42);
  border-radius: clamp(1.25rem, 3vw, 2rem);
  /* background:
    radial-gradient(
      circle at 45% 0%,
      rgba(255, 255, 255, 0.98),
      aliceblue,
      transparent 48%
    ),
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.97),
      rgba(249, 253, 255, 0.89)
    ); */
  box-shadow:
    0 18px 44px rgba(54, 103, 151, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.96);
}

.gift-section__bank-panel {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: clamp(8rem, 20vw, 13rem);
  aspect-ratio: 1;
  border: 1px solid rgba(114, 169, 218, 0.36);
  border-radius: 50%;
  color: var(--gift-blue);
  background:
    radial-gradient(
      circle at 37% 30%,
      rgba(255, 255, 255, 0.92),
      transparent 44%
    ),
    linear-gradient(
      145deg,
      rgba(237, 247, 255, 0.92),
      rgba(255, 255, 255, 0.72)
    );
}

.gift-section__bank-logo {
  display: grid;
  place-items: center;
  width: 78%;
  min-width: 0;
}

.gift-section__bank-image {
  display: block;
  width: 100%;
  max-height: 4.25rem;
  object-fit: contain;
  object-position: center;
}

.gift-section__bank-mark {
  display: block;
  max-width: 100%;
  overflow: hidden;
  color: #2f73bf;
  font-size: clamp(1.75rem, 5vw, 3.15rem);
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.075em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
}

.gift-section__account-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  padding: clamp(0.5rem, 2vw, 1.5rem) clamp(0.2rem, 2vw, 1.5rem);
}

.gift-section__account-label {
  margin: 0 0 0.65rem;
  color: var(--gift-blue);
  font-size: clamp(0.72rem, 1.7vw, 1.02rem);
  font-weight: 800;
  letter-spacing: 0.28em;
  line-height: 1.25;
  text-transform: uppercase;
}

.gift-section__account-name {
  margin: 0;
  color: var(--gift-navy);
  font-family: var(--font-heading, Georgia, "Times New Roman", serif);
  font-size: clamp(2rem, 5.2vw, 3.6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.045em;
}

.gift-section__short-line {
  width: clamp(5rem, 13vw, 7.5rem);
  height: 1px;
  margin: clamp(0.9rem, 2.2vw, 1.4rem) 0;
  background: linear-gradient(90deg, rgba(210, 166, 66, 0.95), transparent);
}

.gift-section__number-label {
  margin: 0 0 0.35rem;
  color: #4c5f78;
  font-size: clamp(0.85rem, 1.9vw, 1.15rem);
  font-weight: 700;
}

.gift-section__account-number {
  display: block;
  max-width: 100%;
  color: var(--gift-navy);
  font-size: clamp(1rem, 2.8vw, 1.85rem);
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.35;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.gift-section__copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-width: clamp(7.2rem, 18vw, 9rem);
  margin-top: clamp(1rem, 2.5vw, 1.45rem);
  padding: 0.72rem 1.15rem;
  border: 1px solid rgba(55, 122, 204, 0.88);
  border-radius: 999px;
  color: #3579c5;
  background: rgba(255, 255, 255, 0.68);
  font: inherit;
  font-size: clamp(0.84rem, 1.8vw, 1rem);
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
  width: 1.2rem;
  height: 1.2rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.gift-section__copy-button:hover {
  transform: translateY(-2px);
  color: #fff;
  border-color: #3d7fc8;
  background: #3d7fc8;
}

.gift-section__copy-button:focus-visible {
  outline: 3px solid rgba(63, 127, 199, 0.28);
  outline-offset: 3px;
}

.gift-section__copy-button.is-copied {
  color: #fff;
  border-color: #3d7fc8;
  background: #3d7fc8;
}

.gift-section__card-leaves {
  position: absolute;
  right: -0.35rem;
  bottom: -0.35rem;
  z-index: 1;
  width: clamp(8rem, 23vw, 13rem);
  color: rgba(116, 171, 220, 0.31);
  pointer-events: none;
}

.gift-section__thanks {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(1rem, 3vw, 1.8rem);
  overflow: hidden;
  margin: clamp(1.8rem, 4vw, 2.7rem) auto 0;
  padding: clamp(1.2rem, 3vw, 2rem);
  border: 1px solid rgba(115, 170, 220, 0.35);
  border-radius: clamp(1.1rem, 3vw, 1.7rem);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.gift-section__heart {
  display: grid;
  place-items: center;
  width: clamp(3.7rem, 9vw, 5.3rem);
  aspect-ratio: 1;
  border: 1px solid rgba(115, 170, 220, 0.3);
  border-radius: 50%;
  color: #4f8bd0;
  background: rgba(235, 247, 255, 0.72);
  font-size: clamp(1.45rem, 4vw, 2.1rem);
}

.gift-section__thanks p {
  position: relative;
  z-index: 2;
  margin: 0;
  color: #4d6078;
  font-size: clamp(0.95rem, 2.5vw, 1.25rem);
  line-height: 1.55;
}

.gift-section__thanks-flower {
  position: absolute;
  right: -0.25rem;
  bottom: -0.65rem;
  width: clamp(6rem, 18vw, 10rem);
  fill: rgba(205, 227, 245, 0.38);
  stroke: rgba(126, 173, 217, 0.19);
  pointer-events: none;
}

.gift-section__bottom-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: min(21rem, 68%);
  margin: clamp(2.2rem, 5vw, 3.2rem) auto 0;
  color: var(--gift-gold);
}

.gift-section__bottom-divider b {
  font-size: 1.5rem;
  line-height: 1;
}

.gift-section__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 700px) {
  .gift-section__shell {
    padding-top: 3.2rem;
  }

  .gift-section__floral--top {
    right: -5rem;
    opacity: 0.75;
  }

  .gift-section__floral--bottom {
    left: -4.5rem;
    opacity: 0.72;
  }

  .gift-section__heading {
    margin-bottom: 2.4rem;
  }

  .gift-section__account-card {
    grid-template-columns: clamp(6.2rem, 24vw, 8.5rem) minmax(0, 1fr);
    min-height: 14.5rem;
    padding: 1.15rem;
  }

  .gift-section__bank-panel {
    width: clamp(5.6rem, 21vw, 7.4rem);
  }

  .gift-section__bank-mark {
    font-size: clamp(1.45rem, 6vw, 2.1rem);
  }

  .gift-section__account-content {
    padding: 0.45rem 0.25rem;
  }

  .gift-section__account-label {
    font-size: clamp(0.62rem, 2.25vw, 0.78rem);
    letter-spacing: 0.2em;
  }

  .gift-section__account-name {
    font-size: clamp(1.55rem, 6.3vw, 2.3rem);
  }

  .gift-section__account-number {
    font-size: clamp(0.95rem, 4vw, 1.25rem);
    letter-spacing: 0.02em;
  }

  .gift-section__copy-button {
    min-width: 7rem;
    padding: 0.66rem 0.95rem;
  }
}

/* gentle, GPU-accelerated float animations to replace JS loops */
@keyframes floral-top {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-6px, 10px, 0);
  }
}

@keyframes floral-bottom {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(6px, -12px, 0);
  }
}

@media (max-width: 430px) {
  .gift-section__shell {
    padding-inline: 0.85rem;
  }

  .gift-section__title {
    font-size: clamp(2.8rem, 14vw, 3.7rem);
  }

  .gift-section__lead {
    font-size: 0.94rem;
    line-height: 1.62;
  }

  .gift-section__account-card {
    grid-template-columns: 5.6rem minmax(0, 1fr);
    column-gap: 0.65rem;
    min-height: 13rem;
    padding: 1rem 0.8rem;
    border-radius: 1.15rem;
  }

  .gift-section__bank-panel {
    width: 5.3rem;
  }

  .gift-section__bank-image {
    max-height: 2.5rem;
  }

  .gift-section__bank-mark {
    font-size: 1.42rem;
  }

  .gift-section__account-label {
    margin-bottom: 0.4rem;
    font-size: 0.58rem;
    letter-spacing: 0.16em;
  }

  .gift-section__account-name {
    font-size: clamp(1.4rem, 6.7vw, 1.75rem);
  }

  .gift-section__short-line {
    width: 4rem;
    margin: 0.68rem 0;
  }

  .gift-section__number-label {
    margin-bottom: 0.25rem;
    font-size: 0.76rem;
  }

  .gift-section__account-number {
    font-size: clamp(0.9rem, 4.2vw, 1rem);
    letter-spacing: 0.01em;
  }

  .gift-section__copy-button {
    min-width: 6.4rem;
    margin-top: 0.8rem;
    padding: 0.6rem 0.82rem;
    font-size: 0.8rem;
  }

  .gift-section__copy-button svg {
    width: 1rem;
    height: 1rem;
  }

  .gift-section__card-leaves {
    width: 7rem;
    opacity: 0.86;
  }

  .gift-section__thanks {
    grid-template-columns: auto minmax(0, 1fr);
    padding: 1rem;
  }

  .gift-section__heart {
    width: 3.2rem;
  }

  .gift-section__thanks p {
    padding-right: 0.25rem;
    font-size: 0.82rem;
  }
}

@media (max-width: 360px) {
  .gift-section__account-card {
    grid-template-columns: 4.8rem minmax(0, 1fr);
    column-gap: 0.55rem;
    padding-inline: 0.65rem;
  }

  .gift-section__bank-panel {
    width: 4.6rem;
  }

  .gift-section__bank-mark {
    font-size: 1.2rem;
  }

  .gift-section__account-label {
    font-size: 0.53rem;
  }

  .gift-section__account-name {
    font-size: 1.25rem;
  }

  .gift-section__account-number {
    font-size: 0.72rem;
  }

  .gift-section__copy-button {
    min-width: 5.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gift-section__copy-button {
    transition: none;
  }

  .gift-section__copy-button:hover {
    transform: none;
  }
  /* disable decorative motion for reduced-motion users */
  .gift-section__floral--top,
  .gift-section__floral--bottom {
    animation: none !important;
    transform: none !important;
  }
}
</style>
