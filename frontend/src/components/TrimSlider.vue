<script setup lang="ts">
import { defineModel, defineProps, watch } from 'vue'
import Slider from 'primevue/slider'

const modelValue = defineModel<[number, number]>({ required: true })

const props = defineProps<{
  duration: number
}>()

const updateSliderHandles = () => {
  const sliderHandles = document.querySelectorAll('.p-slider-handle')
  if (sliderHandles.length > 0) {
    sliderHandles[0].setAttribute('aria-valuenow', modelValue.value[0].toString())
    sliderHandles[1].setAttribute('aria-valuenow', modelValue.value[1].toString())
  }
}

watch(modelValue, (newValue, oldValue) => {
  if (newValue[0] >= newValue[1]) {
    if (oldValue[0] !== newValue[0]) {
      modelValue.value[0] = newValue[1] - 1
    } else {
      modelValue.value[1] = newValue[0] + 1
    }
  }
  updateSliderHandles()
})
</script>

<template>
  <div class="w-full px-4 flex flex-column mb-6">
    <label for="timeRange" class="font-bold block mb-2">Time range (in seconds)</label>
    <Slider
      id="timeRange"
      v-model="modelValue"
      :min="0"
      :max="props.duration"
      range
      class="w-full mt-3"
    />
  </div>
</template>

<style scoped>
:deep(.p-slider .p-slider-handle::after) {
  content: attr(aria-valuenow);
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
  font-size: 1rem;
  white-space: nowrap;
}
</style>
