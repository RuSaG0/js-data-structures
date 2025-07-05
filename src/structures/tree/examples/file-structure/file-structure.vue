<template>
  <div>
    <h2>Файловая структура</h2>
    <p>
      В этом примере показана реализация файловой структуры, где есть папки и файлы.
      Папки можно раскрывать и сворачивать, чтобы просмотреть их содержимое.
      Файлы отображаются внутри папок, и вы можете видеть их размеры.
      Представим также ситуацию, что файл можно открыть и изменить его содержимое
    </p>
    <div class="file-structure">
      <div v-for="file in rootFolder.files" :key="file.name" class="file">
        {{ file.name }} ({{ file.size }} bytes)
      </div>
      <div v-for="folder in rootFolder.folders" :key="folder.name">
        <folder :folder="folder" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Folder from './Folder.vue';

interface File {
  name: string;
  size: number;
}

interface Folder {
  name: string;
  files: File[];
  folders: Folder[];
}

const files = [
  {
    id: 'Logs/WindowsUpdate/WindowsUpdate.20251224.etl',
    size: 1024,
  },
  {
    id: 'debug/mrtlog.txt',
    size: 124
  },
  {
    id: 'DirectX.log',
    size: 51
  }
];

function makeTree(files) {
  const mapper = {};

  for (const {id, size} of files) {
    let node, parent = "";
    let i = 0, j = 0;
    while (j > -1) {
      let path = id.slice(0, j);
      if (!mapper[path]) {
        node = {
          name: id.slice(i, j),
          files: [],
          folders: [],
        };
        mapper[path] = node;
        if (path) mapper[parent].folders.push(node);
      }
      parent = path;
      i = j + !!i;
      j = id.indexOf("/", i);
    }
    node = {
      name: id.slice(i),
      size
    };
    mapper[id] = node;
    mapper[parent].files.push(node);
  }
  return mapper[""];
}

const rootFolder = ref<Folder>(makeTree(files));
</script>

<style scoped>
.file-structure {
  margin-top: 20px;
}

.file {
  margin-left: 20px;
  color: #666;
}
</style>
