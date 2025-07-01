<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import AppCode from '@/components/ui/app-code.vue'
import { ref } from 'vue'

const code = ref(`console.log('Hello, world!')`)
</script>

<template>
  <app-section title="Связный список">
    <p>
      Связный список — это структура данных, состоящая из узлов, где каждый узел содержит данные и
      ссылку на следующий узел в последовательности. В контексте frontend-разработки, связные списки
      могут быть использованы для создания простых приложений, таких как музыкальный плеер.
    </p>

    <app-code :code="code" />

    <p>
      Автоматическая очистка сборщиком мусора при двусвязном кольцевом списке. Алгоритм не понимает
      как удалить связный список, т.к. Все элементы ссылаются друг на друга (кольцевая зависимость)
      Решение: Ключевое слово WeakRef
    </p>
  </app-section>
</template>
