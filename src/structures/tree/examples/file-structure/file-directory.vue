<script setup lang="ts">
import { ref } from 'vue'
import type { IFileDirectory } from './types.ts'

defineProps<{
  folder: IFileDirectory
}>()

const isOpen = ref<boolean>(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="folder">
    <div class="folder__header" @click="toggle">
      <span>{{ folder.name || 'Root' }}</span>
      <span>{{ isOpen ? '-' : '+' }}</span>
    </div>

    <div v-if="isOpen" class="folder__content">
      <div v-for="file in folder.files" :key="file.name" class="folder__file">
        {{ file.name }} ({{ file.size }}B)
      </div>

      <div v-for="subFolder in folder.folders" :key="subFolder.name">
        <FileDirectory :folder="subFolder" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.folder {
  margin: 4px 0 4px 20px;

  &__header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    background-color: #f0f0f0;
  }

  &__content {
    margin-top: 5px;
  }

  &__file {
    margin-left: 20px;
    color: #666;
  }
}
</style>
