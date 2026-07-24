# GSAP Animation Enhancement Plan

## 1. FooterSection.vue — Full GSAP Scroll-Triggered Animations
- **Parallax ornaments**: float they drift slowly as user scrolls (different speeds)
- **Staggered reveal**: eyebrow → title → lead → prayer → names → credit → closing note
- **Divider scale-in**: horizontal dividers expand from center
- **Names glow pulse**: subtle opacity pulse on the names
- **Arabic closing**: fade-in with upward float
- **Background ambient particles**: subtle floating dots via GSAP

## 2. FloatingAudioButton.vue — Entrance Animation
- **Slide-in entrance**: button slides in from bottom-right with bounce easing on mount
- **Hover magnetic effect**: subtle GSAP-powered hover pull
- **State transition smooth**: between playing/muted with GSAP morph

## 3. NavigationDots.vue — Entrance & Active State
- **Slide-in from right**: nav dots slide in on mount with stagger
- **Active dot highlight**: GSAP-powered active dot indicator that follows scroll
- **Hover expand**: on hover, the dot label expands smoothly

## 4. App.vue — Section Transition Manager
- **Section fade-in**: each section fades in with a slight parallax as it enters viewport
- **Smooth scroll-to-section**: enhance lenis scroll with GSAP easing

## 5. Enhance Existing Animations (make them more elaborate)
- **AyatSection**: Add floating effect on the Arabic text (gentle float), shimmer on divider
- **CountdownSection**: Number flip animation on countdown values, pulse on active card
- **GiftSection**: Card hover parallax effect, copy button success celebration

