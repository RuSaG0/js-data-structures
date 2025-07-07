<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import ModalFlowCase from '@/structures/stack/examples/modal-flow-case.vue'
import TextEditorCase from '@/structures/stack/examples/text-editor-case.vue'
</script>

<template>
  <app-section title="Стек">
    <template #description> Описание </template>

    <template #example1>
      <p>Описание примера</p>

      <modal-flow-case />
    </template>

    <template #example2>
      <p>Описание примера</p>

      <text-editor-case />
    </template>
  </app-section>
</template>
