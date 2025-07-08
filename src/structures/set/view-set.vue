<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import Tags from '@/structures/set/examples/tags.vue'
import MusicPlayer from '@/structures/list/examples/music-player/music-player.vue'
</script>

<template>
  <app-section title="Множество">
    <template #description>
      Множество — это структура данных, состоящая из уникальных элементов без определённого порядка. В frontend-разработке множества могут быть использованы для представления уникальных тегов или категорий.
    </template>

    <template #example1>
      <p>
        Киносайт, где фильмы могут быть помечены различными жанрами. Множество может быть использовано для хранения и отображения уникальных жанров, связанных с фильмами.
      </p>
      <tags />
    </template>

    <template #pros>
      Когда нужно часто проверять на наличие элемента в структуре (has)
    </template>
  </app-section>
</template>
