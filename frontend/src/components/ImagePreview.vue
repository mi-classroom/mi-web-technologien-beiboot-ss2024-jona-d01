<script setup lang="ts">
import Button from 'primevue/button'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'

const imagePath = ref()
const emit = defineEmits(['onBack'])
const downloadImage = () => {
  const link = document.createElement('a')
  link.href = imagePath.value
  link.download = 'Image.png'
  link.click()
}

onBeforeMount(async () => {
  try {
    const result = await axios.get('/output')
    imagePath.value = 'data:image/png;base64,' + result.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <img alt="converted image" :src="imagePath" style="width: 100%; filter: none" />
  <div class="flex pt-4 justify-content-between">
    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="emit('onBack')" />
    <Button label="Download" iconPos="right" icon="pi pi-download" @click="downloadImage" />
  </div>
</template>

<style scoped></style>
