<template>
    <nav class="nav-bar">
      <div class="nav-container">
        <div class="nav-content">
          <router-link to="/" class="nav-logo-link">
              <img src="../assets/images/MathBoard.svg" class="nav-logo-img" alt="Math Logo" />
          </router-link>

          <div class="nav-menu-desktop">
            <div class="nav-dropdown">
                <button class="nav-dropdown-button" type="button" @click="toggleMenu">
                    <span class="truncate">{{ currentPageName }}</span>
                    <svg class="nav-dropdown-icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div v-show="isMenuOpen" @click.away="isMenuOpen = false" class="nav-dropdown-menu">
                    <router-link v-for="link in links" :key="link.to" :to="link.to" @click="isMenuOpen = false" class="nav-dropdown-item">{{ link.text }}</router-link>
                </div>
            </div>
          </div>

          <div class="nav-mobile-menu-button-wrapper">
            <button @click="toggleMenu" class="nav-mobile-menu-button">
              <span class="sr-only">Abrir menu principal</span>
              <svg class="nav-mobile-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <div class="nav-mobile-menu" v-show="isMenuOpen">
        <div class="nav-mobile-menu-items">
            <router-link v-for="link in links" :key="link.to" :to="link.to" @click="toggleMenu" class="nav-mobile-menu-item">{{ link.text }}</router-link>
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