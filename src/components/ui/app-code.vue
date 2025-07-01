<script setup lang="ts">
import { computed } from 'vue'
import { Codemirror } from 'vue-codemirror'

const props = defineProps({
  code: String,
})

const emit = defineEmits(['update:code'])

const localCode = computed({
  get() {
    return props.code
  },
  set(value: string) {
    emit('update:code', value)
  },
})
</script>

<template>
  <section class="code">
    <codemirror
      v-model="localCode"
      placeholder="Code goes here..."
      :indent-with-tab="true"
      :tab-size="2"
    />
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;

.code {
  margin: 20px auto;
}
</style>
