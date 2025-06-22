import { createRouter, createWebHistory } from 'vue-router'


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
    component: () => import('./pages/CalculatorPage.vue')
  },
  {
    path: '/JurosComposto',
    name: 'JurosComposto',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/ValorInicialSimples',
    name: 'ValorInicialSimples',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/ValorInicialComposto',
    name: 'ValorInicialComposto',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/AumentoCapitalSimplesV1',
    name: 'AumentoCapitalSimplesV1',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/AumentoCapitalSimplesV2',
    name: 'AumentoCapitalSimplesV2',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/AumentoCapitalCompostoV1',
    name: 'AumentoCapitalCompostoV1',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/AumentoCapitalCompostoV2',
    name: 'AumentoCapitalCompostoV2',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/SAF',
    name: 'SAF',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/SAC',
    name: 'SAC',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/SAM',
    name: 'SAM',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/SSA',
    name: 'SSA',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/CorrecaoMonetaria01',
    name: 'CorrecaoMonetaria01',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/CorrecaoMonetaria02',
    name: 'CorrecaoMonetaria02',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/DescontoCompostoComercial',
    name: 'DescontoCompostoComercial',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/DescontoCompostoRacional',
    name: 'DescontoCompostoRacional',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/DescontoSimplesComercial',
    name: 'DescontoSimplesComercial',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/DescontoSimplesRacional',
    name: 'DescontoSimplesRacional',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/PagamentoAntecipado',
    name: 'PagamentoAntecipado',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/SerieDiferida',
    name: 'SerieDiferida',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/SeriePostecipada',
    name: 'SeriePostecipada',
    component: () => import('./pages/CalculatorPage.vue') 
  },
  {
    path: '/TaxaDesvalorizacaoMoeda',
    name: 'TaxaDesvalorizacaoMoeda',
    component: () => import('./pages/CalculatorPage.vue') 
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