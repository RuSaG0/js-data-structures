<script setup lang="ts">
import AppCode from '@/components/ui/app-code.vue'
import AppAppSection from '@/components/section/app-section.vue'
import { ref } from 'vue'
import FileUploadedQueue from '@/structures/queue/examples/file-uploaded-queue.vue'

const code = ref(`console.log('Hello, world!')`)
</script>

<template>
  <app-app-section title="Очередь">
    <p>
      Очередь — это структура данных, работающая по принципу FIFO (First In, First Out), что
      означает, что первый добавленный элемент будет первым извлечен. В frontend-разработке очереди
      могут быть использованы для управления загрузкой файлов.
    </p>

    <app-code :code="code" />

    <p>
      Представьте себе приложение, которое позволяет пользователям загружать файлы на сервер.
      Очередь может быть использована для управления порядком загрузки файлов, обеспечивая, что
      файлы загружаются в том порядке, в котором они были добавлены.
    </p>

    <file-uploaded-queue />

    <h2>Проблемы очередей</h2>
    <p>
      Очереди могут стать узким местом в производительности, если элементы добавляются быстрее, чем
      обрабатываются. Это может привести к переполнению памяти, если не управлять размером очереди
      должным образом.
    </p>
  </app-app-section>
</template>
