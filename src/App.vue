<template>
  <div id="app">
    <router-view />
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} Guilherme Nascimento. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style>
.app-footer {
  text-align: center;
  margin-top: 2rem; 
  font-size: 0.9rem;
  color: #6b7280; 
}
</style>