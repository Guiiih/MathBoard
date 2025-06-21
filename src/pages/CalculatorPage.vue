<template>
  <div>
    <NavBar />
    <input-component :fields="formFields" @update="handleUpdate" />
    <result-component :resultado="resultado" />
  </div>
</template>

<script setup lang="ts">
import 'katex/dist/katex.min.css';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

import { calculateJurosSimples } from '../calculations/jurossimples'; 
import { calculateJurosComposto } from '../calculations/juroscomposto'; 
import { calculateValorInicialSimples } from '../calculations/valorinicialsimples'; 
import { calculateValorInicialComposto } from '../calculations/valorinicialcomposto'; 
import { calculateAumentoCapitalSimplesV1 } from '../calculations/aumentocapitalsimplesv1'; 
import { calculateAumentoCapitalSimplesV2 } from '../calculations/aumentocapitalsimplesv2'; 
import { calculateAumentoCapitalCompostoV1 } from '../calculations/aumentocapitalcompostov1'; 
import { calculateAumentoCapitalCompostoV2 } from '../calculations/aumentocapitalcompostov2'; 
import { calculateSAF } from '../calculations/saf'; 
import { calculateSAC } from '../calculations/sac'; 
import { calculateSAM } from '../calculations/sam'; 
import { calculateSSA } from '../calculations/ssa'; 
import { calculateCorrecaoMonetaria01 } from '../calculations/correcaomonetaria01'; 
import { calculateCorrecaoMonetaria02 } from '../calculations/correcaomonetaria02'; 
import { calculateDescontoCompostoComercial } from '../calculations/descontocompostocomercial'; 
import { calculateDescontoCompostoRacional } from '../calculations/descontocompostoracional'; 
import { calculateDescontoSimplesComercial } from '../calculations/descontosimplescomercial'; 
import { calculateDescontoSimplesRacional } from '../calculations/descontosimplesracional'; 
import { calculatePagamentoAntecipado } from '../calculations/pagamentoantecipado'; 
import { calculateSerieDiferida } from '../calculations/seriediferida'; 
import { calculateSeriePostecipada } from '../calculations/seriepostecipada'; 
import { calculateTaxaDesvalorizacaoMoeda } from '../calculations/taxadesvalorizacaomoeda'; 


const route = useRoute();
const { resultado, setKatexResult, clearKatexParts, formatNumberForLatex, parseNumber, approximationSymbol } = useKatexDisplay();

const formFields = ref<any[]>([]);
let calculationFunction: Function | null = null;

interface CalculationConfig {
  fields: any[];
  calculate: (values: any, katexUtils: any) => void;
}

const calculationRoutes: Record<string, CalculationConfig> = {
  '/': { 
    fields: [
      { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
      { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %', type: 'interest' },
      { id: 'tempo', label: 'Tempo', placeholder: '0', type: 'time' }
    ],
    calculate: calculateJurosSimples
  },
  '/JurosComposto': {
    fields: [
      { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
      { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %', type: 'interest' },
      { id: 'tempo', label: 'Tempo', placeholder: '0', type: 'time' }
    ],
    calculate: calculateJurosComposto
  },
  '/ValorInicialSimples': {
    fields: [
      { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
      { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %', type: 'interest' },
      { id: 'tempo', label: 'Tempo', placeholder: '0', type: 'time' }
    ],
    calculate: calculateValorInicialSimples
  },
  '/ValorInicialComposto': {
    fields: [
      { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
      { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %', type: 'interest' },
      { id: 'tempo', label: 'Tempo', placeholder: '0', type: 'time' }
    ],
    calculate: calculateValorInicialComposto
  },
  '/AumentoCapitalSimplesV1': {
    fields: [
      { id: 'aumento', label: 'Aumento', placeholder: '0' },
      { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %' }
    ],
    calculate: calculateAumentoCapitalSimplesV1
  },
  '/AumentoCapitalSimplesV2': {
    fields: [
      { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
      { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
      { id: 'juros', label: 'Taxa de Juros', placeholder: '0 %' }
    ],
    calculate: calculateAumentoCapitalSimplesV2
  },
  '/AumentoCapitalCompostoV1': {
    fields: [
      { id: 'aumento', label: 'Aumento', placeholder: '0' },
      { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %' }
    ],
    calculate: calculateAumentoCapitalCompostoV1
  },
  '/AumentoCapitalCompostoV2': {
    fields: [
      { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
      { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
      { id: 'juros', label: 'Taxa de Juros', placeholder: '0 %' }
    ],
    calculate: calculateAumentoCapitalCompostoV2
  },
  '/SAF': {
    fields: [
      { id: 'capital', label: 'Valor do Financiamento', placeholder: 'R$ 0,00' },
      { id: 'juros', label: 'Taxa de Juros', placeholder: '0 %', type: 'interest' },
      { id: 'parcelas', label: 'Número de Parcelas', placeholder: '0', type: 'time' }
    ],
    calculate: calculateSAF
  },
  '/SAC': {
    fields: [
      { id: 'valorFinanciado', label: 'Valor do Financiamento', placeholder: 'R$ 0,00' },
      { id: 'taxaJuros', label: 'Taxa de Juros', placeholder: '0 %', type: 'interest' },
      { id: 'numParcelas', label: 'Período', placeholder: '0', type: 'time' }
    ],
    calculate: calculateSAC
  },
  '/SAM': {
    fields: [], 
    calculate: calculateSAM
  },
  '/SSA': {
    fields: [], 
    calculate: calculateSSA
  },
  '/CorrecaoMonetaria01': {
    fields: [], 
    calculate: calculateCorrecaoMonetaria01
  },
  '/CorrecaoMonetaria02': {
    fields: [], 
    calculate: calculateCorrecaoMonetaria02
  },
  '/DescontoCompostoComercial': {
    fields: [], 
    calculate: calculateDescontoCompostoComercial
  },
  '/DescontoCompostoRacional': {
    fields: [], 
    calculate: calculateDescontoCompostoRacional
  },
  '/DescontoSimplesComercial': {
    fields: [], 
    calculate: calculateDescontoSimplesComercial
  },
  '/DescontoSimplesRacional': {
    fields: [], 
    calculate: calculateDescontoSimplesRacional
  },
  '/PagamentoAntecipado': {
    fields: [], 
    calculate: calculatePagamentoAntecipado
  },
  '/SerieDiferida': {
    fields: [], 
    calculate: calculateSerieDiferida
  },
  '/SeriePostecipada': {
    fields: [], 
    calculate: calculateSeriePostecipada
  },
  '/TaxaDesvalorizacaoMoeda': {
    fields: [], 
    calculate: calculateTaxaDesvalorizacaoMoeda
  },
};

watch(() => route.path, (newPath) => {
  const config = calculationRoutes[newPath];
  if (config) {
    formFields.value = config.fields;
    calculationFunction = config.calculate;
    clearKatexParts(); 
  } else {
    formFields.value = [];
    calculationFunction = null;
    clearKatexParts();
    console.warn(`Rota não configurada: ${newPath}`);
  }
}, { immediate: true });

const handleUpdate = (values: any) => {
  if (calculationFunction) {
    calculationFunction(values, { setKatexResult, clearKatexParts, formatNumberForLatex, parseNumber, approximationSymbol });
  }
};
</script>
