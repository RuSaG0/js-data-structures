<template>
  <app-app-section title="Дерево">
    <p>
      Дерево — это структура данных, состоящая из узлов, где каждый узел имеет значение и список
      ссылок на дочерние узлы. В frontend-разработке деревья могут быть использованы для
      представления вложенных комментариев к посту.
    </p>
    <app-code :code="code" />
    <p>
      Представьте себе блог, где пользователи могут оставлять комментарии к постам, а также отвечать
      на комментарии других пользователей. Дерево может быть использовано для представления этой
      иерархии комментариев.
    </p>
    <div class="explanation">
      <h3>Как работают комментарии?</h3>
      <p>
        Сначала с сервера приходит плоский список комментариев. На стороне клиента мы преобразуем этот список в дерево,
        чтобы отобразить вложенные комментарии. Это позволяет нам использовать рекурсивный подход для отображения
        иерархии комментариев.
      </p>
      <p>
        Компонент комментария вызывает сам себя для отображения вложенных ответов, что создает рекурсивную
        структуру. Это позволяет нам легко и эффективно отображать комментарии любой глубины вложенности.
      </p>
    </div>

    <Post :post="post" :comments="comments" />
    <FileStructure />
    <h2>Проблемы деревьев</h2>
    <p>
      Одной из основных проблем деревьев является их балансировка. Несбалансированные деревья могут
      привести к значительному снижению производительности при выполнении операций поиска, вставки и
      удаления. Ключевые слова: вращение деревьев, балансировка деревьев, AVL-дерево
    </p>
  </app-app-section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppCode from '@/components/ui/app-code.vue';
import AppAppSection from '@/components/section/app-section.vue';
import Post from './examples/nested-comments/post.vue';
import { type Comment } from './examples/nested-comments/types.ts';
import FileStructure from '@/structures/tree/examples/file-structure/file-structure.vue'

const code = ref(`console.log('Hello, world!')`);

const post = ref({
  text: 'Это пример поста для демонстрации вложенных комментариев.'
});

const comments = ref<Comment[]>([
  { id: 1, text: 'Первый комментарий', owner: { first_name: 'Иван', avatar_url: '' }, parent: null },
  { id: 2, text: 'Ответ на первый комментарий', owner: { first_name: 'Мария', avatar_url: '' }, parent: 1 },
  { id: 3, text: 'Второй комментарий', owner: { first_name: 'Алексей', avatar_url: '' }, parent: null },
  { id: 4, text: 'Ответ на второй комментарий', owner: { first_name: 'Ольга', avatar_url: '' }, parent: 3 },
]);
</script>

<style scoped>
.explanation {
  background-color: #f8f8f8;
  border-left: 4px solid #aed47c;
  padding: 10px 15px;
  margin: 15px 0;
}

.explanation h3 {
  margin-top: 0;
  color: #2d2f33;
}

.explanation p, .explanation ul {
  margin-bottom: 10px;
}

.explanation ul {
  padding-left: 20px;
}

.explanation li {
  margin-bottom: 5px;
}
</style>
