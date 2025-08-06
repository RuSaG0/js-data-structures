<script setup lang="ts">
import { ref, computed } from 'vue'
const movies = ref([
  {
    id: 1,
    title: 'Брат',
    tags: [
      ['origin', 'Российские'],
      ['type', 'Фильмы'],
    ],
  },
  {
    id: 2,
    title: 'Интерстеллар',
    tags: [
      ['origin', 'Зарубежные'],
      ['type', 'Фильмы'],
    ],
  },
  {
    id: 3,
    title: 'Во все тяжкие',
    tags: [
      ['origin', 'Зарубежные'],
      ['type', 'Сериалы'],
    ],
  },
  {
    id: 4,
    title: 'Мажор',
    tags: [
      ['origin', 'Российские'],
      ['type', 'Сериалы'],
    ],
  },
])

const allTags = {
  origin: ['Российские', 'Зарубежные'],
  type: ['Фильмы', 'Сериалы'],
}

const selectedTags = ref<Record<string, Set<string>>>({
  origin: new Set(),
  type: new Set(),
})

function toggleTag(category: string, tag: string) {
  const set = selectedTags.value[category]
  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  selectedTags.value = {
    ...selectedTags.value,
    [category]: new Set(set),
  }
}

const filteredMovies = computed(() => {
  return movies.value.filter((movie) => {
    const movieTags = Object.fromEntries(movie.tags);

    return Object.entries(selectedTags.value).every(([category, tagSet]) => {
      if (tagSet.size === 0) return true;
      return tagSet.has(movieTags[category]);
    });
  });
});
</script>

<template>
  <div class="movie-filters">
    <div class="filters">
      <div v-for="(tags, category) in allTags" :key="category" class="filters__category">
        <div class="filters__category__title">
          <span v-if="category === 'origin'">Страна</span>
          <span v-if="category === 'type'">Категория</span>
        </div>
        <div class="filters__category__tags">
          <button
            v-for="tag in tags"
            :key="tag"
            @click="toggleTag(category, tag)"
            :class="['filters__category__tag', tag, { selected: selectedTags[category].has(tag) }]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <ul class="movies-list">
      <li v-for="movie in filteredMovies" :key="movie.id" class="movies-list__item">
        <div class="movies-list__item__poster">
          <img v-if="movie.id === 1" src="/posters/1.jpg" alt="" />
          <img v-if="movie.id === 2" src="/posters/2.jpg" alt="" />
          <img v-if="movie.id === 3" src="/posters/3.jpg" alt="" />
          <img v-if="movie.id === 4" src="/posters/4.jpg" alt="" />
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
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/breakpoints' as *;

$color-russian: #2962ff;
$color-foreign: #ff6d00;
$color-movie: #00c853;
$color-series: #d500f9;

.movie-filters {
  margin-top: 20px;
}

.filters {
  margin-bottom: 20px;

  &__category {
    margin-bottom: 10px;

    &__title {
      font-weight: 600;
      margin-bottom: 5px;
      text-transform: capitalize;
      color: $color-black-text;
    }

    &__tags {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }

    &__tag {
      padding: 5px 10px;
      border: 1px solid #ccc;
      background-color: $color-main-text;
      cursor: pointer;

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

      &.selected,
      &:hover {
        color: $color-main-text;

        &.Российские {
          background-color: $color-russian;
        }

        &.Зарубежные {
          background-color: $color-foreign;
        }

        &.Фильмы {
          background-color: $color-movie;
        }

        &.Сериалы {
          background-color: $color-series;
        }
      }
    }
  }
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
