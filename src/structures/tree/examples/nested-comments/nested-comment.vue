<script setup lang="ts">
import { type Comment } from './types.ts'

defineProps<{
  comment: Comment
}>()

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase()
}
</script>

<template>
  <div class="nested-comment-wrapper">
    <div class="nested-comment">
      <div class="nested-comment__avatar">
        <img v-if="comment.owner.avatar_url" :src="comment.owner.avatar_url" alt="Аватарка" />
        <div v-else class="nested-comment__avatar-fake">
          {{ getInitials(comment.owner.first_name) }}
        </div>
      </div>
      <div class="nested-comment__info">
        <div class="nested-comment__info__name">{{ comment.owner.first_name }}</div>
        <div class="nested-comment__info__text">{{ comment.text }}</div>
      </div>
    </div>
    <div v-if="comment.children" class="nested-comment-next">
      <nested-comment v-for="child in comment.children" :key="child.id" :comment="child" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;

.nested-comment-wrapper {
  margin: 0.5rem 0.5rem 0.5rem 1.5rem;
}

.nested-comment {
  display: flex;

  &__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;

    &-fake {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: $color-secondary-button;
      color: $color-main-text;
      font-weight: 700;
      font-size: 16px;
      border-radius: 50%;
    }
  }

  &__info {
    width: 100%;
    margin-left: 8px;
    background: $color-text-input-background;
    border-radius: 10px;
    padding: 10px 14px;
    color: $color-black-text;

    &__name {
      padding-bottom: 6px;
      font-weight: bold;
      color: $color-black-text;
    }
  }
}

.nested-comment-next {
  width: 100%;
}
</style>
