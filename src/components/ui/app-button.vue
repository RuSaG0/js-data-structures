<script setup lang="ts">
import type { PropType } from 'vue'
import { ButtonColors, ButtonTypes } from '@/constants/button.ts'

defineProps({
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '',
  },
  color: {
    type: String as PropType<ButtonColors>,
    default: ButtonColors.Primary,
  },
  type: {
    type: String as PropType<ButtonTypes>,
    default: ButtonTypes.Button,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const onButtonClick = () => {
  emit('click')
}
</script>

<template>
  <router-link v-if="type === ButtonTypes.Link" :to="href" :class="['btn', color]">
    <span>{{ text }}</span>
  </router-link>
  <button v-else :class="['btn', color]" :disabled="disabled" @click="onButtonClick">
    <span class="btn-span"> <slot name="icon" /> {{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/breakpoints' as *;

.btn {
  display: inline-block;
  min-width: 140px;
  margin: 0;
  border: 0;
  border-radius: 33px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
  padding: 16px 32px;
  color: rgb(29, 29, 29);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;

  @include tablet {
    width: 100%;
    min-width: 100%;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
  }
}

/* Цвет кнопки */

.btn-primary {
  color: $color-main-text;
  background: $color-primary-button-hover;

  &:hover {
    color: $color-black-text;
    background: #aee3ec;
  }

  &:active {
    color: $color-black-text;
    background: #9acad2;
  }

  &[disabled] {
    color: $color-black-text;
    background: #c1c1c1;
    cursor: not-allowed;
  }
}

.btn-secondary {
  color: $color-black-text;
  background: $color-primary-button;

  &:hover {
    color: $color-main-text;
    background: $color-primary-button-hover;
  }

  &:active {
    color: $color-main-text;
    background: #000000;
  }
}
</style>
