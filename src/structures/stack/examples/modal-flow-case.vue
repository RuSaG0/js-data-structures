<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { type Modal, Stack } from '../stack.ts'

const modalStack = ref<Stack<Modal>>(new Stack<Modal>())

const openDeleteAccountModal = () => {
  modalStack.value.push({
    id: 1,
    title: 'Удаление аккаунта',
    content: 'Вы хотите удалить аккаунт?',
    buttonText: 'Да, хочу удалить',
  })
}

const openConfirmDeleteModal = () => {
  modalStack.value.push({
    id: 2,
    title: 'Подтверждение удаления',
    content: 'Вы уверены, что хотите удалить аккаунт? Данные о вас будут потеряны навсегда.',
    buttonText: 'Да, я уверен, удалить',
  })
}

const closeLastModal = () => {
  if (!modalStack.value.isEmpty()) {
    modalStack.value.pop()
  }
}

const closeAllModals = () => {
  while (!modalStack.value.isEmpty()) {
    modalStack.value.pop()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeLastModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="modal-flow">
    <button class="modal-flow__button-delete" @click="openDeleteAccountModal">
      Удалить аккаунт
    </button>

    <div v-for="modal in modalStack.getItems()" :key="modal.id" class="modal">
      <div class="modal__content">
        <div class="modal__close" @click="closeLastModal">&times;</div>

        <div class="modal__body">
          <h3 class="modal__title">{{ modal.title }}</h3>
          <p class="modal__text">{{ modal.content }}</p>
        </div>

        <div class="modal__buttons">
          <button v-if="modal.id === 1" @click="openConfirmDeleteModal">
            {{ modal.buttonText }}
          </button>

          <button v-if="modal.id === 2" @click="closeAllModals">{{ modal.buttonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.modal-flow {
  &__button-delete {
    cursor: pointer;
    height: 38px;
    margin-top: 10px;
    padding: 4px 10px;
    background: $color-accent;
    border: 1px solid #000;
    color: $color-main-text;

    &:hover {
      background: $color-main-text;
      color: $color-accent;
    }
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;

  &__content {
    background-color: $app-background;
    padding: 20px;
    max-width: min(400px, calc(100% - 20px));
    width: 100%;
    margin-top: 60px;
    text-align: center;
    position: relative;
    color: $color-black-text;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: $color-accent;
  }

  &__title {
    margin: 0 0 20px 0;
    line-height: 1.2;
    font-style: normal;
  }

  &__buttons {
    button {
      cursor: pointer;
      margin-top: 10px;
      padding: 4px 10px;
      background: $color-accent;
      border: 1px solid #000;
      color: $color-main-text;

      &:hover {
        background: $color-main-text;
        color: $color-accent;
      }
    }
  }
}
</style>
