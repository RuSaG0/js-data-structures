<template>
  <div class="file-uploaded-queue">
    <h3 class="file-uploaded-queue__title">Загрузка файлов</h3>

    <input type="file" multiple @change="handleFileSelect" />

    <ul class="file-uploaded-queue__list">
      <li v-for="item in queueItems" :key="item.id" class="file-uploaded-queue__item">
        <div class="file-uploaded-queue__item__title">
          <span>{{ item.file.name }}</span>
          <span>
            <span v-if="item.status === 'pending'">🕒 Ожидание</span>
            <span v-else-if="item.status === 'uploading'">⬆️ Загрузка {{ item.progress }}%</span>
            <span v-else>✅ Загружено</span>
          </span>
        </div>

        <div v-if="item.status === 'uploading'" class="file-uploaded-queue__item__progress">
          <div
            class="file-uploaded-queue__item__progress-bar"
            :style="{ width: item.progress + '%' }"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  type UploadItem,
  UploadQueue,
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
  files.forEach((file) => {
    uploadQueue.enqueueFile(file)
  })
  queueItems.value = uploadQueue.getAllItems()
}
</script>

<style lang="scss" scoped>
.file-uploaded-queue {
  &__title {
    margin-bottom: 10px;
    font-style: normal;
  }

  &__list {
    margin-top: 20px;
  }

  &__item {
    &__title {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    &__progress {
      width: 100%;
      height: 10px;
      background-color: #e2e8f0;
      border-radius: 5px;
      overflow: hidden;
    }

    &__progress-bar {
      height: 100%;
      background-color: #3b82f6;
      border-radius: 5px;
      transition: width 0.3s ease;
    }
  }
}
</style>
