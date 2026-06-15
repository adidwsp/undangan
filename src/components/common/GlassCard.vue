<template>
  <article class="glass-card common-glass-card">
    <slot />
  </article>
</template>

<style scoped>
.common-glass-card {
  padding: clamp(1.25rem, 4vw, 2rem);
}
</style>
