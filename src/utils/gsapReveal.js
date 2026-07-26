import { gsap } from 'gsap'

export function revealOnScroll(targets, options = {}) {
  const {
    from = {},
    to = {},
    y = 24,
    duration = 0.7,
    ease = 'power3.out',
    start = 'top 88%',
    trigger = null,
    once = true,
    stagger = 0,
    clearProps = 'transform,opacity,visibility',
    scrollTrigger: extraScrollTrigger = {},
  } = options

  return gsap.fromTo(
    targets,
    {
      y,
      autoAlpha: 0,
      ...from,
    },
    {
      y: 0,
      autoAlpha: 1,
      duration,
      ease,
      stagger,
      clearProps,
      ...to,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        once,
        ...extraScrollTrigger,
      },
    },
  )
}
