<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import ImagePreview from '@/components/ImagePreview.vue'
import ImageCarousel from '@/components/ImageEditing.vue'
</script>

<template>
  <div class="justify-content-center flex">
    <Stepper
      value="1"
      :linear="true"
      :pt="{
        root: {
          style: {
            'margin-bottom': '20px',
            'margin-left': '1rem',
            'margin-right': '1rem'
          }
        }
      }"
    >
      <StepList>
        <Step value="1">Upload</Step>
        <Step value="2">Choose</Step>
        <Step value="3">Edit</Step>
        <Step value="4">Finish</Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <div class="flex justify-content-center">
            <FileUpload @onSubmit="activateCallback('2')" />
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="2">
          <ImageGallery @onSubmit="activateCallback('3')" @onBack="activateCallback('1')" />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div class="flex justify-content-center">
            <ImageCarousel @onSubmit="activateCallback('4')" @onBack="activateCallback('2')" />
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="4">
          <ImagePreview @onBack="activateCallback('3')" />
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<style scoped>
.p-stepper {
  flex-basis: 100rem;
}
</style>
