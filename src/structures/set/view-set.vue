<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import TagsExample from '@/structures/set/examples/tags-example.vue'
</script>

<template>
  <app-section title="Множество">
    <template #description>
      Множество — это структура данных, состоящая из уникальных элементов без определённого порядка.
      В frontend-разработке множества могут быть использованы для представления уникальных тегов или
      категорий.
    </template>

    <template #pros> Когда нужно часто проверять на наличие элемента в структуре (has) </template>

    <template #example1>
      <a href="https://premier.one/series/dramy/RU" target="_blank">Онлайн-кинотеатр</a>, где фильмы
      могут быть помечены различными жанрами. Множество может быть использовано для хранения и
      отображения уникальных жанров, связанных с фильмами.

      <tags-example />
    </template>
  </app-section>
</template>
