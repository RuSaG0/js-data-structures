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
      <div class="structure-img">
        <img src="/structures/map.svg" alt="" />
      </div>
    </template>

    <template #pros>
      Когда вам нужно хранить данные, где каждый элемент имеет уникальный ключ. <br />
      Когда данные имеют сложную структуру с различными свойствами. <br />
      Когда требуется быстрый доступ к данным <b>по ключу, а не по индексу</b>.
    </template>

    <template #cons>
      <b>Методы итерации по картам</b>: менее удобные методы для итерации по сравнению с другими
      структурами данных.
    </template>

    <template #example1>
      <p>
        Рассмотрим структуру данных карты на примере
        <a href="https://https://premier.one/series/dramy/RU/" target="_blank">Онлайн-кинотеатра</a
        >, где каждый фильм имеет несколько свойств, например название, жанр, изображение.
      </p>
      <film-map />
    </template>
  </app-section>
</template>

<style scoped>
.structure-img {
  width: 100%;
  aspect-ratio: 1056 / 157;
}
</style>
