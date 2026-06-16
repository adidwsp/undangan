<template>
  <div class="flower-decoration" aria-hidden="true">
    <span class="flower-decoration__bloom" />
    <span class="flower-decoration__petal" />
    <span class="flower-decoration__petal flower-decoration__petal--alt" />
  </div>
</template>

<style scoped>
.flower-decoration {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.flower-decoration__bloom,
.flower-decoration__petal {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: rgba(255, 229, 207, 0.92);
}
.flower-decoration__bloom {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.65;
}
.flower-decoration__petal {
  width: 50%;
  height: 50%;
  top: 10%;
  left: 25%;
  transform: rotate(25deg);
  opacity: 0.8;
}
.flower-decoration__petal--alt {
  top: 30%;
  left: 5%;
  transform: rotate(-25deg);
  background: rgba(255, 183, 172, 0.9);
}
</style>
