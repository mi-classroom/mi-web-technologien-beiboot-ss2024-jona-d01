<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import ImagePreview from '@/components/ImagePreview.vue'
import { ref } from 'vue'

const showPreview = ref(false)
const handleSubmit = (event: any) => {
  showPreview.value = true
  event()
}
</script>

<template>
  <div class="justify-content-center flex">
    <Stepper
      :linear="true"
      :pt="{
        nav: {
          style: {
            'margin-bottom': '20px'
          }
        }
      }"
    >
      <StepperPanel header="Upload">
        <template #content="{ nextCallback }">
          <div class="flex justify-content-center">
            <FileUpload @onSubmit="nextCallback" />
          </div>
        </template>
      </StepperPanel>
      <StepperPanel header="Choose">
        <template #content="{ prevCallback, nextCallback }">
          <ImageGallery @onSubmit="handleSubmit(nextCallback)" @onBack="prevCallback" />
        </template>
      </StepperPanel>
      <StepperPanel header="Finish">
        <template #content="{ prevCallback }">
          <ImagePreview v-if="showPreview" @onBack="prevCallback" />
        </template>
      </StepperPanel>
    </Stepper>
  </div>
</template>

<style scoped>
.p-stepper {
  flex-basis: 100rem;
}
</style>
