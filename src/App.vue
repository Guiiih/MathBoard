<template>
  <div id="app">
    <router-view />
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} {{ $t('footer.copyright') }}</p>
      <LanguageSwitcher />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { provideTheme } from './composables/useTheme';
import LanguageSwitcher from './components/LanguageSwitcher.vue'; 

const currentYear = ref(new Date().getFullYear());
provideTheme();
</script>

