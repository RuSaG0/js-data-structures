<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ERoutes } from '@/router/routes.ts'
</script>

<template>
  <main class="main">
    <aside class="sidebar">
      <router-link class="sidebar__item" :to="ERoutes.Main">
        <span>Главная</span>
      </router-link>
      <router-link class="sidebar__item" :to="ERoutes.List">
        <span>Связный список</span>
      </router-link>
      <router-link class="sidebar__item" :to="ERoutes.Stack">
        <span>Стек</span>
      </router-link>
      <router-link class="sidebar__item" :to="ERoutes.Queue">
        <span>Очередь</span>
      </router-link>
      <router-link class="sidebar__item" :to="ERoutes.Tree">
        <span>Дерево</span>
      </router-link>
      <router-link class="sidebar__item" :to="ERoutes.Graph">
        <span>Граф</span>
      </router-link>
      <router-link class="sidebar__item" :to="ERoutes.Set">
        <span>Множество</span>
      </router-link>
    </aside>

    <div class="content container">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss">
@use '@/assets/styles/container' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/breakpoints' as *;

.main {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  gap: 20px;
  margin-top: 20px !important;

  @include container;

  @include tablet {
    gap: 10px;
  }

  @include mobile {
    margin-top: 0 !important;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  min-width: 240px;
  background: $app-card-background;
  padding: 16px 20px;

  @include tablet {
    min-width: 180px;
  }

  @include mobile {
    display: none;
  }

  &__item {
    position: relative;
    padding: 4px 0;
    color: #909090;
    text-decoration: none;
    font-size: 18px;

    &:first-child {
      padding-bottom: 10px;
      margin-bottom: 10px;

      &::after {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 2px;
        background: $app-background;
        content: '';
      }
    }

    &.router-link-active {
      color: $color-black-text;
    }
  }
}

.content {
  overflow: auto;
  max-height: calc(100dvh - 20px);
  background: $app-card-background;
  padding: 20px 20px 60px 20px;

  @include mobile {
    max-height: 100dvh;
    padding: 10px 10px 40px 10px;
  }
}
</style>
