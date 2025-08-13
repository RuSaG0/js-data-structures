<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ERoutes } from '@/router/routes.ts'
import { onMounted, ref, watch } from 'vue'

const routesMap = {
  [ERoutes.Main]: 'Главная',
  [ERoutes.List]: 'Связный список',
  [ERoutes.Stack]: 'Стек',
  [ERoutes.Queue]: 'Очередь',
  [ERoutes.Tree]: 'Дерево',
  [ERoutes.Graph]: 'Граф',
  [ERoutes.Set]: 'Множество',
  [ERoutes.Array]: 'Массив',
  [ERoutes.Map]: 'Карта',
}

const routesArray = [
  ERoutes.Main,
  ERoutes.List,
  ERoutes.Stack,
  ERoutes.Queue,
  ERoutes.Tree,
  ERoutes.Graph,
  ERoutes.Set,
  ERoutes.Array,
  ERoutes.Map,
]

const isNavbarActive = ref<boolean>(false)

const toggleNavbarState = () => {
  isNavbarActive.value = !isNavbarActive.value
}

const route = useRoute()
const prev = ref<{ name: string; link: string } | null>(null)
const next = ref<{ name: string; link: string } | null>(null)

const updatePrevAndNextRoutes = () => {
  const currentRoute = route.path
  const currentRouteIndex = routesArray.indexOf(currentRoute as ERoutes)
  const _prev = routesArray[currentRouteIndex - 1] ?? routesArray[routesArray.length - 1]
  const _next = routesArray[currentRouteIndex + 1] ?? routesArray[0]

  prev.value = { name: routesMap[_prev], link: _prev }
  next.value = { name: routesMap[_next], link: _next }
}

onMounted(() => {
  updatePrevAndNextRoutes()
})

watch(
  () => route.path,
  () => {
    updatePrevAndNextRoutes()
  },
)
</script>

<template>
  <main class="main">
    <aside class="sidebar">
      <router-link v-for="(value, key) in routesMap" :key="key" class="sidebar__item" :to="key">
        <span>{{ value }}</span>
      </router-link>
    </aside>

    <div id="content" class="content container">
      <RouterView />
    </div>

    <div class="navigation">
      <router-link v-if="prev" :to="prev.link" class="navigation__prev"
        >◀️ {{ prev.name }}</router-link
      >
      <router-link v-if="next" :to="next.link" class="navigation__next"
        >{{ next.name }} ▶️</router-link
      >
    </div>

    <div
      class="navbar"
      :class="{ 'navbar--active': isNavbarActive }"
      @click="isNavbarActive = false"
    >
      <div class="navbar__content" @click.stop="toggleNavbarState">
        <div class="navbar__container container">
          <div v-if="isNavbarActive" class="navbar__routes" @click.stop="toggleNavbarState">
            <router-link
              v-for="(value, key) in routesMap"
              :key="key"
              class="navbar__routes__item"
              :to="key"
            >
              <span>{{ value }}</span>
            </router-link>
          </div>
          <div class="navbar__actions">
            <span v-if="!isNavbarActive">🔼 Меню</span>
            <span v-else>🔽 Меню</span>

            <div class="navbar__links">
              <a target="_blank" href="https://t.me/anti_pode"
                ><img src="@/assets/icons/tg.svg" alt="" />Тимофей</a
              >
              <a target="_blank" href="https://t.me/anotherUselessNickname"
                ><img src="@/assets/icons/tg.svg" alt="" />Руслан</a
              >
            </div>
          </div>
        </div>
      </div>
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
    padding: 10px 10px 80px 10px;
  }
}

.navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 42px;
  display: flex;
  background-color: $app-background;

  @include from-mobile {
    display: none;
  }

  &__prev,
  &__next {
    width: 50%;
    padding: 4px 6px;
    outline: 1px solid #ccc;
    color: $color-black-text;
    text-align: center;
    text-decoration: none;
  }

  &__prev {
    margin-right: auto;
  }

  &__next {
    margin-left: auto;
  }
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  @include from-mobile {
    display: none;
  }

  &--active {
    pointer-events: auto;
  }

  &__container {
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  &__content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $app-background;
    pointer-events: auto;
  }

  &__routes {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #ccc;

    &__item {
      padding: 4px 0;
      color: #909090;
      text-decoration: none;

      &.router-link-active {
        color: $color-black-text;
      }

      &:first-child {
        padding-top: 0;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    width: 100%;

    img {
      display: inline-block;
    }

    a {
      white-space: nowrap;

      img {
        width: 1.2em;
        height: 1.2em;
        margin-right: 4px;
        margin-bottom: -4px;
      }
    }
  }

  &__links {
    display: flex;
    margin-left: auto;
    gap: 10px;
  }
}
</style>
