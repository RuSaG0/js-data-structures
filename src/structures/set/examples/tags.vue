<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">Filters:</h2>

    <div class="mb-4 space-y-3">
      <div v-for="(tags, category) in allTags" :key="category">
        <div class="font-semibold mb-1">{{ category }}</div>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="tag in tags"
            :key="tag"
            @click="toggleTag(category, tag)"
            :class="[
              'px-3 py-1 rounded-full border',
              selectedTags[category].has(tag)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <h2 class="text-lg font-semibold mb-2">Movies:</h2>
    <ul>
      <li
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="mb-2 p-2 border rounded shadow-sm"
      >
        <div class="font-medium">{{ movie.title }}</div>
        <div class="text-sm text-gray-600">
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

<style scoped>
button {
  transition: background 0.3s;
}
</style>
