<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import Tags from '@/structures/set/examples/tags.vue'
import MusicPlayer from '@/structures/list/examples/music-player.vue'
</script>

<template>
  <app-section title="Множество">
    <template #description> Описание </template>

    <template #example1>
      <p>Описание примера</p>

      <tags />
    </template>

    <template #pros>
      Киллер-фича: Доступ О1, поиск О1. Использовать когда нужно часто смотреть есть ли какой-то
      элемент в структуре
    </template>

    <template #cons>-</template>
  </app-section>
</template>
