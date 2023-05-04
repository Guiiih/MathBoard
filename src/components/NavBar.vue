<template>
    <nav>
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">

          <div class="flex-shrink-0">
            <router-link to="/" class="flex items-center">
                <img src="../assets/images/MathBoard.svg" class="h-6 mr-3" alt="Math Logo" />
            </router-link>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button @click="toggleMenu" class="inline-flex items-center justify-center p-2 rounded-md text-brand-green hover:text-white hover:bg-brand-green focus:outline-none">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div class="hidden sm:block sm:ml-6">
            <div class="relative inline-block text-left">
                <button class="text-brand-green border font-medium rounded-lg text-sm px-4 py-2.5 md:flex flex justify-center items-center  " type="button" @click.stop.prevent="toggleMenu()">
                    Operações
                    <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="absolute z-10 my-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 py-2 text-sm text-brand-green" v-show="isMenuOpen"> 
                    <router-link to="/" class="block px-4 py-2 hover:text-green-700">Juros Simples</router-link>
                    <router-link to="/JurosComposto" class="block px-4 py-2 hover:text-green-700">Juros Composto</router-link>
                    <router-link to="/ValorInicialSimples" class="block px-4 py-2 hover:text-green-700">Valor Inicial Simples</router-link>
                    <router-link to="/ValorInicialComposto" class="block px-4 py-2 hover:text-green-700">Valor Inicial Composto</router-link>                  
                    <router-link to="/AumentoCapitalSimples" class="block px-4 py-2 hover:text-green-700">Aumento Capital Simples</router-link>
                    <router-link to="/AumentoCapitalComposto" class="block px-4 py-2 hover:text-green-700">Aumento Capital Composto</router-link>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="{'block ': isMenuOpen, 'hidden': !isMenuOpen}" class="sm:hidden">
        <div class="py-2 text-sm text-brand-green">
            <router-link to="/" class="block px-4 py-2 hover:text-green-700">Juros Simples</router-link>
            <router-link to="/JurosComposto" class="block px-4 py-2 hover:text-green-700">Juros Composto</router-link>
            <router-link to="/ValorInicialSimples" class="block px-4 py-2 hover:text-green-700">Valor Inicial Simples</router-link>
            <router-link to="/ValorInicialComposto" class="block px-4 py-2 hover:text-green-700">Valor Inicial Composto</router-link>                  
            <router-link to="/AumentoCapitalSimples" class="block px-4 py-2 hover:text-green-700">Aumento Capital Simples</router-link>
            <router-link to="/AumentoCapitalComposto" class="block px-4 py-2 hover:text-green-700">Aumento Capital Composto</router-link>
        </div>
    </div>
    </nav>
</template>
<script>
export default {
  data() {
    return {
        isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>