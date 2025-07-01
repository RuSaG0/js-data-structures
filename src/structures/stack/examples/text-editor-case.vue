<template>
  <div>
    <h2>Мини-редактор</h2>
    <textarea v-model="inputText" @input="onInput" placeholder="Введите текст здесь..."></textarea>
    <div>
      <button @click="undoChange" :disabled="isUndoStackEmpty()">Отменить</button>
      <button @click="redoChange" :disabled="isRedoStackEmpty()">Вперед</button>
    </div>
    <p v-if="isValid" style="color: green;">Текст валиден.</p>
    <p v-else style="color: red;">Текст невалиден: обнаружены HTML-теги.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Stack } from '../stack.ts';

const inputText = ref('');
const undoStack = ref(new Stack<string>());
const redoStack = ref(new Stack<string>());
const isValid = ref(true);

const checkValidity = (text: string) => {
  const htmlTagRegex = /<[^>]*>/;
  return !htmlTagRegex.test(text);
};

const onInput = () => {
  undoStack.value.push(inputText.value);
  isValid.value = checkValidity(inputText.value);
  redoStack.value = new Stack<string>(); // Очищаем стек "вперед" при новых изменениях
};

const undoChange = () => {
  if (!undoStack.value.isEmpty()) {
    redoStack.value.push(inputText.value);
    inputText.value = undoStack.value.pop() || '';
    isValid.value = checkValidity(inputText.value);
  }
};

const redoChange = () => {
  if (!redoStack.value.isEmpty()) {
    undoStack.value.push(inputText.value);
    inputText.value = redoStack.value.pop() || '';
    isValid.value = checkValidity(inputText.value);
  }
};

const isUndoStackEmpty = () => {
  return undoStack.value.isEmpty();
};

const isRedoStackEmpty = () => {
  return redoStack.value.isEmpty();
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  font-family: Arial, sans-serif;
}

button {
  margin-top: 10px;
  margin-right: 5px;
  padding: 8px 16px;
  background-color: #D3F26A;
  color: #1D1D1D;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #aee3ec;
  cursor: not-allowed;
}
</style>
