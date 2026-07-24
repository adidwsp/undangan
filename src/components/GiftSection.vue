<template>
  <section id="gift" ref="giftSection" class="section gift-section" aria-labelledby="gift-title">
    <div class="gift-section__shell">
      <header class="gift-section__heading">
        <p class="gift-section__eyebrow">Wedding Gift</p>
        <h2 id="gift-title" class="gift-section__title">Tanda Kasih</h2>
        <div class="gift-section__divider" aria-hidden="true"><span></span><i>♡</i><span></span></div>
        <p class="gift-section__lead">Kehadiran dan doa adalah hadiah terbaik.<br />Bila ingin menitipkan tanda kasih,<br />berikut informasi yang dapat digunakan.</p>
      </header>

      <div class="gift-section__accounts">
        <article v-for="account in accounts" :key="account.id" class="gift-section__account-card">
          <div class="gift-section__bank-panel">
            <div class="gift-section__bank-logo">
              <img v-if="account.logo" :src="account.logo" :alt="'Logo ' + account.bank" class="gift-section__bank-image" @error="handleLogoError(account)" />
              <span v-else class="gift-section__bank-mark">{{ account.bank }}</span>
            </div>
          </div>
<div class="gift-section__bank-leaf" aria-hidden="true"></div>
          <div class="gift-section__account-content">
            <p class="gift-section__account-label">Rekening Atas Nama</p>
            <h3 class="gift-section__account-name">{{ account.name }}</h3>
            <div class="gift-section__dash-line" aria-hidden="true"></div>
            <p class="gift-section__number-label">No. Rekening</p>
            <div class="gift-section__number-row">
              <strong>{{ account.number }}</strong>
              <button class="gift-section__copy-button" :class="{ 'is-copied': copiedAccount === account.rawNumber }" type="button" :aria-label="'Salin nomor rekening ' + account.bank" @click="copyAccount(account)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
                <span>{{ copiedAccount === account.rawNumber ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <div class="gift-section__thanks">
        <div class="gift-section__heart" aria-hidden="true">♥</div>
        <p>Terima kasih atas doa dan kebaikannya.<br />Semoga Allah membalas dengan keberkahan.</p>
      </div>

      <div class="gift-section__bottom-divider" aria-hidden="true"><span></span><i>💙</i><span></span></div>
      <p class="gift-section__sr-only" aria-live="polite">{{ copiedAccount ? 'Nomor rekening berhasil disalin.' : '' }}</p>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const giftSection = ref(null)
const copiedAccount = ref('')
let animationContext = null
let copyResetTimer = null

const accounts = ref([
  { id: 'bca', bank: 'BCA', name: 'Adi Dwi Saputra', number: '109 316 7973', rawNumber: '1093167973', logo: null },
  { id: 'seabank', bank: 'SeaBank', name: 'Zahro Annisa', number: '9010 7624 6789 6367', rawNumber: '9010762467896367', logo: '/images/seabank-logo.png' },
])

function handleLogoError(account) { account.logo = null }

async function writeToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value)
    return
  }
  const el = document.createElement('textarea')
  el.value = value
  el.style.position = 'fixed'
  el.style.opacity = '0'
  el.style.pointerEvents = 'none'
  document.body.appendChild(el)
  el.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(el)
  if (!ok) throw new Error('Gagal menyalin.')
}

async function copyAccount(account) {
  clearTimeout(copyResetTimer)
  try {
    await writeToClipboard(account.rawNumber)
    copiedAccount.value = account.rawNumber
    copyResetTimer = setTimeout(() => { copiedAccount.value = '' }, 18000)
  } catch (e) {
    copiedAccount.value = ''
    console.error(e)
  }
}

function entrance(sel, opts) {
  const { trigger = sel, start = 'top 88%', y = 28, duration = 0.75, stagger = 0 } = opts || {}
  gsap.fromTo(sel, { y, autoAlpha: 0 }, {
    y: 0, autoAlpha: 1, duration, stagger, ease: 'power3.out',
    clearProps: 'transform,opacity,visibility',
    scrollTrigger: { trigger, start, once: true },
  })
}

