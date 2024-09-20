<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>

<template>
  <div class="header">
    <div class="logo-title">
      <img src="@/assets/magic-wand.png" alt="Logo" />
      <span class="title">Frame Magic</span>
    </div>
    <ThemeSwitch class="theme-switch" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: var(--primary-color);
  height: 40px;
  padding: 5px;
  margin-bottom: 20px;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.theme-switch {
  position: absolute;
  right: 0;
  scale: 70%;
}

.title {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

img {
  height: 1.5rem;
}
</style>
