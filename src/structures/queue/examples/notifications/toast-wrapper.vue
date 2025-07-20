<script setup lang="ts">
import { ref } from 'vue'
import ToastItem from './toast-item.vue'

const toastComponent = ref<InstanceType<typeof ToastItem> | null>(null)

const showToast = () => {
  if (toastComponent.value) {
    toastComponent.value.showToast('Это уведомление!')
  }
}
</script>

<template>
  <div class="toast-wrapper">
    <button class="toast-wrapper__button" @click="showToast">Показать уведомление</button>
    <ToastItem ref="toastComponent" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.toast-wrapper {
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    border: 1px solid #000;
    background: $color-primary-button;

    &:hover {
      background: $color-primary-button-hover;
      color: $color-main-text;
    }
  }
}
</style>
