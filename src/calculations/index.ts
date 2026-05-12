import { calculateJurosSimples, formFieldsJurosSimples } from './jurossimples';
import { calculateJurosComposto, formFieldsJurosComposto } from './juroscomposto';
import { calculateValorInicialSimples, formFieldsValorInicialSimples } from './valorinicialsimples';
import { calculateValorInicialComposto, formFieldsValorInicialComposto } from './valorinicialcomposto';
import { calculateAumentoCapitalSimplesV1, formFieldsAumentoCapitalSimplesV1 } from './aumentocapitalsimplesv1';
import { calculateAumentoCapitalSimplesV2, formFieldsAumentoCapitalSimplesV2 } from './aumentocapitalsimplesv2';
import { calculateAumentoCapitalCompostoV1, formFieldsAumentoCapitalCompostoV1 } from './aumentocapitalcompostov1';
import { calculateAumentoCapitalCompostoV2, formFieldsAumentoCapitalCompostoV2 } from './aumentocapitalcompostov2';
import { calculateSAF, formFieldsSAF } from './saf';
import { calculateSAC, formFieldsSAC } from './sac';
import { calculateSAM, formFieldsSAM } from './sam';
import { calculateSSA, formFieldsSSA } from './ssa';
import { calculateCorrecaoMonetaria01, formFieldsCorrecaoMonetaria01 } from './correcaomonetaria01';
import { calculateCorrecaoMonetaria02, formFieldsCorrecaoMonetaria02 } from './correcaomonetaria02';
import { calculateDescontoCompostoComercial, formFieldsDescontoCompostoComercial } from './descontocompostocomercial';
import { calculateDescontoCompostoRacional, formFieldsDescontoCompostoRacional } from './descontocompostoracional';
import { calculateDescontoSimplesComercial, formFieldsDescontoSimplesComercial } from './descontosimplescomercial';
import { calculateDescontoSimplesRacional, formFieldsDescontoSimplesRacional } from './descontosimplesracional';
import { calculatePagamentoAntecipado, formFieldsPagamentoAntecipado } from './pagamentoantecipado';
import { calculateSerieDiferida, formFieldsSerieDiferida } from './seriediferida';
import { calculateSeriePostecipada, formFieldsSeriePostecipada } from './seriepostecipada';
import { calculateTaxaDesvalorizacaoMoeda, formFieldsTaxaDesvalorizacaoMoeda } from './taxadesvalorizacaomoeda';

interface CalculationConfig {
  name: string;
  path: string;
  fields: any[];
  calculate: (values: any, katexUtils: any) => void;
}

export const allCalculations: CalculationConfig[] = [
  {
    name: 'Juros Simples',
    path: '/',
    fields: formFieldsJurosSimples,
    calculate: calculateJurosSimples,
  },
  {
    name: 'Juros Composto',
    path: '/JurosComposto',
    fields: formFieldsJurosComposto,
    calculate: calculateJurosComposto,
  },
  {
    name: 'Valor Inicial Simples',
    path: '/ValorInicialSimples',
    fields: formFieldsValorInicialSimples,
    calculate: calculateValorInicialSimples,
  },
  {
    name: 'Valor Inicial Composto',
    path: '/ValorInicialComposto',
    fields: formFieldsValorInicialComposto,
    calculate: calculateValorInicialComposto,
  },
  {
    name: 'Aumento Capital Simples V1',
    path: '/AumentoCapitalSimplesV1',
    fields: formFieldsAumentoCapitalSimplesV1,
    calculate: calculateAumentoCapitalSimplesV1,
  },
  {
    name: 'Aumento Capital Simples V2',
    path: '/AumentoCapitalSimplesV2',
    fields: formFieldsAumentoCapitalSimplesV2,
    calculate: calculateAumentoCapitalSimplesV2,
  },
  {
    name: 'Aumento Capital Composto V1',
    path: '/AumentoCapitalCompostoV1',
    fields: formFieldsAumentoCapitalCompostoV1,
    calculate: calculateAumentoCapitalCompostoV1,
  },
  {
    name: 'Aumento Capital Composto V2',
    path: '/AumentoCapitalCompostoV2',
    fields: formFieldsAumentoCapitalCompostoV2,
    calculate: calculateAumentoCapitalCompostoV2,
  },
  {
    name: 'SAF',
    path: '/SAF',
    fields: formFieldsSAF,
    calculate: calculateSAF,
  },
  {
    name: 'SAC',
    path: '/SAC',
    fields: formFieldsSAC,
    calculate: calculateSAC,
  },
  {
    name: 'SAM',
    path: '/SAM',
    fields: formFieldsSAM,
    calculate: calculateSAM,
  },
  {
    name: 'SSA',
    path: '/SSA',
    fields: formFieldsSSA,
    calculate: calculateSSA,
  },
  {
    name: 'Correção Monetária 01',
    path: '/CorrecaoMonetaria01',
    fields: formFieldsCorrecaoMonetaria01,
    calculate: calculateCorrecaoMonetaria01,
  },
  {
    name: 'Correção Monetária 02',
    path: '/CorrecaoMonetaria02',
    fields: formFieldsCorrecaoMonetaria02,
    calculate: calculateCorrecaoMonetaria02,
  },
  {
    name: 'Desconto Composto Comercial',
    path: '/DescontoCompostoComercial',
    fields: formFieldsDescontoCompostoComercial,
    calculate: calculateDescontoCompostoComercial,
  },
  {
    name: 'Desconto Composto Racional',
    path: '/DescontoCompostoRacional',
    fields: formFieldsDescontoCompostoRacional,
    calculate: calculateDescontoCompostoRacional,
  },
  {
    name: 'Desconto Simples Comercial',
    path: '/DescontoSimplesComercial',
    fields: formFieldsDescontoSimplesComercial,
    calculate: calculateDescontoSimplesComercial,
  },
  {
    name: 'Desconto Simples Racional',
    path: '/DescontoSimplesRacional',
    fields: formFieldsDescontoSimplesRacional,
    calculate: calculateDescontoSimplesRacional,
  },
  {
    name: 'Pagamento Antecipado',
    path: '/PagamentoAntecipado',
    fields: formFieldsPagamentoAntecipado,
    calculate: calculatePagamentoAntecipado,
  },
  {
    name: 'Série Diferida',
    path: '/SerieDiferida',
    fields: formFieldsSerieDiferida,
    calculate: calculateSerieDiferida,
  },
  {
    name: 'Série Postecipada',
    path: '/SeriePostecipada',
    fields: formFieldsSeriePostecipada,
    calculate: calculateSeriePostecipada,
  },
  {
    name: 'Taxa Desvalorização Moeda',
    path: '/TaxaDesvalorizacaoMoeda',
    fields: formFieldsTaxaDesvalorizacaoMoeda,
    calculate: calculateTaxaDesvalorizacaoMoeda,
  },
];