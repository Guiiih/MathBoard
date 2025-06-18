<template>
    <nav class="py-4">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">

          <div class="flex-shrink-0">
            <router-link to="/" class="flex items-center">
                <img src="../assets/images/MathBoard.svg" class="h-6 mr-3" alt="Math Logo" />
            </router-link>
          </div>

          <div class="hidden sm:block sm:ml-6">
            <div class="relative inline-block text-left">
                <button class="text-brand-green border font-medium rounded-lg text-sm px-4 py-2.5 flex items-center w-56 justify-center" type="button" @click="toggleMenu">
                    <span class="truncate">{{ currentPageName }}</span>
                    <svg class="w-4 h-4 ml-2 flex-shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div v-show="isMenuOpen" @click.away="isMenuOpen = false" class="absolute right-0 z-10 my-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-56 py-2 text-sm text-brand-green overflow-y-auto max-h-96">
                    <router-link v-for="link in links" :key="link.to" :to="link.to" @click="isMenuOpen = false" class="block px-4 py-2 hover:bg-gray-100 hover:text-green-700">{{ link.text }}</router-link>
                </div>
            </div>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button @click="toggleMenu" class="inline-flex items-center justify-center p-2 rounded-md text-brand-green hover:text-white hover:bg-brand-green focus:outline-none">
              <span class="sr-only">Abrir menu principal</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <div :class="isMenuOpen ? 'block' : 'hidden'" class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <router-link v-for="link in links" :key="link.to" :to="link.to" @click="toggleMenu" class="block px-3 py-2 rounded-md text-base font-medium text-brand-green hover:bg-green-light">{{ link.text }}</router-link>
        </div>
    </div>
    </nav>
</template>

<script>
export default {
  data() {
    return {
        isMenuOpen: false,
        links: [
            { to: '/', text: 'Juros Simples' },
            { to: '/JurosComposto', text: 'Juros Composto' },
            { to: '/ValorInicialSimples', text: 'Valor Inicial Simples' },
            { to: '/ValorInicialComposto', text: 'Valor Inicial Composto' },
            { to: '/AumentoCapitalSimplesV1', text: 'Aumento Capital Simples V1' },
            { to: '/AumentoCapitalSimplesV2', text: 'Aumento Capital Simples V2' },
            { to: '/AumentoCapitalCompostoV1', text: 'Aumento Capital Composto V1' },
            { to: '/AumentoCapitalCompostoV2', text: 'Aumento Capital Composto V2' },
            { to: '/SAF', text: 'SAF' },
            { to: '/SAC', text: 'SAC' },
        ]
    }
  },
  computed: {
    currentPageName() {
      const currentPath = this.$route.path;
      const currentRoute = this.links.find(link => link.to === currentPath);
      return currentRoute ? currentRoute.text : 'Operações';
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>