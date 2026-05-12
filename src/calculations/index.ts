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
import { calculateRentabilidadeReal, formFieldsRentabilidadeReal } from './rentabilidadereal';
import { calculateCustoOportunidade, formFieldsCustoOportunidade } from './custodeoportunidade';
import { calculatePlanejadorAposentadoria, formFieldsPlanejadorAposentadoria } from './planejadoraposentadoria';
import { calculateConversorTaxasJuros, formFieldsConversorTaxasJuros } from './conversortaxasjuros';
import { calculateVPL, formFieldsVPL } from './vpl';
import { calculateTIR, formFieldsTIR } from './tir';
import { calculatePayback, formFieldsPayback } from './payback';
import { calculateCET, formFieldsCET } from './cet';
import { calculateAluguelVsCompra, formFieldsAluguelVsCompra } from './aluguelvscompra';
import { calculatePontoEquilibrio, formFieldsPontoEquilibrio } from './pontoequilibrio';

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
    name: 'Rentabilidade Real',
    path: '/RentabilidadeReal',
    fields: formFieldsRentabilidadeReal,
    calculate: calculateRentabilidadeReal,
  },
  {
    name: 'Custo de Oportunidade',
    path: '/CustoOportunidade',
    fields: formFieldsCustoOportunidade,
    calculate: calculateCustoOportunidade,
  },
  {
    name: 'Planejador de Aposentadoria',
    path: '/PlanejadorAposentadoria',
    fields: formFieldsPlanejadorAposentadoria,
    calculate: calculatePlanejadorAposentadoria,
  },
  {
    name: 'Conversor de Taxas de Juros',
    path: '/ConversorTaxasJuros',
    fields: formFieldsConversorTaxasJuros,
    calculate: calculateConversorTaxasJuros,
  },
  {
    name: 'Valor Presente Líquido (VPL)',
    path: '/VPL',
    fields: formFieldsVPL,
    calculate: calculateVPL,
  },
  {
    name: 'Taxa Interna de Retorno (TIR)',
    path: '/TIR',
    fields: formFieldsTIR,
    calculate: calculateTIR,
  },
  {
    name: 'Payback (Simples e Descontado)',
    path: '/Payback',
    fields: formFieldsPayback,
    calculate: calculatePayback,
  },
  {
    name: 'Custo Efetivo Total (CET)',
    path: '/CET',
    fields: formFieldsCET,
    calculate: calculateCET,
  },
  {
    name: 'Análise de Aluguel vs. Compra de Imóvel',
    path: '/AluguelVsCompra',
    fields: formFieldsAluguelVsCompra,
    calculate: calculateAluguelVsCompra,
  },
  {
    name: 'Cálculo de Ponto de Equilíbrio',
    path: '/PontoEquilibrio',
    fields: formFieldsPontoEquilibrio,
    calculate: calculatePontoEquilibrio,
  },
];