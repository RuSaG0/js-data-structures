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
      а рёбра — связи между этими объектами. В frontend-разработке графы могут быть использованы для
      представления социальных сетей, где узлы — это люди, а рёбра — их дружеские связи.
    </template>

    <template #pros> Когда нужна визуализация данных </template>

    <template #cons>
      Одной из основных проблем графов является сложность алгоритмов обхода и поиска, особенно в
      больших и плотно связанных графах. Это может привести к значительному увеличению времени
      выполнения операций.
      <br />
      <b>Ключевые слова:</b> алгоритмы поиска в графах, обход графов, алгоритм Дейкстры.
    </template>

    <template #example1>
      <p>
        Социальная сеть, где пользователи могут добавлять друзей. Граф может быть использован для
        представления этих связей, показывая, кто с кем дружит.
      </p>
      <friend-graph-d3 />
    </template>
  </app-section>
</template>
