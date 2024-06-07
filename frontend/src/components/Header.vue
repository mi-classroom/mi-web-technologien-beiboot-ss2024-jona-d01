<script setup lang="ts">
import router from '@/router'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>

<template>
  <div class="header">
    <i class="pi pi-home home-button" @click="router.go(0)"></i>
    <span class="title">Frame Magic</span>
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
  font-size: 20px;
}
</style>
