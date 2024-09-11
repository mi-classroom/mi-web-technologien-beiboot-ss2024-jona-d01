import { ref } from 'vue'

const frameRate = ref<number>(5)

function setFrameRate(newFrameRate: number) {
  if (newFrameRate < 1 || newFrameRate > 60) {
    throw new Error('frameRate must be between 1 and 60')
  }
  frameRate.value = newFrameRate
}

export function useFrameRate() {
  return {
    frameRate,
    setFrameRate
  }
}
