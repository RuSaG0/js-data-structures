<template>
  <div class="p-4 max-w-md mx-auto space-y-4">
    <h2 class="text-xl font-bold">Загрузка файлов</h2>

    <input type="file" multiple @change="handleFileSelect" />

    <ul>
      <li
        v-for="item in queueItems"
        :key="item.id"
        class="p-2 border rounded mb-1 flex justify-between"
      >
        <span>{{ item.file.name }}</span>
        <span>
          <span v-if="item.status === 'pending'">🕒 Waiting</span>
          <span v-else-if="item.status === 'uploading'">⬆️ Uploading</span>
          <span v-else>✅ Done</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadQueue, type UploadItem } from '../queue.ts'

const queueItems = ref<UploadItem[]>([])

const uploadQueue = new UploadQueue((item, markDone) => {
  setTimeout(() => {
    markDone()
    queueItems.value = uploadQueue.getAllItems()
  }, 1500)
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
