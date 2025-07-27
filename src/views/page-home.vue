<script setup lang="ts">
import AppSection from '@/components/section/app-section.vue'
</script>

<template>
  <div>
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
</style>
