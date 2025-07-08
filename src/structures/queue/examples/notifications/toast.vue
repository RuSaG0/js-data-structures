<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast">
      {{ toast.message }} {{toast.id}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ToastQueue, type ToastItem } from './toast-queue.ts'
const toastQueue = new ToastQueue();
const toasts = ref<ToastItem[]>([]);

const showToast = (message: string) => {
  toastQueue.enqueueToast(message);
  toasts.value = toastQueue.getItems();

  setTimeout(() => {
    toastQueue.dequeue();
    toasts.value = toastQueue.getItems();
  }, 3000);
};

defineExpose({
  showToast,
});
</script>

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
  background-color: var(--color-bg-label);
  color: var(--color-text-contrast);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
