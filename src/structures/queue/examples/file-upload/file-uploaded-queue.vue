<template>
  <div class="p-4 max-w-md mx-auto space-y-4">
    <h2 class="text-xl font-bold">Загрузка файлов</h2>
    <input type="file" multiple @change="handleFileSelect" />
    <ul>
      <li
        v-for="item in queueItems"
        :key="item.id"
        class="p-2 border rounded mb-2"
      >
        <div class="flex justify-between items-center">
          <span>{{ item.file.name }}</span>
          <span>
            <span v-if="item.status === 'pending'">🕒 Waiting</span>
            <span v-else-if="item.status === 'uploading'">⬆️ Uploading {{ item.progress }}%</span>
            <span v-else>✅ Done</span>
          </span>
        </div>
        <div v-if="item.status === 'uploading'" class="progress-container mt-2">
          <div class="progress-bar" :style="{ width: item.progress + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  type UploadItem,
  UploadQueue
} from '@/structures/queue/examples/file-upload/upload-queue.ts'

const queueItems = ref<UploadItem[]>([])

const uploadQueue = new UploadQueue((item, markDone) => {
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    item.progress = progress
    queueItems.value = uploadQueue.getAllItems()

    if (progress >= 100) {
      clearInterval(interval)
      markDone()
      queueItems.value = uploadQueue.getAllItems()
    }
  }, 300)
})

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files) return
  const files = Array.from(input.files)
  files.forEach(file => {
    uploadQueue.enqueueFile(file)
  })
  queueItems.value = uploadQueue.getAllItems()
}
</script>

<style scoped>
.progress-container {
  width: 100%;
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #3b82f6;
  border-radius: 5px;
  transition: width 0.3s ease;
}
</style>
