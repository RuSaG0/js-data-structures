<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LinkedListNode, DoublyLinkedList } from './types.ts'

const audioPlayer = ref<HTMLAudioElement | null>(null)
const playlist = ref(new DoublyLinkedList<{ title: string; src: string }>())
const currentSong = ref<LinkedListNode<{ title: string; src: string }> | null>(null)
const isPlaying = ref<boolean>(false)
const progress = ref<number>(0)

// Пример списка песен
const songs = ref([
  { title: '🦄 Песня 1', src: './music/SoundHelix-Song-1.mp3' },
  { title: '🤑 Песня 2', src: './music/SoundHelix-Song-2.mp3' },
  { title: '🤖 Песня 3', src: './music/SoundHelix-Song-3.mp3' },
])

onMounted(() => {
  songs.value.forEach((song) => playlist.value.add(song))
  currentSong.value = playlist.value.current

  if (audioPlayer.value && currentSong.value) {
    audioPlayer.value.src = currentSong.value.value.src
    audioPlayer.value.volume = 0.1
  }
})

const togglePlayPause = () => {
  if (!audioPlayer.value) return
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (!audioPlayer.value) return
  const { currentTime, duration } = audioPlayer.value
  progress.value = (currentTime / duration) * 100
}

const removeCurrentSong = () => {
  if (!currentSong.value) return

  const currentSongTitle = currentSong.value.value.title
  playlist.value.removeCurrent()
  songs.value = songs.value.filter((song) => song.title !== currentSongTitle)

  if (playlist.value.current) {
    currentSong.value = playlist.value.current
    if (audioPlayer.value) {
      audioPlayer.value.src = currentSong.value.value.src
      if (isPlaying.value) {
        audioPlayer.value.play()
      }
    }
  } else {
    currentSong.value = null
    if (audioPlayer.value) {
      audioPlayer.value.pause()
      audioPlayer.value.src = ''
      isPlaying.value = false
    }
  }
}

const nextSong = () => {
  playlist.value.next()
  currentSong.value = playlist.value.current
  if (audioPlayer.value && currentSong.value) {
    audioPlayer.value.src = currentSong.value.value.src
    if (isPlaying.value) {
      audioPlayer.value.play()
    }
  }
}

const prevSong = () => {
  playlist.value.prev()
  currentSong.value = playlist.value.current
  if (audioPlayer.value && currentSong.value) {
    audioPlayer.value.src = currentSong.value.value.src
    if (isPlaying.value) {
      audioPlayer.value.play()
    }
  }
}

const handleProgressClick = (event: MouseEvent) => {
  if (!audioPlayer.value || !audioPlayer.value.duration) return

  const progressBar = event.currentTarget as HTMLElement
  const clickPosition = event.clientX - progressBar.getBoundingClientRect().left
  const progressBarWidth = progressBar.clientWidth
  const clickRatio = clickPosition / progressBarWidth

  audioPlayer.value.currentTime = clickRatio * audioPlayer.value.duration
}
</script>

<template>
  <div class="music-player">
    <div class="music-player__playlist">
      <div v-if="!songs.length" class="music-player__playlist__empty">Плейлист пуст</div>

      <div
        v-for="(song, index) in songs"
        class="music-player__playlist__item"
        :key="index"
        :class="{ active: currentSong && song.title === currentSong.value.title }"
      >
        {{ song.title }}
      </div>
    </div>

    <div class="music-player__progress" @click="handleProgressClick">
      <div class="music-player__progress__bar" :style="{ width: progress + '%' }" />

      <audio ref="audioPlayer" @ended="nextSong" @timeupdate="updateProgress" />
    </div>

    <div class="music-player__navigation">
      <div class="music-player__controls">
        <button class="music-player__control prev" @click="prevSong" :disabled="!playlist.head">
          ←
        </button>

        <button class="music-player__control play" @click="togglePlayPause">
          <span v-if="isPlaying">❚❚</span>
          <span v-else>▶</span>
        </button>

        <button class="music-player__control next" @click="nextSong" :disabled="!playlist.head">
          →
        </button>
      </div>

      <div class="music-player__current-song">
        {{ currentSong ? currentSong.value.title : 'Нет песен' }}
      </div>

      <button class="music-player__delete" @click="removeCurrentSong" :disabled="!currentSong">
        Удалить текущую песню
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/breakpoints' as *;

.music-player {
  padding: 20px;
  background-color: $app-background;
  color: $color-black-text;

  @include mobile {
    padding: 10px;
  }

  &__playlist {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__item {
      padding: 4px;
      border: 1px solid #000;
    }
  }

  &__progress {
    cursor: pointer;
    height: 10px;
    margin: 10px 0;
    border: 1px solid #000;

    &__bar {
      height: 10px;
      background: #000;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;

    @include mobile {
      flex-wrap: wrap;
    }
  }

  &__controls {
    display: flex;
    gap: 6px;

    @include mobile-sm {
      margin: 0 auto;
    }

    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border: 1px solid #000;
      background: $color-primary-button;

      &:hover {
        background: $color-primary-button-hover;
        color: $color-main-text;
      }
    }
  }

  &__current-song {
    flex-grow: 1;
    display: flex;
    align-items: center;
    height: 38px;
    margin: 0 10px;
    padding: 4px;
    border: 1px solid #000;

    @include mobile {
      width: 100%;
      order: -1;
      margin: 0 0 10px 0;
    }
  }

  &__delete {
    cursor: pointer;
    height: 38px;
    margin-left: auto;
    padding: 4px 10px;
    background: $color-accent;
    border: 1px solid #000;
    color: $color-main-text;

    &:hover {
      background: $color-main-text;
      color: $color-accent;
    }

    @include mobile {
      margin-left: 10px;
    }

    @include mobile-sm {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>
