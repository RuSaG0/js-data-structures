<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import FilmsList from '@/structures/array/examples/films-list.vue'
</script>

<template>
  <app-section
    title="Массив"
    source="https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/array"
  >
    <template #description>
      Массив — это одна из самых распространённых структур данных в программировании. Они используются для хранения коллекции элементов.
    </template>

    <template #example1>
      <p>
        Список фильмов
      </p>
      <films-list />
    </template>

    <div class="explanation">
      <h3>Важный момент</h3>
      <p>
        На самом деле есть 2 похожие на себя структуры данных: массив (или статический массив) и вектор (динамический массив).
      </p>
      <p>
        Записи в виде <code>const arr = []; </code> или <code> const arr = new Array() </code> на самом деле являются векторами. Массивом же является, например, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array" target="_blank">BigInt64Array</a>
      </p>
    </div>
  </app-section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
.explanation {
  background-color: $app-background;
  border-left: 4px solid #2b95d6;
  padding: 10px 15px;
  margin: 15px 0;

  h3 {
    margin-top: 0;
    color: $color-black-text;
    font-style: normal;
  }

  p,
  ul {
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }
}
</style>
