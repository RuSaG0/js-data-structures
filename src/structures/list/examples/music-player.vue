<template>
  <div class="music-player">
    <h2>Музыкальный плеер</h2>
    <div class="current-song">
      <p>Текущая песня: {{ currentSong ? currentSong.value.title : 'Нет песен' }}</p>
    </div>
    <audio ref="audioPlayer" @ended="nextSong" @timeupdate="updateProgress"></audio>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="controls">
      <button @click="prevSong" :disabled="!playlist.head" class="control-button prev-button">
        ←
      </button>
      <button @click="togglePlayPause" class="control-button play-pause-button">
        <span v-if="isPlaying">❚❚</span>
        <span v-else>▶</span>
      </button>
      <button @click="nextSong" :disabled="!playlist.head" class="control-button next-button">
        →
      </button>
    </div>
    <button @click="removeCurrentSong" :disabled="!currentSong" class="control-button remove-button">
      Удалить текущую песню
    </button>
    <div class="playlist">
      <h3>Плейлист</h3>
      <ul>
        <li
          v-for="(song, index) in songs"
          :key="index"
          :class="{ active: currentSong && song.title === currentSong.value.title }"
        >
          {{ song.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LinkedListNode, LinkedList } from '../LinkedList.ts';

const audioPlayer = ref<HTMLAudioElement | null>(null);
const playlist = ref(new LinkedList<{title: string, src: string}>());
const currentSong = ref<LinkedListNode<{title: string, src: string}> | null>(null);
const isPlaying = ref(false);
const progress = ref(0);

// Пример списка песен
const songs = ref([
  { title: "Песня 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Песня 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Песня 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
]);

onMounted(() => {
  songs.value.forEach(song => playlist.value.add(song));
  currentSong.value = playlist.value.current;
  if (audioPlayer.value && currentSong.value) {
    audioPlayer.value.src = currentSong.value.value.src;
  }
});

const togglePlayPause = () => {
  if (!audioPlayer.value) return;
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const updateProgress = () => {
  if (!audioPlayer.value) return;
  const { currentTime, duration } = audioPlayer.value;
  progress.value = (currentTime / duration) * 100;
};

const removeCurrentSong = () => {
  if (!currentSong.value) return;

  const currentSongTitle = currentSong.value.value.title;
  playlist.value.removeCurrent();
  songs.value = songs.value.filter(song => song.title !== currentSongTitle);

  if (playlist.value.current) {
    currentSong.value = playlist.value.current;
    if (audioPlayer.value) {
      audioPlayer.value.src = currentSong.value.value.src;
      if (isPlaying.value) {
        audioPlayer.value.play();
      }
    }
  } else {
    currentSong.value = null;
  }
};

const nextSong = () => {
  playlist.value.next();
  currentSong.value = playlist.value.current;
  if (audioPlayer.value && currentSong.value) {
    audioPlayer.value.src = currentSong.value.value.src;
    if (isPlaying.value) {
      audioPlayer.value.play();
    }
  }
};

const prevSong = () => {
  playlist.value.prev();
  currentSong.value = playlist.value.current;
  if (audioPlayer.value && currentSong.value) {
    audioPlayer.value.src = currentSong.value.value.src;
    if (isPlaying.value) {
      audioPlayer.value.play();
    }
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.music-player {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: $app-background;
  color: $color-black-text;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.current-song {
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: $color-secondary-button-disabled;
  border-radius: 5px;
  margin-bottom: 20px;
}

.progress-bar {
  height: 100%;
  background-color: $app-accent;
  border-radius: 5px;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.control-button {
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: $color-main-text;
}

.prev-button, .next-button {
  background-color: $color-secondary-button;
}

.prev-button:hover:not(:disabled), .next-button:hover:not(:disabled) {
  background-color: $color-secondary-button-hover;
}

.prev-button:disabled, .next-button:disabled {
  background-color: $color-secondary-button-disabled;
  cursor: not-allowed;
}

.play-pause-button {
  background-color: $color-primary-button;
}

.play-pause-button:hover:not(:disabled) {
  background-color: $color-primary-button-hover;
}

.remove-button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background-color: $color-accent;
  color: $color-main-text;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover:not(:disabled) {
  background-color: $color-black-text;
}

.remove-button:disabled {
  background-color: $color-secondary-button-disabled;
  cursor: not-allowed;
}

.playlist {
  margin-top: 20px;
}

.playlist ul {
  list-style-type: none;
  padding: 0;
}

.playlist li {
  padding: 8px;
  margin: 5px 0;
  background-color: $color-secondary-button-disabled;
  border-radius: 4px;
}

.playlist li.active {
  background-color: $app-accent;
  color: white;
}
</style>
