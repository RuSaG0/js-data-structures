<template>
  <div class="folder">
    <div class="folder-header" @click="toggle">
      <span>{{ folder.name || 'Root' }}</span>
      <span>{{ isOpen ? '-' : '+' }}</span>
    </div>
    <div v-if="isOpen" class="folder-content">
      <div v-for="file in folder.files" :key="file.name" class="file">
        {{ file.name }} ({{ file.size }} bytes)
      </div>
      <div v-for="subFolder in folder.folders" :key="subFolder.name">
        <Folder :folder="subFolder" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface File {
  name: string;
  size: number;
}

interface Folder {
  name: string;
  files: File[];
  folders: Folder[];
}

const props = defineProps<{
  folder: Folder;
}>();

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.folder {
  margin-left: 20px;
}

.folder-header {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #f0f0f0;
}

.folder-content {
  margin-top: 5px;
}

.file {
  margin-left: 20px;
  color: #666;
}
</style>
