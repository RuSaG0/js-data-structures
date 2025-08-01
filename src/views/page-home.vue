<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
</script>

<template>
  <div>
    <app-section title="О чем эта статья?" :has-breadcrumbs="false">
      <div class="about">
        <p>
          В мире <b>Frontend есть проблема:</b> многие разработчики
          <b> плохо ориентируются в структурах данных </b> и не умеют их грамотно применять, чтобы получать эффективные и производительные решения своих задач.
        </p>
        <br />
        <p>
          Мы, Тимофей Соломенников и Руслан Мирзоев, разработчики из онлайн-кинотеатра
          <a href="https://premier.one/" target="_blank"
            >
            <img src="@/assets/icons/premier-logo.png" alt="" /> PREMIER
          </a>, хотим поделиться своим опытом и на реальных примерах показать, что дает правильное использование структур данных.
          В этом документе вы найдете разбор нескольких структур данных, которые мы считаем наиболее важными и которые чаще всего пригождаются
          с описанием преимуществ, особенностей и демонстрацией на примерах.
        </p>

        <br />
        <p>
          Исходный код всех примеров доступен на
          <a href="https://github.com/RuSaG0/js-data-structures" target="_blank"
            ><img src="@/assets/icons/github-mark.svg" alt="" />Github</a
          >
        </p>

        <br />

        <div class="contacts">
          <p>Если появятся вопросы, пишите в telegram:</p>
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
</style>
