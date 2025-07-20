<script setup lang="ts">
import { ref } from 'vue'
import AppSection from '@/components/section/app-section.vue'
import PostWithComments from './examples/nested-comments/post-with-comments.vue'
import { type Comment } from './examples/nested-comments/types.ts'
import FileStructure from '@/structures/tree/examples/file-structure/file-structure.vue'

const post = ref({
  text: 'Это пример поста для демонстрации вложенных комментариев.',
})

const comments = ref<Comment[]>([
  {
    id: 1,
    text: 'Первый комментарий',
    owner: { first_name: 'Иван', avatar_url: '' },
    parentId: null,
  },
  {
    id: 2,
    text: 'Ответ на первый комментарий',
    owner: { first_name: 'Мария', avatar_url: '' },
    parentId: 1,
  },
  {
    id: 3,
    text: 'Второй комментарий',
    owner: { first_name: 'Алексей', avatar_url: '' },
    parentId: null,
  },
  {
    id: 4,
    text: 'Ответ на второй комментарий',
    owner: { first_name: 'Ольга', avatar_url: '' },
    parentId: 3,
  },
])
</script>

<template>
  <app-section
    title="Дерево"
    source="https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/tree"
  >
    <template #description>
      Дерево — это структура данных, состоящая из узлов, где каждый узел имеет значение и список
      ссылок на дочерние узлы. В frontend-разработке деревья могут быть использованы для
      представления вложенных комментариев к посту.
    </template>

    <template #pros>
      Когда иерархическая структура дерево и нужны связи потомок/родитель.
    </template>

    <template #cons>
      Одной из основных проблем деревьев является их балансировка. Несбалансированные деревья могут
      привести к значительному снижению производительности при выполнении операций поиска, вставки и
      удаления.
      <br />
      <b>Ключевые слова:</b> вращение деревьев, балансировка деревьев, AVL-дерево.
    </template>

    <template #example1>
      <p>
        Блог, где пользователи могут оставлять комментарии к постам, а также отвечать на комментарии
        других пользователей. Дерево может быть использовано для представления этой иерархии
        комментариев.
      </p>
      <div class="explanation">
        <h3>Как работают комментарии?</h3>
        <p>
          Сначала с сервера приходит плоский список комментариев. На стороне клиента мы преобразуем
          этот список в дерево, чтобы отобразить вложенные комментарии. Это позволяет нам
          использовать рекурсивный подход для отображения иерархии комментариев.
        </p>
        <p>
          Компонент комментария вызывает сам себя для отображения вложенных ответов, что создает
          рекурсивную структуру. Это позволяет нам легко и эффективно отображать комментарии любой
          глубины вложенности.
        </p>
      </div>

      <PostWithComments :post="post" :comments="comments" />
    </template>

    <template #example2>
      <p>
        <b>Доступ к удаленному серверу.</b> <br />
        Реализация файловой структуры, где есть папки и файлы. Папки можно раскрывать и сворачивать.
        Файлы отображаются внутри папок, и вы можете видеть их размеры. В дальнейшем можно добавить
        функциональность просмотра текстового файла, а также его модификацию.
      </p>

      <FileStructure />
    </template>
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
