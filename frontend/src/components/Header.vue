<script setup lang="ts">
import router from '@/router'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>

<template>
  <div class="header">
    <i class="pi pi-home home-button" @click="router.go(0)"></i>
    <div class="flex align-items-center gap-2 mr-5">
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
  color: white;
  background-color: var(--primary-color);
  height: 40px;
  align-content: center;
  padding: 10px;
  margin-bottom: 20px;
}

.home-button {
  font-size: 20px;

  &:hover {
    color: black;
    cursor: pointer;
  }
}

.theme-switch {
  scale: 70%;
  margin-left: -70px;
  margin-right: -30px;
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
