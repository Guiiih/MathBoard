<template>
    <nav class="bg-gray-800">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="/img/logo.svg" alt="Logo">
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Home</router-link>
                <router-link to="/about" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:text-white focus:bg-gray-700">About</router-link>
                <router-link to="/contact" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:text-white focus:bg-gray-700">Contact</router-link>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <button type="button" class="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white" @click="toggleMenu" :aria-expanded="menuIsOpen">
              <span class="sr-only">Open main menu</span>
              <svg :class="{'hidden': menuIsOpen, 'block': !menuIsOpen}" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg :class="{'hidden': !menuIsOpen, 'block': menuIsOpen}" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
    export:'NavBar',

    data() {
        return {
            isOpen: false,
        };
    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
    },
    
};
</script>
<style>
</style>