<script setup lang="ts">
defineProps({
  hasBreadcrumbs: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: '',
  },
  examples: {
    type: Array<{ title: string; link: string }>,
    default: [],
  },
})
</script>

<template>
  <section class="section">
    <section class="section__header">
      <!--      <div v-if="hasBreadcrumbs" class="section__header__breadcrumbs">-->
      <!--        <router-link :to="ERoutes.Main">Главная</router-link>-->
      <!--        <span>/</span>-->
      <!--        <span>{{ title }}</span>-->
      <!--      </div>-->

      <h2 v-if="title" class="section__header__title">
        {{ title }}

        <a v-if="source" class="section__header__source" :href="source" target="_blank">
          <img src="@/assets/icons/github-mark.svg" alt="" />Исходный код страницы
        </a>
      </h2>

      <div v-if="$slots.description" class="section__header__description">
        <slot name="description" />
      </div>
    </section>

    <section class="section__body">
      <div v-if="$slots.pros" class="section__body__pros">
        <h3 class="section__body__pros__title">Когда использовать?</h3>

        <div class="section__body__pros__text">
          <slot name="pros" />
        </div>
      </div>

      <div v-if="$slots.cons" class="section__body__cons">
        <h3 class="section__body__cons__title">Недостатки</h3>

        <div class="section__body__cons__text">
          <slot name="cons" />
        </div>
      </div>

      <div class="section__body__examples">
        <div v-if="$slots.example1" class="section__body__example">
          <h3 v-if="examples[0]" class="section__body__example__title">
            <span>#1. {{ examples[0].title }}</span>

            <a
              v-if="examples[0].link"
              class="section__body__example__source"
              :href="examples[0].link"
              target="_blank"
            >
              <img src="@/assets/icons/github-mark.svg" alt="" />Исходный код примера
            </a>
          </h3>

          <slot name="example1" />
        </div>

        <div v-if="$slots.example2" class="section__body__example">
          <h3 v-if="examples[1]" class="section__body__example__title">
            <span>#2. {{ examples[1].title }}</span>

            <a
              v-if="examples[1].link"
              class="section__body__example__source"
              :href="examples[1].link"
              target="_blank"
            >
              <img src="@/assets/icons/github-mark.svg" alt="" />Исходный код примера
            </a>
          </h3>

          <slot name="example2" />
        </div>
      </div>

      <div class="section__body__text">
        <slot />
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;

.section {
  & + & {
    margin-top: 40px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    margin-bottom: 20px;

    @include tablet {
      gap: 16px;
    }

    &__breadcrumbs {
      display: none;
      align-items: center;
      gap: 4px;

      @include mobile {
        display: flex;
      }

      > * {
        text-decoration: none;
      }
    }

    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      color: $color-black-text;
      font-size: 32px;
      font-weight: 600;
      line-height: 1.2;
      text-align: left;

      @include tablet {
        font-size: 28px;
      }

      @include mobile {
        font-size: 24px;
      }
    }

    &__source {
      flex-shrink: 0;
      white-space: nowrap;
      font-size: 18px;
      font-weight: 400;

      @include mobile {
        font-size: 14px;
      }

      img {
        display: inline-block;
        width: 1em;
        height: 1em;
        margin-right: 4px;
        margin-bottom: -2px;
      }
    }

    &__description {
      width: 100%;
      color: $color-black-text;
      padding: 10px;
      border: 2px solid $app-background;

      > :first-child {
        margin-top: 0 !important;
      }

      > :last-child {
        margin-bottom: 0 !important;
      }
    }
  }

  &__body {
    &__examples {
      margin-top: 40px;

      h3 {
        font-style: italic;
      }
    }

    &__example {
      & + & {
        margin-top: 40px;
      }

      &__title {
        margin: 0 0 6px !important;
        font-style: normal !important;

        span {
          font-style: italic;
        }
      }

      &__source {
        margin-left: 8px;
        white-space: nowrap;
        font-weight: 400;
        font-size: 18px;

        @include mobile {
          font-size: 14px;
        }

        img {
          display: inline-block;
          width: 1em;
          height: 1em;
          margin-right: 4px;
          margin-bottom: -2px;
        }
      }

      p {
        margin: 0 0 6px !important;
      }
    }

    &__text {
      :deep(> :first-child) {
        margin-top: 0 !important;
      }

      :deep(> :last-child) {
        margin-bottom: 0 !important;
      }
    }

    &__pros {
      color: $color-black-text;
      background-color: $app-background;
      border-left: 4px solid #3bcf7a;
      padding: 10px;

      &__title {
        margin: 0 0 6px !important;
      }
    }

    &__cons {
      color: $color-black-text;
      background-color: $app-background;
      border-left: 4px solid #ffa397;
      padding: 10px;

      &__title {
        margin: 0 0 6px !important;
      }

      &__text {
        > :first-child {
          margin-top: 0 !important;
        }

        > :last-child {
          margin-bottom: 0 !important;
        }
      }
    }

    > :first-child {
      margin-top: 0 !important;
    }

    > :last-child {
      margin-bottom: 0 !important;
    }

    > * {
      margin-bottom: 20px;
    }

    h2,
    h3,
    h4,
    h5 {
      margin: 1em 0 0.8em;
    }

    p {
      margin: 1em 0;
    }
  }
}
</style>
