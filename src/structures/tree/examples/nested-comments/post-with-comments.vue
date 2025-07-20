<script setup lang="ts">
import { computed } from 'vue'
import NestedComment from './nested-comment.vue'
import { type Comment, type Post } from './types.ts'

const props = defineProps<{
  post: Post
  comments: Comment[]
}>()

const commentsTree = computed(() => {
  return convert(props.comments)
})

function convert(flat: Comment[]) {
  const temp: Record<Comment['id'], Comment> = {}
  const roots = []
  const pendingChildOf: Record<string, Comment[]> = {}
  let nested: { children?: Comment[] } | null
  let flatEl: Comment

  for (let i = 0; i < flat.length; i++) {
    flatEl = flat[i]
    temp[flatEl.id] = flatEl

    if (!flatEl.parentId) {
      roots.push(flatEl)
    } else {
      if (temp[flatEl.parentId]) {
        temp[flatEl.parentId].children ??= []
        temp[flatEl.parentId].children?.push(flatEl)
      } else {
        pendingChildOf[flatEl.parentId] ??= []
        pendingChildOf[flatEl.parentId].push(flatEl)
      }

      flatEl.parentId = null
    }

    if (pendingChildOf[flatEl.id]) {
      flatEl.children ??= []

      while (pendingChildOf[flatEl.id].length-- > 0) {
        flatEl.children.push(pendingChildOf[flatEl.id].shift()!)
      }
    }
  }

  if (roots.length >= 1) {
    nested = {}
    nested.children = roots
  } else {
    nested = null
  }

  return nested
}
</script>

<template>
  <div class="post">
    <div class="post__content">
      {{ post.text }}
    </div>
    <div class="post__comments">
      <nested-comment
        v-for="comment in commentsTree?.children"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.post {
  padding: 10px 0;
  background: $app-background;
  color: $color-black-text;

  &__content {
    margin: 0 10px;
    padding: 10px;
    background: $color-text-input-background;
    border-radius: 10px;
  }

  &__comments {
    margin-top: 20px;
  }
}
</style>
