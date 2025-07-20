<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
import { ERoutes } from '@/router/routes.ts'
</script>

<template>
  <div>
    <div class="menu">
      <div class="menu__items">
        <router-link :to="ERoutes.List">
          <span>Связный список</span>
        </router-link>
        <router-link :to="ERoutes.Stack">
          <span>Стек</span>
        </router-link>
        <router-link :to="ERoutes.Queue">
          <span>Очередь</span>
        </router-link>
        <router-link :to="ERoutes.Tree">
          <span>Дерево</span>
        </router-link>
        <router-link :to="ERoutes.Graph">
          <span>Граф</span>
        </router-link>
        <router-link :to="ERoutes.Set">
          <span>Множество</span>
        </router-link>
      </div>
    </div>

    <app-section title="О чем эта статья?" :has-breadcrumbs="false">
      <div class="about">
        <p>
          В мире <b>Frontend есть проблема:</b> многие разработчики
          <b>либо не знают структуры данных, либо не понимают их применение</b>.
        </p>
        <p>
          Мы, Тимофей Соломенников и Руслан Мирзоев, разработчики из онлайн-кинотеатра
          <a href="https://premier.one/" target="_blank"
            ><img src="@/assets/icons/premier-logo.png" alt="" />PREMIER</a
          >, хотим поделиться своим опытом. Для этого мы <b>выбрали несколько структур данных</b> и
          для каждой из них
          <b>сделали реальные примеры.</b>
        </p>
        <p>
          Был создан проект, исходный код которого доступен на
          <a href="https://github.com/RuSaG0/js-data-structures" target="_blank"
            ><img src="@/assets/icons/github-mark.svg" alt="" />Github</a
          >
        </p>

        <div class="contacts">
          <p>Если появятся вопросы, пишите в тг:</p>
          <ul>
            <li>
              <a target="_blank" href="https://t.me/anti_pode"
                ><img src="@/assets/icons/tg.svg" alt="" />Тимофей Соломенников</a
              >
            </li>
            <li>
              <a target="_blank" href="https://t.me/anotherUselessNickname"
                ><img src="@/assets/icons/tg.svg" alt="" />Руслан Мирзоев</a
              >
            </li>
          </ul>
        </div>
      </div>
    </app-section>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.about {
  img {
    display: inline-block;
  }

  a {
    white-space: nowrap;

    img {
      width: 1em;
      height: 1em;
      margin-right: 4px;
      margin-bottom: -2px;
    }
  }
}

.contacts {
  p {
    margin-bottom: 4px;
  }

  ul {
    margin: 0;
    list-style: none;
    padding-left: 0;
  }
}

.menu {
  margin-bottom: 10px;

  @include from-mobile {
    display: none;
  }

  &__items {
    display: flex;
    flex-direction: column;
  }

  p {
    margin: 0 0 4px 0;
  }
}
</style>
