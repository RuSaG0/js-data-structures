<script setup lang="ts">
import AppCode from '@/components/ui/app-code.vue'
import AppAppSection from '@/components/section/app-section.vue'
import { ref } from 'vue'

const code = ref(`console.log('Hello, world!')`)
</script>

<template>
  <app-app-section title="Стек">
    <p>
      Стек — это структура данных, работающая по принципу LIFO (Last In, First Out), что означает,
      что последний добавленный элемент будет первым извлечен. В frontend-разработке стек полезен
      для управления историей навигации или для валидации данных.
    </p>

    <app-code :code="code" />
  </app-app-section>
</template>
