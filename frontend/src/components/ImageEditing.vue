<script setup lang="ts">
import Button from 'primevue/button'
import axios from 'axios'
import { onBeforeMount, ref, type Ref, watch } from 'vue'
import Overlay from '@/components/Overlay.vue'
import type { Image } from '@shared-types'
import type { InputNumberInputEvent } from 'primevue/inputnumber'

const activeIndex = ref(0)
const images: Ref<Image[]> = ref([])
const isLoading = ref(false)
const isSync = ref(false)
const isPreviewEnabled = ref(true)
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

function handleOpacityChange(event: InputNumberInputEvent) {
  if (isSync.value) {
    const newValue: number = Number(event.value) || 0
    images.value.forEach((image: Image) => {
      image.opacity = newValue
    })
  }
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
          class="block w-full max-w-80rem"
          :style="isPreviewEnabled ? { opacity: `${image.item.opacity}%` } : {}"
        />
        <div class="w-full p-5 filters">
          <div class="flex-auto w-fit">
            <label for="opacity" class="font-bold block mb-2">Opacity</label>
            <InputNumber
              v-model="image.item.opacity"
              inputId="opacity"
              :showButtons="true"
              buttonLayout="horizontal"
              :min="0"
              :max="100"
              suffix=" %"
              @input="handleOpacityChange"
            >
              <template #incrementbuttonicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
          </div>
          <div class="flex-auto w-fit">
            <label for="switch" class="font-bold block mb-2">Preview</label>
            <ToggleSwitch v-model="isPreviewEnabled" inputId="switch" />
          </div>
          <div class="flex-auto w-fit">
            <label for="toggle" class="font-bold block mb-2">Adjust for all</label>
            <ToggleButton v-model="isSync" id="toggle" onLabel="Yes" offLabel="No" />
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

:deep(.p-inputnumber-input) {
  width: 4.5rem;
  text-align: center;
}

.filters {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
  border-bottom: var(--galleria-border-width) solid var(--galleria-border-color);
  border-top: var(--galleria-border-width) solid var(--galleria-border-color);
}
</style>
