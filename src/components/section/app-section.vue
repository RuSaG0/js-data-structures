<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="section container">
    <section class="section__header">
      <h2 v-if="title" class="section__header__title">
        {{ title }}
      </h2>

      <p v-if="description" class="section__header__text">
        {{ description }}
      </p>
    </section>

    <section class="section__body">
      <slot></slot>
    </section>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;

.section {
  margin-bottom: 40px !important;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    @include tablet {
      gap: 8px;
    }

    &__title {
      margin-bottom: 20px;
      color: $color-black-text;
      font-size: 48px;
      font-weight: 500;
      line-height: 64px;
      text-align: left;

      @include tablet {
        text-align: center;
        font-size: 40px;
        font-weight: 400;
      }
    }

    &__text {
      color: $color-black-text;
      font-size: 20px;
      font-weight: 500;
      line-height: 35px;
      text-align: left;
      width: 460px;

      @include tablet {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
      }
    }
  }

  &__body {
    > :first-child {
      margin-top: 0 !important;
    }

    > :last-child {
      margin-bottom: 0 !important;
    }

    h2,
    h3,
    h4,
    h5 {
      margin: 1em 0;
    }

    p {
      margin: 1em 0;
    }
  }
}
</style>
