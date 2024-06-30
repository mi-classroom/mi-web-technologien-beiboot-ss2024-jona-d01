<script setup lang="ts">
import Button from 'primevue/button'
import axios from 'axios'
import { onBeforeMount, ref, type Ref } from 'vue'
import Overlay from '@/components/Overlay.vue'
import type { Image } from '@shared-types'

const activeIndex = ref(0)
const images: Ref<Image[]> = ref([])
const isLoading = ref(false)

const emit = defineEmits(['onSubmit', 'onBack'])

async function submit() {
  isLoading.value = true
  try {
    await axios.post('/output', { images: images.value })
    emit('onSubmit')
  } catch (error) {
    console.error(error)
  }
  isLoading.value = false
}

async function back() {
  isLoading.value = true
  try {
    await axios.post('/frames')
    await axios.post('/thumbnails')
    emit('onBack')
  } catch (error) {
    console.error(error)
  }
  isLoading.value = false
}

onBeforeMount(async () => {
  await axios
    .get('/thumbnails')
    .then((result) => {
      images.value = result.data
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <Overlay v-if="isLoading" />
  <div
    class="card px-5 mt-5 flex flex-column"
    style="max-width: 1280px; align-self: center; width: 100%"
  >
    <Galleria
      v-model:activeIndex="activeIndex"
      :value="images"
      :numVisible="5"
      :showItemNavigators="images.length > 1"
      :showItemNavigatorsOnHover="true"
      thumbnailsPosition="bottom"
    >
      <template #item="image">
        <img :src="image.item.source" :alt="image.item.name" style="width: 100%; display: block" />
      </template>
      <template #thumbnail="image">
        <div class="grid justify-content-center">
          <img
            :src="image.item.source"
            :alt="image.item.name"
            style="width: 13rem; display: block; overflow: hidden"
          />
        </div>
      </template>
      <div></div>
    </Galleria>
    <div class="flex pt-4 justify-content-between">
      <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="back" />
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="submit" />
    </div>
  </div>
</template>

<style scoped>
:deep(.p-galleria-thumbnail) {
  overflow: hidden;
}
</style>
