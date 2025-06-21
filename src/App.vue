<template>
  <div id="app">
    <router-view />
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} {{ $t('footer.copyright') }}</p>
      <LanguageSwitcher class="language-switcher-bottom-right" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { provideTheme } from './composables/useTheme';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './components/LanguageSwitcher.vue'; 

const currentYear = ref(new Date().getFullYear());
const { t } = useI18n();

provideTheme();
</script>
