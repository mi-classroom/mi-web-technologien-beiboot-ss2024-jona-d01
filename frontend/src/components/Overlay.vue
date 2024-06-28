<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.body.style.pointerEvents = 'none'
})

onUnmounted(() => {
  document.body.style.removeProperty('pointer-events')
})
</script>

<template>
  <div class="overlay">
    <ProgressSpinner aria-label="Loading" :strokeWidth="5" />
  </div>
</template>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  pointer-events: none;
}

:deep(.p-progressspinner-circle) {
  stroke: var(--primary-color) !important;
}
</style>
