<template>
  <div class="movie-filters">
    <h2 class="filters-title">Filters:</h2>
    <div class="filters-container">
      <div v-for="(tags, category) in allTags" :key="category" class="filter-category">
        <div class="category-title">{{ category }}</div>
        <div class="tags-container">
          <button
            v-for="tag in tags"
            :key="tag"
            @click="toggleTag(category, tag)"
            :class="['tag-button', { 'selected': selectedTags[category].has(tag) }]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
    <h2 class="movies-title">Movies:</h2>
    <ul class="movies-list">
      <li
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movie-item"
      >
        <div class="movie-title">{{ movie.title }}</div>
        <div class="movie-tags">
          {{ movie.tags.map(([cat, val]) => `${val}`).join(', ') }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const movies = ref([
  {
    id: 1,
    title: 'Brother',
    tags: [['origin', 'Russian'], ['type', 'Movie']]
  },
  {
    id: 2,
    title: 'Leviathan',
    tags: [['origin', 'Russian'], ['type', 'Movie']]
  },
  {
    id: 3,
    title: 'Interstellar',
    tags: [['origin', 'Foreign'], ['type', 'Movie']]
  },
  {
    id: 4,
    title: 'Breaking Bad',
    tags: [['origin', 'Foreign'], ['type', 'Series']]
  },
  {
    id: 5,
    title: 'Going Vertical',
    tags: [['origin', 'Russian'], ['type', 'Movie']]
  },
  {
    id: 6,
    title: 'Silver Spoon',
    tags: [['origin', 'Russian'], ['type', 'Series']]
  }
])
const allTags = {
  origin: ['Russian', 'Foreign'],
  type: ['Movie', 'Series']
}
const selectedTags = ref({
  origin: new Set(),
  type: new Set()
})
function toggleTag(category, tag) {
  const set = selectedTags.value[category]
  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  selectedTags.value = {
    ...selectedTags.value,
    [category]: new Set(set)
  }
}
const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    return Object.entries(selectedTags.value).every(([category, tagSet]) => {
      if (tagSet.size === 0) return true
      return movie.tags.some(([cat, tag]) =>
        cat === category && tagSet.has(tag)
      )
    })
  })
})
</script>

<style lang="scss" scoped>
$primary-color: #3b82f6;
$secondary-color: #6b7280;
$background-color: #f9fafb;
$text-color: #1f2937;
$transition-time: 0.3s;

.movie-filters {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  .filters-title, .movies-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: $text-color;
  }

  .filters-container {
    margin-bottom: 1.5rem;

    .filter-category {
      margin-bottom: 1rem;

      .category-title {
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
        color: $text-color;
      }

      .tags-container {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        .tag-button {
          padding: 0.5rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid #d1d5db;
          background-color: $background-color;
          color: $secondary-color;
          transition: all $transition-time ease;
          cursor: pointer;

          &.selected {
            background-color: $primary-color;
            color: white;
            border-color: $primary-color;
          }

          &:hover:not(.selected) {
            background-color: darken($background-color, 5%);
          }
        }
      }
    }
  }

  .movies-list {
    .movie-item {
      margin-bottom: 0.75rem;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transition: box-shadow $transition-time ease;

      &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .movie-title {
        font-weight: 500;
        color: $text-color;
      }

      .movie-tags {
        font-size: 0.875rem;
        color: $secondary-color;
      }
    }
  }
}
</style>
