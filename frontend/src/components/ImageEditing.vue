<script setup lang="ts">
import Button from 'primevue/button'
import axios from 'axios'
import { onBeforeMount, ref, type Ref } from 'vue'

interface Image {
  index: number
  source: string
  name: string
  selected: boolean
  showPreviewIcon: boolean
  showSkeleton: boolean
}

const images: Ref<Image[]> = ref([])
const activeIndex = ref(0)
const emit = defineEmits(['onSubmit', 'onBack'])

async function submit() {
  emit('onSubmit')
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
  <div
    class="card px-5 mt-5 flex flex-column"
    style="max-width: 1280px; align-self: center; width: 100%"
  >
    <Galleria
      v-model:activeIndex="activeIndex"
      :value="images"
      :numVisible="5"
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
            style="width: 90%; display: block; overflow: hidden"
          />
        </div>
      </template>
      <div></div>
    </Galleria>
    <div class="flex pt-4 justify-content-between">
      <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="emit('onBack')" />
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="submit" />
    </div>
  </div>
</template>

<style scoped>
:deep(.p-galleria-thumbnail) {
  overflow: hidden;
}
</style>
