<template>
  <div>
    <button @click="showToast">Показать уведомление</button>
    <Toast ref="toastComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Toast from './toast.vue';

const toastComponent = ref<InstanceType<typeof Toast> | null>(null);

const showToast = () => {
  if (toastComponent.value) {
    toastComponent.value.showToast('Это уведомление!');
  }
};
</script>
