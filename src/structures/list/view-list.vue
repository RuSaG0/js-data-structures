<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import MusicPlayer from '@/structures/list/examples/music-player/music-player.vue'
import PaintCanvas from '@/structures/list/examples/paint/paint-canvas.vue'
</script>

<template>
  <app-section
    title="Связный список"
    source="https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/list"
    :examples="[
      {
        title: 'Музыкальный плеер',
        link: 'https://github.com/RuSaG0/js-data-structures/blob/master/src/structures/list/examples/music-player/music-player.vue',
      },
      {
        title: 'Графический редактор',
        link: 'https://github.com/RuSaG0/js-data-structures/blob/master/src/structures/list/examples/paint/paint-canvas.vue',
      },
    ]"
  >
    <template #description>
      <p>
        Связный список — это структура данных, состоящая из узлов, где каждый узел содержит данные и
        ссылку на следующий узел в последовательности. В контексте frontend-разработки связные
        списки могут быть использованы, например, для:
      </p>
      <ul>
        <li>
          реализации навигации в плеере, где связный список позволяет легко перемещаться между
          треками, добавлять и удалять их из плейлиста;
        </li>
        <li>
          редакторов, поддерживающего операции отмены и возврата действий (undo-redo), таких как
          текстовый редактор Word или графический редактор Figma, где связные списки помогают
          эффективно управлять историей изменений.
        </li>
      </ul>

      <div class="structure-img">
        <img src="/structures/list.svg" alt="" />
      </div>
    </template>

    <template #example1>
      <p>
        В этом примере песни хранятся в виде связного списка — удобно переключаться вперед и назад
        по плейлисту.
      </p>
      <music-player />
    </template>

    <template #example2>
      <p>
        В редакторе можно что-то нарисовать, отменить, вернуть отменённое назад — всё это с помощью
        списка.
      </p>
      <paint-canvas />
    </template>

    <template #pros>
      Преимущество связного списка заключается в том, что удаление элемента выполняется за
      <b>константное время O(1)</b>. В то время как в массиве для удаления элемента необходимо не
      только удалить сам элемент, но и сдвинуть все последующие элементы. В связном списке
      достаточно изменить ссылки prev и next у соответствующих нод.
    </template>

    <template #cons>
      <p>
        Если использовать двусвязный кольцевой список, то появляется проблема автоматической очистки
        сборщиком мусора. Алгоритм сборщика мусора может не понять, как удалить такой список,
        поскольку все элементы ссылаются друг на друга, создавая кольцевую зависимость.
      </p>
      <strong>Решение проблемы сборки мусора:</strong><br />
      Можно использовать слабые ссылки (
      <a target="_blank" href="https://learn.javascript.ru/weakref-finalizationregistry"
        >Weak References
      </a>
      ) — они позволяют сборщику мусора удалять объекты, на которые они указывают, даже если на эти
      объекты существуют другие слабые ссылки. Это помогает избежать утечек памяти, связанных с
      кольцевыми зависимостями.
    </template>
  </app-section>
</template>

<style scoped>
.structure-img {
  width: 100%;
  aspect-ratio: 1051 / 346;
}
</style>
