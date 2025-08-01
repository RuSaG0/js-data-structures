<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import FriendGraphD3 from './examples/friend-graph-d3.vue'
</script>

<template>
  <app-section
    title="Граф"
    source="https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/graph"
    :examples="[
      {
        title: 'Социальная сеть',
        link: 'https://github.com/RuSaG0/js-data-structures/blob/master/src/structures/graph/examples/friend-graph-d3.vue',
      },
    ]"
  >
    <template #description>
      Граф — это структура данных, состоящая из узлов и рёбер, где каждый узел представляет объект,
      а рёбра — связи между этими объектами. Самый наглядный пример графа в разработке - это социальные сети, где узлы — это люди, а рёбра — их дружеские связи.
    </template>

    <template #pros> Когда нужна связь между элементами. В рамках frontend-разработки чаще всего применяется, когда нужна <b>визуализация данных</b>. </template>

    <template #cons>
      Одной из основных проблем графов является сложность алгоритмов обхода и поиска, особенно в
      больших и плотно связанных графах. Это может привести к значительному увеличению времени
      выполнения операций и потере производительности.
      <br />
      <b>Ключевые слова, чтобы углубиться в тему:</b> алгоритмы поиска в графах, обход графов, алгоритм Дейкстры.
    </template>

    <template #example1>
      <p>
        Рассмотрим пример, визуализации связей в социальной сетиЯ
      </p>
      <friend-graph-d3 />
    </template>
  </app-section>
</template>
