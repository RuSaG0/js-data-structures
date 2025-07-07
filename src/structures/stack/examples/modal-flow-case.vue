<template>
  <button @click="openDeleteAccountModal">Удалить аккаунт</button>
  <div v-for="modal in modalStack.getItems()" :key="modal.id" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeLastModal">&times;</span>
      <h2>{{ modal.title }}</h2>
      <p>{{ modal.content }}</p>
      <button v-if="modal.id === 1" @click="openConfirmDeleteModal">{{ modal.buttonText }}</button>
      <button v-if="modal.id === 2" @click="closeAllModals">{{ modal.buttonText }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Modal, Stack } from '@/structures/stack/stack.ts'

const modalStack = ref(new Stack<Modal>());

const openDeleteAccountModal = () => {
  modalStack.value.push({
    id: 1,
    title: 'Удаление аккаунта',
    content: 'Вы хотите удалить аккаунт?',
    buttonText: 'Да, хочу удалить'
  });
};

const openConfirmDeleteModal = () => {
  modalStack.value.push({
    id: 2,
    title: 'Подтверждение удаления',
    content: 'Вы уверены, что хотите удалить аккаунт? Данные о вас будут потеряны навсегда.',
    buttonText: 'Подтвердить удаление'
  });
};

const closeLastModal = () => {
  if (!modalStack.value.isEmpty()) {
    modalStack.value.pop();
  }
};

const closeAllModals = () => {
  while (!modalStack.value.isEmpty()) {
    modalStack.value.pop();
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeLastModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>


<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: $app-background;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  color: $color-black-text;
}

.close {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: $color-black-text;
}

.close:hover {
  color: $app-accent;
}

button {
  padding: 10px 20px;
  background-color: $color-primary-button;
  color: $color-black-text;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: $color-secondary-button-hover;
  color: $color-main-text;
}
</style>
