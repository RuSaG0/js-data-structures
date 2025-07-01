<template>
  <div class="post">
    <div class="post-content">
      <p>{{ post.text }}</p>
    </div>
    <div class="comments">
      <nested-comment
        v-for="comment in commentsTree?.children"
        :key="comment.id"
        :comment="comment"
        :lvlNested="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NestedComment from './nested-comment.vue';
import { convert } from './treeUtils';
import { Comment } from './types';

interface Post {
  text: string;
}

interface Props {
  post: Post;
  comments: Comment[];
}

const props = defineProps<Props>();

const commentsTree = computed(() => {
  return convert(props.comments);
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.post {
  padding: 1rem;
  background: $app-background;
  border-radius: 1rem;
  margin: 1rem;
  color: $color-black-text;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .post-content {
    margin-bottom: 1rem;
    padding: 1rem;
    background: $color-text-input-background;
    border-radius: 0.5rem;
  }

  .comments {
    margin-top: 1rem;
  }
}
</style>
