<template>
  <div class="file-structure">
    <div class="file-structure__file" v-for="file in rootFolder.files" :key="file.name">
      {{ file.name }} ({{ file.size }}B)
    </div>

    <div class="file-structure__folders" v-for="folder in rootFolder.folders" :key="folder.name">
      <file-directory :folder="folder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileDirectory from './file-directory.vue'
import type { IFile, IFileDirectory } from './types.ts'

const files: IFile[] = [
  {
    name: 'Logs/WindowsUpdate/WindowsUpdate.20251224.etl',
    size: 1024,
  },
  {
    name: 'debug/mrtlog.txt',
    size: 124,
  },
  {
    name: 'DirectX.log',
    size: 51,
  },
]

const rootFolder = ref<IFileDirectory>(makeTree(files))

function makeTree(files: IFile[]) {
  const mapper: Record<string, IFileDirectory> = {}

  for (const { name, size } of files) {
    let directory: IFileDirectory
    let parent = ''
    let i = 0
    let j = 0

    while (j >= 0) {
      const path = name.slice(0, j)
      if (!mapper[path]) {
        directory = {
          name: name.slice(i, j),
          files: [],
          folders: [],
        }

        mapper[path] = directory

        if (path) {
          mapper[parent].folders.push(directory)
        }
      }
      parent = path
      i = j + (i > 0 ? 1 : 0)
      j = name.indexOf('/', i)
    }

    mapper[parent].files.push({
      name: name.slice(i),
      size,
    })
  }

  return mapper['']
}
</script>

<style lang="scss" scoped>
.file-structure {
  margin-top: 20px;

  &__file {
    color: #666;
  }

  &__folders {
    margin-left: -20px;
  }
}
</style>
