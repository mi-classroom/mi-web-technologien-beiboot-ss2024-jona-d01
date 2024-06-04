<script setup lang="ts">
import Button from 'primevue/button'

const imagePath = new URL('../../../build/output.png', import.meta.url).href
const emit = defineEmits(['onBack'])
const downloadImage = () => {
  const link = document.createElement('a')
  link.href = imagePath
  link.download = 'Image.png'
  link.click()
}
</script>

<template>
  <img alt="converted image" :src="imagePath" style="width: 100%" />
  <div class="flex pt-4 justify-content-between">
    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="emit('onBack')" />
    <Button label="Download" iconPos="right" icon="pi pi-download" @click="downloadImage" />
  </div>
</template>

<style scoped></style>
