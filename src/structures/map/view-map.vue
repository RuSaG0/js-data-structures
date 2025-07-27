<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import FilmMap from '@/structures/map/examples/film-map.vue'
</script>

<template>
  <app-section
    title="Карта"
    source="https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/map"
    :examples="[
      {
        title: 'Фильм',
        link: 'https://github.com/RuSaG0/js-data-structures/blob/master/src/structures/map/examples/film-map.vue',
      },
    ]"
  >
    <template #description>
      Карта (как и объект или хэш-таблица) — коллекция пар ключ/значение.
    </template>

    <template #example1>
      <p>Фильм со своими свойствами: название, жанр, изображение</p>
      <film-map />
    </template>
  </app-section>
</template>
