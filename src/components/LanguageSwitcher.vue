<template>
  <div class="nav-dropdown">
    <button
      class="nav-dropdown-button language-dropdown-button"
      type="button"
      @click="toggleMenu"
      @keydown.esc="isMenuOpen = false"
      :aria-expanded="isMenuOpen ? 'true' : 'false'"
      aria-haspopup="true"
      aria-controls="language-dropdown-menu"
    >
      <span class="truncate">{{ $i18n.locale.toUpperCase() }}</span>
      <svg class="nav-dropdown-icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <div v-show="isMenuOpen" @click.away="isMenuOpen = false" class="nav-dropdown-menu language-dropdown-menu" id="language-dropdown-menu" role="menu">
      <a
        href="#"
        @click.prevent="setLocale('pt')"
        class="nav-dropdown-item"
        role="menuitem"
      >PT</a>
      <a
        href="#"
        @click.prevent="setLocale('en')"
        class="nav-dropdown-item"
        role="menuitem"
      >EN</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const setLocale = (newLocale: string) => {
  locale.value = newLocale;
  isMenuOpen.value = false; 
};
</script>
