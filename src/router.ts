import { createRouter, createWebHistory } from 'vue-router'
import CalculatorPage from './pages/CalculatorPage.vue'

declare global {
  interface Window {
    gtag: (
      command: 'js' | 'config' | 'event',
      targetId: string | Date,
      params?: {
        [key: string]: any;
        page_title?: string;
        page_location?: string;
        page_path?: string;
      }
    ) => void;
  }
}

const routes = [
  {
    path: '/',
    name: 'JurosSimples',
    component: CalculatorPage
  },
  {
    path: '/JurosComposto',
    name: 'JurosComposto',
    component: CalculatorPage
  },
  {
    path: '/ValorInicialSimples',
    name: 'ValorInicialSimples',
    component: CalculatorPage
  },
  {
    path: '/ValorInicialComposto',
    name: 'ValorInicialComposto',
    component: CalculatorPage
  },
  {
    path: '/AumentoCapitalSimplesV1',
    name: 'AumentoCapitalSimplesV1',
    component: CalculatorPage
  },
  {
    path: '/AumentoCapitalSimplesV2',
    name: 'AumentoCapitalSimplesV2',
    component: CalculatorPage
  },
  {
    path: '/AumentoCapitalCompostoV1',
    name: 'AumentoCapitalCompostoV1',
    component: CalculatorPage
  },
  {
    path: '/AumentoCapitalCompostoV2',
    name: 'AumentoCapitalCompostoV2',
    component: CalculatorPage
  },
  {
    path: '/SAF',
    name: 'SAF',
    component: CalculatorPage
  },
  {
    path: '/SAC',
    name: 'SAC',
    component: CalculatorPage
  },
  {
    path: '/SAM',
    name: 'SAM',
    component: CalculatorPage
  },
  {
    path: '/SSA',
    name: 'SSA',
    component: CalculatorPage
  },
  {
    path: '/CorrecaoMonetaria01',
    name: 'CorrecaoMonetaria01',
    component: CalculatorPage
  },
  {
    path: '/CorrecaoMonetaria02',
    name: 'CorrecaoMonetaria02',
    component: CalculatorPage
  },
  {
    path: '/DescontoCompostoComercial',
    name: 'DescontoCompostoComercial',
    component: CalculatorPage
  },
  {
    path: '/DescontoCompostoRacional',
    name: 'DescontoCompostoRacional',
    component: CalculatorPage
  },
  {
    path: '/DescontoSimplesComercial',
    name: 'DescontoSimplesComercial',
    component: CalculatorPage
  },
  {
    path: '/DescontoSimplesRacional',
    name: 'DescontoSimplesRacional',
    component: CalculatorPage
  },
  {
    path: '/PagamentoAntecipado',
    name: 'PagamentoAntecipado',
    component: CalculatorPage
  },
  {
    path: '/SerieDiferida',
    name: 'SerieDiferida',
    component: CalculatorPage
  },
  {
    path: '/SeriePostecipada',
    name: 'SeriePostecipada',
    component: CalculatorPage
  },
  {
    path: '/TaxaDesvalorizacaoMoeda',
    name: 'TaxaDesvalorizacaoMoeda',
    component: CalculatorPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: to.name ? String(to.name) : to.path,
      page_location: window.location.origin + to.fullPath,
      page_path: to.fullPath
    });
  }
});

export default router