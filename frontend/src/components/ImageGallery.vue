<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Button from 'primevue/button'
import axios from 'axios'

interface Image {
  index: number
  source: string
  name: string
  selected: boolean
  showPreviewIcon: boolean
}

const images: Ref<Image[]> = ref([])
const activeIndex = ref(0)
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
const displayCustom = ref(false)
const imageFiles = import.meta.glob('../../../build/thumbnails/*.png')
const emit = defineEmits(['onSubmit', 'onBack'])

function imageClick(index: number) {
  activeIndex.value = index
  displayCustom.value = true
}

async function submit() {
  try {
    await axios.get('/extractedFrames')
    await axios.post('/convertImage', { images: images.value })
  } catch (error) {
    console.error(error)
  }
  emit('onSubmit')
}

for (const path in imageFiles) {
  if (imageFiles.hasOwnProperty(path)) {
    const imageName = path.split('/').pop()
    const absolutePath = new URL(`../../../build/thumbnails/${imageName}`, import.meta.url).href
    const imageObject: Image = {
      index: parseInt(imageName!.split('.')[0]),
      source: absolutePath,
      name: imageName!,
      selected: true,
      showPreviewIcon: false
    }
    images.value.push(imageObject)
  }
}
</script>

<template>
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
    >
      <template #item="image">
        <div class="relative">
          <img
            loading="lazy"
            :src="image.item.source"
            :alt="image.item.name"
            style="width: 100%; display: block"
          />
          <button
            class="index-label"
            v-bind:class="{ 'not-selected': !image.item.selected }"
            style="padding: 20px; font-size: 1.5rem; z-index: 2"
            @click="image.item.selected = !image.item.selected"
          >
            {{ image.item.index }}
          </button>
        </div>
      </template>
    </Galleria>

    <div v-if="images" class="grid justify-content-center" style="width: 100%">
      <div v-for="(image, index) of images" :key="index" class="col-3 relative w-auto">
        <div class="relative">
          <img
            loading="lazy"
            :src="image.source"
            :alt="image.name"
            style="width: 200px; cursor: pointer"
            class="preview-image"
            @click="imageClick(index)"
            @mouseover="image.showPreviewIcon = true"
            @mouseleave="image.showPreviewIcon = false"
          />
          <i v-if="image.showPreviewIcon" class="pi pi-eye preview-icon" />
        </div>
        <button
          v-bind:class="{ 'not-selected': !image.selected }"
          class="index-label"
          @click="image.selected = !image.selected"
        >
          {{ image.index }}
        </button>
      </div>
    </div>
  </div>
  <div class="flex pt-4 justify-content-between">
    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="emit('onBack')" />
    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="submit" />
  </div>
</template>

<style scoped>
.index-label {
  z-index: 1;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  color: white;
  font-weight: bold;
  padding: 10px;
  min-width: 35px;
  min-height: 35px;

  &:hover {
    cursor: pointer;
  }
}

.not-selected {
  background-color: red;
}

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
</style>
