<script setup lang="ts">
import AppAppSection from '@/components/section/app-section.vue'
import AppButton from '@/components/ui/app-button.vue'
import { ButtonTypes } from '@/constants/button.ts'
import { ERoutes } from '@/router/routes.ts'
</script>

<template>
  <div>
    <app-app-section title="Массив множество">
      <app-button text="Перейти" :type="ButtonTypes.Link" :href="ERoutes.Array" />
    </app-app-section>
    <app-app-section title="Связный список">
      <app-button text="Перейти" :type="ButtonTypes.Link" :href="ERoutes.List" />
    </app-app-section>

    <app-app-section title="Стек">
      <app-button text="Перейти" :type="ButtonTypes.Link" :href="ERoutes.Stack" />
    </app-app-section>

    <app-app-section title="Очередь">
      <app-button text="Перейти" :type="ButtonTypes.Link" :href="ERoutes.Queue" />
    </app-app-section>

    <app-app-section title="Дерево">
      <app-button text="Перейти" :type="ButtonTypes.Link" :href="ERoutes.Tree" />
    </app-app-section>

    <app-app-section title="Граф">
      <app-button text="Перейти" :type="ButtonTypes.Link" :href="ERoutes.Graph" />
    </app-app-section>

    <app-app-section title="Множество">
      <app-button text="Перейти" :type="ButtonTypes.Link" :href="ERoutes.Set" />
    </app-app-section>
  </div>
</template>
