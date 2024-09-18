import { ref } from 'vue'

const resolutionOptions = ref([
  { name: 'HD (1280 x 720)', value: '1280x720' },
  { name: 'Full HD (1920 x 1080)', value: '1920x1080' },
  { name: 'QHD (2560 x 1440)', value: '2560x1440' },
  { name: '4K (3840 x 2160)', value: '3840x2160' }
])

const resolution = ref<{ name: string; value: string }>({
  name: 'Full HD (1920 x 1080)',
  value: '1920x1080'
})

function setResolution(newResolution: { name: string; value: string }) {
  if (!newResolution) {
    throw new Error('Invalid resolution')
  }
  resolution.value = newResolution
}

export function useResolution() {
  return {
    resolution,
    resolutionOptions,
    setResolution
  }
}
