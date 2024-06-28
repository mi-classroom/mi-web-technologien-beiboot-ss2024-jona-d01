<script setup lang="ts">
import { onBeforeMount, type Ref, ref, watch } from 'vue'
import Button from 'primevue/button'
import Checkbox from '../components/Checkbox.vue'
import axios from 'axios'
import Overlay from '@/components/Overlay.vue'

interface Image {
  index: number
  source: string
  name: string
  selected: boolean
  showPreviewIcon: boolean
  showSkeleton: boolean
}

interface SelectionOption {
  name: string
  value: string
  constant: boolean
}

const activeIndex = ref(0)
const displayCustom = ref(false)
const images: Ref<Image[]> = ref([])
const isLoading = ref(false)
const options = ref([
  { name: 'None', value: 'None', constant: false },
  { name: 'Custom', value: 'Custom', constant: true },
  { name: 'All', value: 'All', constant: false }
])
const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 5
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '560px',
    numVisible: 1
  }
])
const selectedImages: Ref<SelectionOption> = ref(options.value[2])

const emit = defineEmits(['onSubmit', 'onBack'])

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

watch(selectedImages, () => {
  if (selectedImages.value.name === 'None') {
    images.value.forEach((image) => (image.selected = false))
  } else if (selectedImages.value.name === 'All') {
    images.value.forEach((image) => (image.selected = true))
  }
})

watch(
  images,
  () => {
    const allSelected = images.value.every((image) => image.selected)
    const allUnselected = images.value.every((image) => !image.selected)

    if (allSelected) {
      selectedImages.value = options.value[2]
    } else if (allUnselected) {
      selectedImages.value = options.value[0]
    } else {
      selectedImages.value = options.value[1]
    }
  },
  { deep: true }
)

function handleImageLoad(image: Image) {
  image.showSkeleton = false
}

function imageClick(index: number) {
  activeIndex.value = index
  displayCustom.value = true
}

async function submit() {
  isLoading.value = true
  try {
    await axios.get('/extractedFrames')
    await axios.post('/convertImage', { images: images.value })
  } catch (error) {
    console.error(error)
  }
  isLoading.value = false
  emit('onSubmit')
}
</script>

<template>
  <Overlay v-if="isLoading" />
  <div class="card flex justify-content-center">
    <Galleria
      v-model:activeIndex="activeIndex"
      v-model:visible="displayCustom"
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="3"
      containerStyle="max-width: 850px"
      :circular="true"
      :fullScreen="true"
      :showItemNavigators="true"
      :showThumbnails="false"
      :pt="{
        mask: {
          style: {
            background: 'rgba(0,0,0,0.9) !important'
          }
        }
      }"
    >
      <template #item="image">
        <div class="relative">
          <img
            loading="lazy"
            :src="image.item.source"
            :alt="image.item.name"
            style="width: 100%; display: block"
          />
          <Checkbox
            class="checkbox-preview"
            v-model="image.item.selected"
            :id="image.item.name"
            :name="image.item.name"
            :label="image.item.index.toString()"
          />
        </div>
      </template>
    </Galleria>

    <div v-if="images" class="grid justify-content-center" style="width: 100%">
      <div v-for="(image, index) of images" :key="index" class="col-3 relative w-auto m-1">
        <div>
          <Checkbox
            class="checkbox"
            v-model="image.selected"
            :id="image.name"
            :name="image.name"
            :label="image.index.toString()"
          />
          <div class="relative">
            <Skeleton v-if="image.showSkeleton" width="200px" height="112.5px" class="skeleton" />
            <img
              loading="lazy"
              :src="image.source"
              :alt="image.name"
              style="width: 200px; cursor: pointer"
              class="preview-image"
              @click="imageClick(index)"
              @mouseover="image.showPreviewIcon = true"
              @mouseleave="image.showPreviewIcon = false"
              @load="handleImageLoad(image)"
            />
            <i v-if="image.showPreviewIcon" class="pi pi-eye preview-icon pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex pt-4 justify-content-between">
    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="emit('onBack')" />
    <SelectButton
      v-model="selectedImages"
      :options="options"
      :allowEmpty="false"
      optionDisabled="constant"
      optionLabel="name"
    />
    <Button
      :disabled="selectedImages.name === 'None'"
      label="Next"
      icon="pi pi-arrow-right"
      iconPos="right"
      @click="submit"
    />
  </div>
</template>

<style scoped>
.preview-image {
  &:hover {
    filter: brightness(50%);
  }
}

.preview-icon {
  position: absolute;
  color: white;
  z-index: 1;
  top: 50%;
  left: 50%;
  font-size: 1.5rem;
  transform: translate(-50%, -50%);
}

.checkbox {
  position: absolute;
  z-index: 1;
  scale: 150%;
  left: 0;
  top: 0;
}

.checkbox-preview {
  position: absolute;
  z-index: 1;
  scale: 200%;
  left: 2%;
  top: 4%;
}

.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: 5px;
}
</style>
