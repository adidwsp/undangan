import { gsap } from 'gsap'

const DURATION_MULTIPLIER = 3.2

function scaleDuration(value) {
  return typeof value === 'number' && value > 0 ? value * DURATION_MULTIPLIER : value
}

function wrapVars(vars) {
  if (!vars || typeof vars !== 'object') return vars

  const normalized = { ...vars }

  if (Object.prototype.hasOwnProperty.call(normalized, 'duration')) {
    normalized.duration = scaleDuration(normalized.duration)
  }

  if (normalized.defaults && typeof normalized.defaults === 'object') {
    normalized.defaults = { ...normalized.defaults }
    if (Object.prototype.hasOwnProperty.call(normalized.defaults, 'duration')) {
      normalized.defaults.duration = scaleDuration(normalized.defaults.duration)
    }
  }

  return normalized
}

function patchGsapMethod(methodName) {
  const original = gsap[methodName]

  gsap[methodName] = function (...args) {
    if (methodName === 'fromTo') {
      if (args[1] && typeof args[1] === 'object') args[1] = wrapVars(args[1])
      if (args[2] && typeof args[2] === 'object') args[2] = wrapVars(args[2])
    } else if (args[1] && typeof args[1] === 'object') {
      args[1] = wrapVars(args[1])
    }

    return original.apply(this, args)
  }
}

function patchTimelinePrototype() {
  const timelinePrototype = gsap.core?.Timeline?.prototype

  if (!timelinePrototype) return

  for (const methodName of ['from', 'fromTo', 'to', 'set']) {
    const original = timelinePrototype[methodName]

    timelinePrototype[methodName] = function (...args) {
      if (methodName === 'fromTo') {
        if (args[1] && typeof args[1] === 'object') args[1] = wrapVars(args[1])
        if (args[2] && typeof args[2] === 'object') args[2] = wrapVars(args[2])
      } else if (args[1] && typeof args[1] === 'object') {
        args[1] = wrapVars(args[1])
      }

      return original.apply(this, args)
    }
  }
}

patchGsapMethod('from')
patchGsapMethod('fromTo')
patchGsapMethod('to')
patchGsapMethod('set')

const originalTimeline = gsap.timeline

gsap.timeline = function (...args) {
  if (args[0] && typeof args[0] === 'object') {
    args[0] = wrapVars(args[0])
  }

  return originalTimeline.apply(this, args)
}

patchTimelinePrototype()

export const SLOW_GSAP_DURATION_MULTIPLIER = DURATION_MULTIPLIER
