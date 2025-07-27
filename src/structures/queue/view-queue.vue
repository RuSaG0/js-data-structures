<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import FileUploadedQueue from '@/structures/queue/examples/file-upload/file-uploaded-queue.vue'
import ToastWrapper from '@/structures/queue/examples/notifications/toast-wrapper.vue'
</script>

<template>
  <app-section
    title="Очередь"
    source="https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/queue"
    :examples="[
      {
        title: 'Очередь загрузки файлов',
        link: 'https://github.com/RuSaG0/js-data-structures/blob/master/src/structures/queue/examples/file-upload/file-uploaded-queue.vue',
      },
      {
        title: 'Очередь уведомлений',
        link: 'https://github.com/RuSaG0/js-data-structures/tree/master/src/structures/queue/examples/notifications',
      },
    ]"
  >
    <template #description>
      Очередь — это структура данных, работающая по принципу FIFO (First In, First Out), что
      означает, что первый добавленный элемент будет первым извлечён.
    </template>

    <template #pros>
      Когда нужно следовать принципу "первый пришёл — первый вышел" (FIFO, First In First Out).
    </template>

    <template #cons>
      Очереди могут стать узким местом в производительности, если элементы добавляются быстрее,
      чем обрабатываются. Это может привести к переполнению памяти, если не управлять размером
      очереди должным образом.
    </template>

    <template #example1>
      <p>
        Очередь может быть использована для управления порядком загрузки файлов, обеспечивая их
        загрузку в том порядке, в котором они были добавлены. Вы можете выбрать несколько файлов
        (5-10 штук) и загрузить их. Не волнуйтесь — данные на самом деле никуда не загружаются.
      </p>
      <file-uploaded-queue />
    </template>
    <template #example2>
      <p>Очередь может быть использована для показа уведомлений</p>
      <toast-wrapper />
    </template>
  </app-section>
</template>
