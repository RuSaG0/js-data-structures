<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AppCode from '@/components/ui/app-code.vue';
import AppAppSection from '@/components/section/app-section.vue';
import { Stack, Modal } from './Stack';

const code = ref(`console.log('Hello, world!')`);
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

<template>
  <app-app-section title="Стек">
    <p>
      Стек — это структура данных, работающая по принципу LIFO (Last In, First Out), что означает,
      что последний добавленный элемент будет первым извлечен. В frontend-разработке стек полезен
      для управления историей навигации или для валидации данных.
    </p>
    <app-code :code="code" />
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
  </app-app-section>
</template>

<style scoped>
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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #aed47c;
}

button {
  padding: 10px 20px;
  background-color: #aed47c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #8fb357;
}
</style>
