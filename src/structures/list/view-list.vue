<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import MusicPlayer from '@/structures/list/examples/music-player.vue'
</script>

<template>
  <app-section title="Связный список">
    <template #description>
      Связный список — это структура данных, состоящая из узлов, где каждый узел содержит данные и
      ссылку на следующий узел в последовательности. В контексте frontend-разработки, связные списки
      могут быть использованы для создания простых приложений, таких как музыкальный плеер.
    </template>

    <template #example1>
      <p>Описание примера</p>

      <music-player />
    </template>

    <template #pros>
      Киллер фича - удаление элемента О1. Не сдвигаешь все элементы, а меняешь у двух объект ссылки
      на prev/next
    </template>

    <template #cons>
      Автоматическая очистка сборщиком мусора при двусвязном кольцевом списке. Алгоритм не понимает
      как удалить связный список, т.к. Все элементы ссылаются друг на друга (кольцевая зависимость)
      Решение: Ключевое слово WeakRef
    </template>
  </app-section>
</template>
