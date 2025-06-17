import { createRouter, createWebHistory } from 'vue-router'
import JurosSimples from './pages/JurosSimples.vue'
import JurosComposto from './pages/JurosComposto.vue'
import ValorInicialSimples from './pages/ValorInicialSimples.vue'
import ValorInicialComposto from './pages/ValorInicialComposto.vue'
import AumentoCapitalSimplesV1 from './pages/AumentoCapitalSimplesV1.vue'
import AumentoCapitalSimplesV2 from './pages/AumentoCapitalSimplesV2.vue'
import AumentoCapitalCompostoV1 from './pages/AumentoCapitalCompostoV1.vue'
import AumentoCapitalCompostoV2 from './pages/AumentoCapitalCompostoV2.vue'
import SAF from './pages/SAF.vue'
import SAC from './pages/SAC.vue'
import SAM from './pages/SAM.vue'
import SSA from './pages/SSA.vue'
import CorrecaoMonetaria01 from './pages/CorreçãoMonetaria01.vue'
import CorrecaoMonetaria02 from './pages/CorreçãoMonetaria02.vue'
import DescontoCompostoComercial from './pages/DescontoCompostoComercial.vue'
import DescontoCompostoRacional from './pages/DescontoCompostoRacional.vue'
import DescontoSimplesComercial from './pages/DescontoSimplesComercial.vue'
import DescontoSimplesRacional from './pages/DescontoSimplesRacional.vue'
import PagamentoAntecipado from './pages/PagamentoAntecipado.vue'
import SerieDiferida from './pages/SerieDiferida.vue'
import SeriePostecipada from './pages/SeriePostecipada.vue'
import TaxaDesvalorizacaoMoeda from './pages/TaxaDesvalorizaçãoMoeda.vue'

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
    path: '/AumentoCapitalSimplesV1',
    name: 'AumentoCapitalSimplesV1',
    component: AumentoCapitalSimplesV1
  },
  {
    path: '/AumentoCapitalSimplesV2',
    name: 'AumentoCapitalSimplesV2',
    component: AumentoCapitalSimplesV2
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
  {
    path: '/SAC',
    name: 'SAC',
    component: SAC
  },
  {
    path: '/SAM',
    name: 'SAM',
    component: SAM
  },
  {
    path: '/SSA',
    name: 'SSA',
    component: SSA
  },
  {
    path: '/CorrecaoMonetaria01',
    name: 'CorrecaoMonetaria01',
    component: CorrecaoMonetaria01
  },
  {
    path: '/CorrecaoMonetaria02',
    name: 'CorrecaoMonetaria02',
    component: CorrecaoMonetaria02
  },
  {
    path: '/DescontoCompostoComercial',
    name: 'DescontoCompostoComercial',
    component: DescontoCompostoComercial
  },
  {
    path: '/DescontoCompostoRacional',
    name: 'DescontoCompostoRacional',
    component: DescontoCompostoRacional
  },
  {
    path: '/DescontoSimplesComercial',
    name: 'DescontoSimplesComercial',
    component: DescontoSimplesComercial
  },
  {
    path: '/DescontoSimplesRacional',
    name: 'DescontoSimplesRacional',
    component: DescontoSimplesRacional
  },
  {
    path: '/PagamentoAntecipado',
    name: 'PagamentoAntecipado',
    component: PagamentoAntecipado
  },
  {
    path: '/SerieDiferida',
    name: 'SerieDiferida',
    component: SerieDiferida
  },
  {
    path: '/SeriePostecipada',
    name: 'SeriePostecipada',
    component: SeriePostecipada
  },
  {
    path: '/TaxaDesvalorizacaoMoeda',
    name: 'TaxaDesvalorizacaoMoeda',
    component: TaxaDesvalorizacaoMoeda
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router