onMounted(async () => {
  await nextTick()
  animationContext = gsap.context(() => {
    entrance('.gift-section__heading')
    entrance('.gift-section__account-card', { trigger: '.gift-section__accounts', start: 'top 84%', y: 34, duration: 0.8, stagger: 0.16 })
    entrance('.gift-section__thanks', { start: 'top 90%', y: 24, duration: 0.7 })

    gsap.to('.gift-section__bank-panel', { backgroundPosition: '200% 50%', duration: 6, repeat: -1, ease: 'none' })
    gsap.to('.gift-section__copy-button:not(.is-copied)', { boxShadow: '0 0 12px rgba(82, 134, 205, 0.15)', duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    document.querySelectorAll('.gift-section__account-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        gsap.to(card.querySelector('.gift-section__bank-panel'), { x: x * 8, y: y * 4, duration: 0.4, ease: 'power2.out' })
        gsap.to(card.querySelector('.gift-section__bank-leaf'), { x: x * -6, y: y * -3, duration: 0.4, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.gift-section__bank-panel'), { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
        gsap.to(card.querySelector('.gift-section__bank-leaf'), { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
      })
    })
  }, giftSection.value)
})

onBeforeUnmount(() => {
  clearTimeout(copyResetTimer)
  animationContext?.revert()
})
</script>

<style scoped>
.gift-section{position:relative;isolation:isolate;overflow:hidden;color:#1c416c;background:radial-gradient(circle at 10% 18%,rgba(255,255,255,0.92) 0 8rem,transparent 19rem),radial-gradient(circle at 88% 24%,rgba(255,255,255,0.88) 0 7rem,transparent 17rem),linear-gradient(180deg,#eef8ff 0%,#f9fdff 48%,#edf8ff 100%)}
.gift-section::before{content:'';position:absolute;inset:.85rem;z-index:0;border:2px solid rgba(151,192,232,0.28);border-top:0;border-radius:0 0 3.8rem 3.8rem;pointer-events:none}
.gift-section::after{content:'';position:absolute;top:.85rem;left:50%;z-index:0;width:min(78%,44rem);height:7.8rem;border-top:2px solid rgba(151,192,232,0.28);border-right:2px solid rgba(151,192,232,0.28);border-left:2px solid rgba(151,192,232,0.28);border-radius:50% 50% 0 0 / 100% 100% 0 0;transform:translateX(-50%);pointer-events:none}
.gift-section__shell{position:relative;z-index:2;width:min(100%,58rem);margin:0 auto;padding:clamp(4.8rem,11vw,7.2rem) clamp(1.1rem,4vw,3rem) clamp(3.3rem,8vw,5rem)}
.gift-section__heading{position:relative;width:min(100%,43rem);margin:0 auto clamp(2.6rem,6vw,4rem);text-align:center}
.gift-section__eyebrow{margin:0 0 1.1rem;color:#5a8fd1;font-size:clamp(.78rem,2.5vw,1rem);font-weight:800;letter-spacing:.36em;line-height:1.25;text-transform:uppercase}
.gift-section__title{margin:0;color:#173a64;font-family:var(--font-heading,Georgia,'Times New Roman',serif);font-size:clamp(3rem,9vw,5.8rem);font-weight:700;line-height:.96;letter-spacing:-.045em;text-shadow:0 2px 0 rgba(255,255,255,.85)}
.gift-section__divider,.gift-section__bottom-divider{display:flex;align-items:center;justify-content:center;gap:.75rem;width:min(18rem,66%);margin:clamp(1.2rem,3.4vw,1.6rem) auto 0;color:#caa34a}
.gift-section__divider span,.gift-section__bottom-divider span{display:block;flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(202,163,74,.85),transparent)}
.gift-section__divider i,.gift-section__bottom-divider i{font-style:normal;line-height:1}
.gift-section__lead{margin:clamp(1.25rem,3.8vw,1.9rem) auto 0;color:#65778b;font-size:clamp(1.05rem,3.1vw,1.45rem);line-height:1.68}
.gift-section__accounts{display:grid;gap:clamp(1.1rem,3vw,1.6rem)}
.gift-section__account-card{position:relative;display:grid;grid-template-columns:minmax(8rem,15rem) minmax(0,1fr);align-items:stretch;overflow:hidden;min-height:clamp(12rem,25vw,16.5rem);border:1px solid rgba(134,184,226,.34);border-radius:1.35rem;background:radial-gradient(circle at 48% 0%,rgba(255,255,255,.98),transparent 45%),linear-gradient(145deg,rgba(255,255,255,.94),rgba(250,254,255,.85));box-shadow:0 20px 46px rgba(61,112,163,.13),inset 0 1px 0 rgba(255,255,255,.92)}
.gift-section__bank-panel{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;min-width:0;min-height:100%;padding:1.4rem;color:#fff;background:radial-gradient(circle at 16% 22%,rgba(255,255,255,.18),transparent 28%),linear-gradient(145deg,#5c91d5 0%,#153e70 100%);background-size:200% 200%}
.gift-section__bank-panel::before,.gift-section__bank-panel::after,.gift-section__bank-leaf{content:'';position:absolute;pointer-events:none;opacity:.22}
.gift-section__bank-panel::before{bottom:-2.4rem;left:-3rem;width:8rem;height:8rem;border:1px solid rgba(255,255,255,.65);border-radius:999px}
.gift-section__bank-panel::after{top:-5rem;right:-5rem;width:11rem;height:11rem;border:1px solid rgba(255,255,255,.42);border-radius:999px}
.gift-section__bank-leaf{right:.9rem;bottom:.8rem;width:5.8rem;height:3.8rem;border-bottom:1px solid rgba(255,255,255,.55);border-left:1px solid rgba(255,255,255,.55);border-radius:70% 0 70% 0;transform:rotate(-18deg)}
.gift-section__bank-logo{position:relative;z-index:2;display:grid;place-items:center;width:100%;min-width:0}
.gift-section__bank-image{display:block;width:min(100%,10rem);max-height:4.5rem;object-fit:contain;object-position:center;filter:brightness(0) invert(1)}
.gift-section__bank-mark{display:block;max-width:100%;overflow:hidden;color:#fff;font-size:clamp(2rem,6vw,4.2rem);font-weight:900;font-style:italic;letter-spacing:-.06em;line-height:1;text-align:center;white-space:nowrap}
.gift-section__account-content{display:flex;flex-direction:column;justify-content:center;min-width:0;padding:clamp(1.35rem,4vw,3.1rem)}
.gift-section__account-label{margin:0 0 .75rem;color:#5b8fd0;font-size:clamp(.75rem,2.2vw,1rem);font-weight:800;letter-spacing:.28em;line-height:1.25;text-transform:uppercase}
.gift-section__account-name{margin:0;color:#173a64;font-family:var(--font-heading,Georgia,'Times New Roman',serif);font-size:clamp(1.85rem,5.4vw,3.2rem);font-weight:700;line-height:1.05;letter-spacing:-.045em}
.gift-section__dash-line{width:100%;height:1px;margin:clamp(1rem,2.8vw,1.45rem) 0;background-image:linear-gradient(90deg,rgba(129,162,199,.35) 0 45%,transparent 45% 100%);background-size:.65rem 1px}
.gift-section__number-label{margin:0 0 .3rem;color:#697a8d;font-size:clamp(.9rem,2.4vw,1.12rem);font-weight:700}
.gift-section__number-row{display:flex;align-items:center;justify-content:space-between;gap:1rem}
.gift-section__number-row strong{min-width:0;color:#5386c9;font-size:clamp(1.45rem,4.5vw,2.35rem);font-weight:800;letter-spacing:.08em;line-height:1.1;overflow-wrap:anywhere}
.gift-section__copy-button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;flex:0 0 auto;min-width:8.1rem;padding:.78rem 1.1rem;border:1px solid rgba(82,134,205,.68);border-radius:999px;color:#4f82c6;background:rgba(255,255,255,.64);box-shadow:inset 0 1px 0 rgba(255,255,255,.86);font:inherit;font-size:clamp(.85rem,2.4vw,1rem);font-weight:800;line-height:1;cursor:pointer;transition:transform .25s ease,color .25s ease,border-color .25s ease,background .25s ease}
.gift-section__copy-button svg{width:1.15rem;height:1.15rem;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.gift-section__copy-button:hover{transform:translateY(-2px);color:#c59a37;border-color:rgba(197,154,55,.75);background:rgba(255,255,255,.9)}
.gift-section__copy-button:focus-visible{outline:3px solid rgba(82,134,205,.3);outline-offset:3px}
.gift-section__copy-button.is-copied{color:#fff;border-color:#5a8fd1;background:#5a8fd1}
.gift-section__thanks{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:clamp(1rem,3vw,1.45rem);margin:clamp(2.6rem,6vw,4rem) auto 0;padding:clamp(1.15rem,3.4vw,1.8rem);border:1px solid rgba(137,185,226,.3);border-radius:1.1rem;background:linear-gradient(145deg,rgba(255,255,255,.62),rgba(247,253,255,.38));box-shadow:inset 0 1px 0 rgba(255,255,255,.75)}
.gift-section__heart{display:grid;place-items:center;width:clamp(3.9rem,9vw,5.8rem);aspect-ratio:1;border:1px solid rgba(137,185,226,.26);border-radius:999px;color:#92bee9;background:rgba(255,255,255,.44);font-size:clamp(1.7rem,4vw,2.4rem)}
.gift-section__thanks p{margin:0;color:#65778b;font-size:clamp(1rem,3vw,1.35rem);line-height:1.58}
.gift-section__bottom-divider{margin-top:clamp(2rem,5vw,2.8rem)}
.gift-section__sr-only{position:absolute;width:1px;height:1px;overflow:hidden;margin:-1px;padding:0;border:0;clip:rect(0,0,0,0);white-space:nowrap}
@media(max-width:700px){.gift-section::before{inset:.55rem;border-radius:0 0 3rem 3rem}.gift-section::after{top:.55rem;width:78%;height:5.8rem}.gift-section__shell{padding-top:4.1rem;padding-inline:1.05rem}.gift-section__account-card{grid-template-columns:minmax(6.2rem,8.7rem) minmax(0,1fr);min-height:10.5rem;border-radius:1.15rem}.gift-section__bank-panel{padding:.9rem}.gift-section__bank-image{width:min(100%,7rem);max-height:3rem}.gift-section__bank-mark{font-size:clamp(2rem,8.5vw,2.8rem)}.gift-section__account-content{padding:1.15rem}.gift-section__number-row{flex-direction:column;align-items:flex-start;gap:.8rem}.gift-section__copy-button{min-width:7.4rem;padding:.7rem 1rem}}
@media(max-width:430px){.gift-section__shell{padding-top:3.7rem;padding-bottom:3.2rem}.gift-section__title{font-size:clamp(2.5rem,13vw,3.25rem)}.gift-section__lead{font-size:.98rem;line-height:1.65}.gift-section__account-card{grid-template-columns:6.5rem minmax(0,1fr);min-height:9.5rem}.gift-section__bank-image{width:min(100%,5.4rem);max-height:2.5rem}.gift-section__bank-mark{font-size:2rem}.gift-section__account-label{margin-bottom:.45rem;font-size:.67rem;letter-spacing:.18em}.gift-section__account-name{font-size:1.45rem}.gift-section__dash-line{margin:.8rem 0}.gift-section__number-label{font-size:.82rem}.gift-section__number-row strong{font-size:1.15rem;letter-spacing:.05em}.gift-section__copy-button{min-width:6.7rem;padding:.65rem .85rem;font-size:.84rem}.gift-section__thanks{grid-template-columns:1fr;text-align:center}.gift-section__heart{margin-inline:auto}.gift-section__thanks p{font-size:.95rem}}
@media(max-width:360px){.gift-section__account-card{grid-template-columns:5.7rem minmax(0,1fr)}.gift-section__account-content{padding:1rem .85rem}.gift-section__account-name{font-size:1.28rem}.gift-section__number-row strong{font-size:1rem}.gift-section__bank-image{width:4.6rem}}
@media(prefers-reduced-motion:reduce){.gift-section__copy-button{transition:none}.gift-section__copy-button:hover{transform:none}}
</style>
