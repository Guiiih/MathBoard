<template>
    <nav class="nav-bar">
      <div class="nav-container">
        <div class="nav-content">
          <router-link to="/" class="nav-logo-link">
              <img src="../assets/images/MathBoard.svg" class="nav-logo-img"/>
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
            <button @click="themeContext.toggleTheme()" class="theme-toggle-button">
              <svg v-if="themeContext.theme.value === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.592 1.591a.75.75 0 0 0 1.06 1.061l1.591-1.591ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM18.894 17.834a.75.75 0 0 0 1.06-1.06l-1.591-1.592a.75.75 0 0 0-1.061 1.06l1.592 1.591ZM12 21.75a.75.75 0 0 1-.75-.75v-2.25a.75.75 0 0 1 1.5 0v2.25a.75.75 0 0 1-.75.75ZM5.05 17.834a.75.75 0 0 0 1.06 1.06l1.591-1.592a.75.75 0 0 0-1.06-1.061l-1.592 1.591ZM3 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12ZM5.05 6.166a.75.75 0 0 0-1.061 1.06l1.592 1.591a.75.75 0 0 0 1.06-1.061L5.05 6.166Z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .159 1.09L8.838 5.54a.75.75 0 0 1-.72.568h-1.85a.75.75 0 0 1-.57-.72l.114-1.004a.75.75 0 0 1 .932-.77l.67-.086ZM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm-3.92 5.303a.75.75 0 0 0-1.088 1.06l1.59 1.59a.75.75 0 0 0 1.06-1.06l-1.59-1.59ZM12.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V4.5ZM19.28 2.607a.75.75 0 0 0-1.087 1.06l1.59 1.59a.75.75 0 0 0 1.06-1.06l-1.59-1.59ZM15.54 8.838a.75.75 0 0 1 .568-.72h1.85a.75.75 0 0 1 .72.57l-.114 1.004a.75.75 0 0 1-.932.77l-.67.086ZM18 12a.75.75 0 0 0 .75-.75h.75a.75.75 0 0 0 0-1.5h-.75a.75.75 0 0 0-.75.75Z" clip-rule="evenodd" />
                <path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
              </svg>
            </button>
          </div>

          </div>
      </div>

      </nav>
</template>

<script>
import { useTheme } from '../composables/useTheme'; 

export default {
  setup() {
    const themeContext = useTheme(); 
    return { themeContext };
  },
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
            { to: '/SAM', text: 'SAM' },
            { to: '/SSA', text: 'SSA' },
            { to: '/CorrecaoMonetaria01', text: 'Correção Monetária 01' },
            { to: '/CorrecaoMonetaria02', text: 'Correção Monetária 02' },
            { to: '/DescontoCompostoComercial', text: 'Desconto Composto Comercial' },
            { to: '/DescontoCompostoRacional', text: 'Desconto Composto Racional' },
            { to: '/DescontoSimplesComercial', text: 'Desconto Simples Comercial' },
            { to: '/DescontoSimplesRacional', text: 'Desconto Simples Racional' },
            { to: '/PagamentoAntecipado', text: 'Pagamento Antecipado' },
            { to: '/SerieDiferida', text: 'Série Diferida' },
            { to: '/SeriePostecipada', text: 'Série Postecipada' },
            { to: '/TaxaDesvalorizacaoMoeda', text: 'Taxa Desvalorização Moeda' },
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
    },
  }
}
</script>