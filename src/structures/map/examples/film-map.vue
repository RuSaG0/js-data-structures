<script setup lang="ts">
import { ref } from 'vue'
const movie = ref(
  {
    id: 1,
    title: 'Брат',
    imgSrc: './posters/1.jpg',
    tags: [
      ['origin', 'Российские'],
      ['type', 'Фильмы'],
    ],
  }
)
</script>

<template>
    <div class="movies-list__item">
      <div class="movies-list__item__poster">
        <img :src="movie.imgSrc" alt="" />
      </div>
      <div class="movies-list__item__title">{{ movie.title }}</div>
      <div class="movies-list__item__tags">
        <span
          v-for="tag in movie.tags.map(([_, val]) => val)"
          :key="tag"
          class="movies-list__item__tag"
          :class="tag"
        >{{ tag }}
        </span>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/breakpoints' as *;

$color-russian: #2962ff;
$color-foreign: #ff6d00;
$color-movie: #00c853;
$color-series: #d500f9;

.movies-list {
  &__item {
    padding: 10px;
    border: 1px solid #ccc;
    transition: box-shadow 0.3s ease;

    &__poster {
      width: 100%;
      aspect-ratio: 3 / 4;
      margin-bottom: 10px;
      border: 1px solid #ccc;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__title {
      font-size: 20px;
      font-weight: 500;
      color: $color-black-text;
      word-break: break-word;

      @include tablet {
        font-size: 14px;
      }
    }

    &__tag {
      @include tablet {
        font-size: 12px;
      }

      &.Российские {
        color: $color-russian;
      }

      &.Зарубежные {
        color: $color-foreign;
      }

      &.Фильмы {
        color: $color-movie;
      }

      &.Сериалы {
        color: $color-series;
      }

      &:not(:last-child)::after {
        color: $color-black-text;
        content: ', ';
      }
    }
  }
}
</style>
