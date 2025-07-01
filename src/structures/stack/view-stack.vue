<script setup lang="ts">
import AppAppSection from '@/components/section/app-section.vue';
import ModalFlowCase from '@/structures/stack/examples/modal-flow-case.vue'
import TextEditorCase from '@/structures/stack/examples/text-editor-case.vue'
</script>

<template>
  <app-app-section title="Стек">
    <p>Пример №1</p>
    <modal-flow-case />
    <p>Пример №2</p>
    <text-editor-case />
  </app-app-section>
</template>
