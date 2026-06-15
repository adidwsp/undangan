<template>
  <header class="section-heading">
    <p v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</p>
    <h2 class="section__title">{{ title }}</h2>
    <p v-if="$slots.default" class="section__lead">
      <slot />
    </p>
    <div class="decorative-line" aria-hidden="true" />
  </header>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
})
</script>
