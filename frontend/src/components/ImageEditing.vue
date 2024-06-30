<script setup lang="ts">
import Button from 'primevue/button'
import axios from 'axios'
import { onBeforeMount, ref, type Ref } from 'vue'
import Overlay from '@/components/Overlay.vue'
import type { Image } from '@shared-types'

const activeIndex = ref(0)
const images: Ref<Image[]> = ref([])
const isLoading = ref(false)
const responsiveOptions = ref([
  {
    breakpoint: '1280px',
    numVisible: 5
  },
  {
    breakpoint: '1000px',
    numVisible: 3
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
])

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
      :responsiveOptions="responsiveOptions"
      thumbnailsPosition="bottom"
    >
      <template #item="image">
        <img
          :src="image.item.source"
          :alt="image.item.name"
          :style="{
            width: '100%',
            maxWidth: '1280px',
            display: 'block',
            opacity: `${image.item.opacity}%`
          }"
        />
        <div class="flex w-full p-5">
          <div class="flex-auto">
            <label for="opacity" class="font-bold block mb-2">Opacity</label>
            <InputNumber
              v-model="image.item.opacity"
              inputId="opacity"
              :showButtons="true"
              buttonLayout="horizontal"
              style="width: 4rem"
              :min="0"
              :max="100"
              suffix=" %"
            >
              <template #incrementbuttonicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
          </div>
        </div>
      </template>
      <template #thumbnail="image">
        <div class="grid justify-content-center">
          <img
            :src="image.item.source"
            :alt="image.item.name"
            style="width: 13rem; display: block; overflow: hidden; max-width: 200px"
          />
        </div>
      </template>
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
  padding: 1rem;
}

:deep(.p-galleria-item) {
  flex-direction: column;
}
</style>
