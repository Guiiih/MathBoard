import { createRouter, createWebHistory } from 'vue-router'
import JurosSimples from './pages/JurosSimples.vue'
import JurosComposto from './pages/JurosComposto.vue'
import ValorInicialSimples from './pages/ValorInicialSimples.vue'
import ValorInicialComposto from './pages/ValorInicialComposto.vue'
import AumentoCapitalSimples from './pages/AumentoCapitalSimples.vue'
import AumentoCapitalComposto from './pages/AumentoCapitalComposto.vue'




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
    path: '/AumentoCapitalComposto',
    name: 'AumentoCapitalComposto',
    component: AumentoCapitalComposto
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
