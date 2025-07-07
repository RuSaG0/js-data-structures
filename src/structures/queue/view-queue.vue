<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import FileUploadedQueue from '@/structures/queue/examples/file-uploaded-queue.vue'
</script>

<template>
  <app-section title="Очередь">
    <template #description>
      Очередь — это структура данных, работающая по принципу FIFO (First In, First Out), что
      означает, что первый добавленный элемент будет первым извлечен. В frontend-разработке очереди
      могут быть использованы для управления загрузкой файлов.
    </template>

    <template #example1>
      <p>
        Представьте себе приложение, которое позволяет пользователям загружать файлы на сервер.
        Очередь может быть использована для управления порядком загрузки файлов, обеспечивая, что
        файлы загружаются в том порядке, в котором они были добавлены.
      </p>

      <file-uploaded-queue />
    </template>

    <template #pros> - </template>

    <template #cons>
      Очереди могут стать узким местом в производительности, если элементы добавляются быстрее, чем
      обрабатываются. Это может привести к переполнению памяти, если не управлять размером очереди
      должным образом.
    </template>
  </app-section>
</template>
