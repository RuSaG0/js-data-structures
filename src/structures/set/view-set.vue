<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import TagsExample from '@/structures/set/examples/tags-example.vue'
</script>

<template>
  <app-section
    title="Множество"
    source="https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/set"
    :examples="[
      {
        title: 'Выборка по свойству',
        link: 'https://github.com/RuSaG0/js-data-structures/blob/master/src/structures/set/examples/tags-example.vue',
      },
    ]"
  >
    <template #description>
      Множество — это структура данных, состоящая из уникальных элементов без определённого порядка.
      В frontend-разработке множества могут быть использованы для представления уникальных тегов или
      категорий.
      <div class="structure-img">
        <img src="/structures/set.svg" alt="" />
      </div>
    </template>

    <template #pros>
      Когда нужно хранить уникальные элементы без повторений и быстро проверять их наличие (has).
    </template>

    <template #cons>
      Не подойдет, когда нужен доступ к элементу по индексу или когда допустимы повторы.
    </template>

    <template #example1>
      Рассмотрим пример, как в
      <a href="https://premier.one/series/dramy/RU" target="_blank">Онлайн-кинотеатре PREMIER</a>,
      где фильмы могут быть помечены различными жанрами. Множество может быть использовано для
      хранения и отображения уникальных жанров, связанных с фильмами.
      <tags-example />
    </template>
  </app-section>
</template>

<style scoped>
.structure-img {
  width: 100%;
  aspect-ratio: 1051 / 542;
}
</style>
