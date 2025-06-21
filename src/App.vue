<template>
  <div id="app">
    <router-view />
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} Guilherme Nascimento. {{ $t('footer.copyright') }}</p> </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { provideTheme } from './composables/useTheme';
import { useI18n } from 'vue-i18n'; 

const currentYear = ref(new Date().getFullYear());
const { t } = useI18n(); 

provideTheme();
</script>

<style>
.app-footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>