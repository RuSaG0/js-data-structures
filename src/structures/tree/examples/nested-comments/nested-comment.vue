<template>
  <div class="nested__comment__data">
    <div class="nested__comment">
      <div class="u__img__avatar">
        <img :src="comment.owner.avatar_url" alt="Avatar" v-if="comment.owner.avatar_url">
        <div class="fake-avatar" v-else>{{ getInitials(comment.owner.first_name) }}</div>
      </div>
      <div class="info__comment">
        <div class="u__nested__comment">
          <div class="u__name">
            <span class="name">{{ comment.owner.first_name }}</span>
          </div>
          <div class="u__nested__comment__desc">
            <span class="desc">
              {{ comment.text }}
            </span>
          </div>
          <div class="answer__nested__comment">
            <button class="answer">
              Ответить
            </button>
          </div>
        </div>
      </div>
    </div>
    <template v-if="comment.children">
      <div class="next__nested__comment">
        <nested-comment
          v-for="child in comment.children"
          :key="child.id"
          :comment="child"
          :lvl-nested="lvlNested + 1"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Comment } from './types.ts';

interface Props {
  comment: Comment;
  lvlNested: number;
}

const props = defineProps<Props>();

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase();
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;


.nested__comment__data {
  margin: 0.5rem 0.5rem 0.5rem 1.5rem;

  .u__img__avatar {
    & img, & .fake-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .fake-avatar {
      background: $color-secondary-button;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-main-text;
      font-weight: bold;
    }
  }

  .nested__comment {
    display: flex;

    .info__comment {
      width: 100%;
      margin-left: 0.5rem;
      background: $color-text-input-background;
      border-radius: 1rem;
      padding: 1rem;
      color: $color-black-text;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .u__nested__comment {
        .u__name {
          padding-bottom: 1rem;
          font-weight: bold;
          color: $color-black-text
        }

        .u__nested__comment__desc {
          padding-bottom: 1rem;
        }

        .answer__nested__comment {
          .answer {
            margin: 0.3rem;
            padding: 0.5rem;
            border: none;
            border-radius: 0.3rem;
            font-weight: 600;
            background: $color-secondary-button;
            color: $color-main-text;

            &:hover {
              background: $color-secondary-button-hover;
            }
          }
        }
      }
    }
  }

  .next__nested__comment {
    width: 110%;
  }
}
</style>
