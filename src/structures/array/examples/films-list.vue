<script setup lang="ts">
import { ref, computed } from 'vue'
const movies = ref([
  {
    id: 1,
    title: 'Брат',
  },
  {
    id: 2,
    title: 'Интерстеллар',
  },
  {
    id: 3,
    title: 'Во все тяжкие',
  },
  {
    id: 4,
    title: 'Мажор',
  },
])
</script>

<template>
  <div class="movie">
    <ul class="movies-list">
      <li v-for="movie in movies" :key="movie.id" class="movies-list__item">
        <div class="movies-list__item__poster">
          <img v-if="movie.id === 1" src="/posters/1.jpg" alt="" />
          <img v-if="movie.id === 2" src="/posters/2.jpg" alt="" />
          <img v-if="movie.id === 3" src="/posters/3.jpg" alt="" />
          <img v-if="movie.id === 4" src="/posters/4.jpg" alt="" />
        </div>
        <div class="movies-list__item__title">{{ movie.title }}</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/breakpoints' as *;

.movie {
  margin-top: 20px;
}

.movies-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

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
  }
}
</style>
