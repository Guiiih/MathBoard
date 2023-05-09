import { createRouter, createWebHistory } from 'vue-router'
import JurosSimples from './pages/JurosSimples.vue'
import JurosComposto from './pages/JurosComposto.vue'
import ValorInicialSimples from './pages/ValorInicialSimples.vue'
import ValorInicialComposto from './pages/ValorInicialComposto.vue'
import AumentoCapitalSimples from './pages/AumentoCapitalSimples.vue'
import AumentoCapitalCompostoV1 from './pages/AumentoCapitalCompostoV1.vue'
import AumentoCapitalCompostoV2 from './pages/AumentoCapitalCompostoV2.vue'
import SAF from './pages/SAF.vue'




const routes = [
  {
    path: '/',
    name: 'JurosSimples',
    component: JurosSimples
  },
  {
    path: '/JurosComposto',
    name: 'JurosComposto',
    component: JurosComposto
  },
  {
    path: '/ValorInicialSimples',
    name: 'ValorInicialSimples',
    component: ValorInicialSimples
  },
  {
    path: '/ValorInicialComposto',
    name: 'ValorInicialComposto',
    component: ValorInicialComposto
  },
  {
    path: '/AumentoCapitalSimples',
    name: 'AumentoCapitalSimples',
    component: AumentoCapitalSimples
  },
  {
    path: '/AumentoCapitalCompostoV1',
    name: 'AumentoCapitalCompostoV1',
    component: AumentoCapitalCompostoV1
  },
  {
    path: '/AumentoCapitalCompostoV2',
    name: 'AumentoCapitalCompostoV2',
    component: AumentoCapitalCompostoV2
  },
  {
    path: '/SAF',
    name: 'SAF',
    component: SAF
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
