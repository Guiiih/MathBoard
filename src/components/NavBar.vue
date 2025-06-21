<template>
    <nav class="nav-bar">
      <div class="nav-container">
        <div class="nav-content">
          <router-link to="/" class="nav-logo-link">
              <img src="../assets/images/MathBoard.svg" class="nav-logo-img"/>
          </router-link>

          <div class="nav-menu-desktop">
            <div class="nav-dropdown">
                <button
                    class="nav-dropdown-button"
                    type="button"
                    @click="toggleMenu"
                    @keydown.esc="isMenuOpen = false" :aria-expanded="isMenuOpen ? 'true' : 'false'"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                >
                    <span class="truncate">{{ $t(currentPageName) }}</span>
                    <svg class="nav-dropdown-icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div v-show="isMenuOpen" @click.away="isMenuOpen = false" class="nav-dropdown-menu" id="dropdown-menu" role="menu">
                    <router-link
                        v-for="link in links"
                        :key="link.to"
                        :to="link.to"
                        @click="isMenuOpen = false"
                        class="nav-dropdown-item"
                        role="menuitem"
                    >{{ $t(link.i18nKey) }}</router-link>
                </div>
            </div>
            <button @click="themeContext.toggleTheme()" class="theme-toggle-button" :aria-label="themeContext.theme.value === 'light' ? $t('navbar.darkMode') : $t('navbar.lightMode')">
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
import { useI18n } from 'vue-i18n'; 
import { computed, watch } from 'vue'; 
import { useRoute } from 'vue-router'; 

export default {
  setup() {
    const themeContext = useTheme();
    const { t } = useI18n(); 
    const route = useRoute(); 

    const links = computed(() => [
      { to: '/', i18nKey: 'navbar.jurosSimples' },
      { to: '/JurosComposto', i18nKey: 'navbar.jurosComposto' },
      { to: '/ValorInicialSimples', i18nKey: 'navbar.valorInicialSimples' },
      { to: '/ValorInicialComposto', i18nKey: 'navbar.valorInicialComposto' },
      { to: '/AumentoCapitalSimplesV1', i18nKey: 'navbar.aumentoCapitalSimplesV1' },
      { to: '/AumentoCapitalSimplesV2', i18nKey: 'navbar.aumentoCapitalSimplesV2' },
      { to: '/AumentoCapitalCompostoV1', i18nKey: 'navbar.aumentoCapitalCompostoV1' },
      { to: '/AumentoCapitalCompostoV2', i18nKey: 'navbar.aumentoCapitalCompostoV2' },
      { to: '/SAF', i18nKey: 'navbar.saf' },
      { to: '/SAC', i18nKey: 'navbar.sac' },
      { to: '/SAM', i18nKey: 'navbar.sam' },
      { to: '/SSA', i18nKey: 'navbar.ssa' },
      { to: '/CorrecaoMonetaria01', i18nKey: 'navbar.correcaoMonetaria01' },
      { to: '/CorrecaoMonetaria02', i18nKey: 'navbar.correcaoMonetaria02' },
      { to: '/DescontoCompostoComercial', i18nKey: 'navbar.descontoCompostoComercial' },
      { to: '/DescontoCompostoRacional', i18nKey: 'navbar.descontoCompostoRacional' },
      { to: '/DescontoSimplesComercial', i18nKey: 'navbar.descontoSimplesComercial' },
      { to: '/DescontoSimplesRacional', i18nKey: 'navbar.descontoSimplesRacional' },
      { to: '/PagamentoAntecipado', i18nKey: 'navbar.pagamentoAntecipado' },
      { to: '/SerieDiferida', i18nKey: 'navbar.serieDiferida' },
      { to: '/SeriePostecipada', i18nKey: 'navbar.seriePostecipada' },
      { to: '/TaxaDesvalorizacaoMoeda', i18nKey: 'navbar.taxaDesvalorizacaoMoeda' },
    ]);

    const currentPageName = computed(() => {
      const currentRoute = links.value.find(link => link.to === route.path);
      return currentRoute ? currentRoute.i18nKey : 'navbar.operations'; 
    });

    return { themeContext, links, currentPageName, t }; 
  },
  data() {
    return {
        isMenuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
  }
}
</script>