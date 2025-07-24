<script setup lang="ts">
import { ref } from 'vue'
import { ToastQueue, type ToastItem } from './types.ts'
const toastQueue = new ToastQueue()
const toasts = ref<ToastItem[]>([])

const showToast = (message: string) => {
  toastQueue.enqueueToast(message)
  toasts.value = toastQueue.getItems()

  setTimeout(() => {
    toastQueue.dequeue()
    toasts.value = toastQueue.getItems()
  }, 3000)
}

defineExpose({
  showToast,
})
</script>

<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast">
      {{ toast.message }}{{ toast.id }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 10px 20px;
  background: $color-primary-button;
  color: #000;
}
</style>
