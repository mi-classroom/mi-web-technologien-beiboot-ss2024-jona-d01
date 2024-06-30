<script setup lang="ts">
import { ref } from 'vue'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Button from 'primevue/button'
import axios from 'axios'
import Overlay from '@/components/Overlay.vue'

const totalSize = ref(0)
const files = ref<File[]>([])
const isLoading = ref(false)
const file = ref()
const videoUrl = ref('')
const emit = defineEmits(['onSubmit'])
const isSubmitDisabled = ref(true)

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  file.value = event.files[0]
  videoUrl.value = URL.createObjectURL(event.files[0])
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size))
  })
  isSubmitDisabled.value = false
}

const onUpload = async () => {
  const formData = new FormData()
  formData.append('video', file.value)
  isLoading.value = true
  try {
    await axios.post('/upload', formData)
    await axios.post('/thumbnails')
    await axios.post('/frames')
    emit('onSubmit')
  } catch (error) {
    console.error(error)
  }
  isLoading.value = false
}

function formatSize(bytes: number): string {
  const fileSizeKB = bytes / 1000

  if (fileSizeKB < 1000) {
    return `${fileSizeKB.toFixed(1)} kB`
  } else {
    const fileSizeMB = fileSizeKB / 1000
    return `${fileSizeMB.toFixed(1)} MB`
  }
}
</script>

<template>
  <Overlay v-if="isLoading" />
  <div
    class="card px-5 mt-5 flex flex-column"
    style="max-width: 1280px; align-self: center; width: 100%"
  >
    <FileUpload
      name="demo[]"
      url="/upload"
      accept="video/*"
      :fileLimit="1"
      :multiple="false"
      :disabled="files.length > 0"
      @select="onSelectedFiles"
      @upload="onUpload"
      @clear="files = []"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
          <div class="flex justify-content-between w-full">
            <Button
              :disabled="files.length > 0"
              @click="chooseCallback()"
              icon="pi pi-folder-open"
              rounded
              outlined
            />
            <div v-if="files.length > 0" class="flex flex-column align-items-center">
              <span class="font-semibold">{{ files[0].name }}</span>
              <div>{{ formatSize(files[0].size) }}</div>
            </div>
            <Button
              @click="
                () => {
                  isSubmitDisabled = true
                  clearCallback()
                }
              "
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
        </div>
      </template>
      <template #content="{ files }">
        <div v-if="files.length > 0">
          <div class="flex flex-wrap p-0 sm:p-1 gap-5">
            <div
              v-for="(file, index) of files"
              :key="index + file.name + file.type + file.size"
              class="card flex flex-column align-items-center gap-3 w-full"
            >
              <div>
                <video controls preload="auto" width="100%" height="100%">
                  <source :src="videoUrl" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div
          class="flex align-items-center justify-content-center flex-column"
          style="height: 20rem"
        >
          <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
          <p class="mt-4 mb-0">Drag and drop a video to upload.</p>
        </div>
      </template>
    </FileUpload>
    <div class="flex pt-4 justify-content-end">
      <Button
        :disabled="isSubmitDisabled"
        label="Next"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="onUpload"
      />
    </div>
  </div>
</template>

<style scoped></style>
