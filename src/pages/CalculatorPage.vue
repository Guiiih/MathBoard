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

import { calculateJurosSimples, formFieldsJurosSimples } from '../calculations/jurossimples';
import { calculateJurosComposto, formFieldsJurosComposto } from '../calculations/juroscomposto';
import { calculateValorInicialSimples, formFieldsValorInicialSimples } from '../calculations/valorinicialsimples';
import { calculateValorInicialComposto, formFieldsValorInicialComposto } from '../calculations/valorinicialcomposto';
import { calculateAumentoCapitalSimplesV1, formFieldsAumentoCapitalSimplesV1 } from '../calculations/aumentocapitalsimplesv1';
import { calculateAumentoCapitalSimplesV2, formFieldsAumentoCapitalSimplesV2 } from '../calculations/aumentocapitalsimplesv2';
import { calculateAumentoCapitalCompostoV1, formFieldsAumentoCapitalCompostoV1 } from '../calculations/aumentocapitalcompostov1';
import { calculateAumentoCapitalCompostoV2, formFieldsAumentoCapitalCompostoV2 } from '../calculations/aumentocapitalcompostov2';
import { calculateSAF, formFieldsSAF } from '../calculations/saf';
import { calculateSAC, formFieldsSAC } from '../calculations/sac';
import { calculateSAM, formFieldsSAM } from '../calculations/sam';
import { calculateSSA, formFieldsSSA } from '../calculations/ssa';
import { calculateCorrecaoMonetaria01, formFieldsCorrecaoMonetaria01 } from '../calculations/correcaomonetaria01';
import { calculateCorrecaoMonetaria02, formFieldsCorrecaoMonetaria02 } from '../calculations/correcaomonetaria02';
import { calculateDescontoCompostoComercial, formFieldsDescontoCompostoComercial } from '../calculations/descontocompostocomercial';
import { calculateDescontoCompostoRacional, formFieldsDescontoCompostoRacional } from '../calculations/descontocompostoracional';
import { calculateDescontoSimplesComercial, formFieldsDescontoSimplesComercial } from '../calculations/descontosimplescomercial';
import { calculateDescontoSimplesRacional, formFieldsDescontoSimplesRacional } from '../calculations/descontosimplesracional';
import { calculatePagamentoAntecipado, formFieldsPagamentoAntecipado } from '../calculations/pagamentoantecipado';
import { calculateSerieDiferida, formFieldsSerieDiferida } from '../calculations/seriediferida';
import { calculateSeriePostecipada, formFieldsSeriePostecipada } from '../calculations/seriepostecipada';
import { calculateTaxaDesvalorizacaoMoeda, formFieldsTaxaDesvalorizacaoMoeda } from '../calculations/taxadesvalorizacaomoeda';


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
    fields: formFieldsJurosSimples,
    calculate: calculateJurosSimples
  },
  '/JurosComposto': {
    fields: formFieldsJurosComposto,
    calculate: calculateJurosComposto
  },
  '/ValorInicialSimples': {
    fields: formFieldsValorInicialSimples,
    calculate: calculateValorInicialSimples
  },
  '/ValorInicialComposto': {
    fields: formFieldsValorInicialComposto,
    calculate: calculateValorInicialComposto
  },
  '/AumentoCapitalSimplesV1': {
    fields: formFieldsAumentoCapitalSimplesV1,
    calculate: calculateAumentoCapitalSimplesV1
  },
  '/AumentoCapitalSimplesV2': {
    fields: formFieldsAumentoCapitalSimplesV2,
    calculate: calculateAumentoCapitalSimplesV2
  },
  '/AumentoCapitalCompostoV1': {
    fields: formFieldsAumentoCapitalCompostoV1,
    calculate: calculateAumentoCapitalCompostoV1
  },
  '/AumentoCapitalCompostoV2': {
    fields: formFieldsAumentoCapitalCompostoV2,
    calculate: calculateAumentoCapitalCompostoV2
  },
  '/SAF': {
    fields: formFieldsSAF,
    calculate: calculateSAF
  },
  '/SAC': {
    fields: formFieldsSAC,
    calculate: calculateSAC
  },
  '/SAM': {
    fields: formFieldsSAM, 
    calculate: calculateSAM
  },
  '/SSA': {
    fields: formFieldsSSA, 
    calculate: calculateSSA
  },
  '/CorrecaoMonetaria01': {
    fields: formFieldsCorrecaoMonetaria01, 
    calculate: calculateCorrecaoMonetaria01
  },
  '/CorrecaoMonetaria02': {
    fields: formFieldsCorrecaoMonetaria02, 
    calculate: calculateCorrecaoMonetaria02
  },
  '/DescontoCompostoComercial': {
    fields: formFieldsDescontoCompostoComercial, 
    calculate: calculateDescontoCompostoComercial
  },
  '/DescontoCompostoRacional': {
    fields: formFieldsDescontoCompostoRacional, 
    calculate: calculateDescontoCompostoRacional
  },
  '/DescontoSimplesComercial': {
    fields: formFieldsDescontoSimplesComercial, 
    calculate: calculateDescontoSimplesComercial
  },
  '/DescontoSimplesRacional': {
    fields: formFieldsDescontoSimplesRacional, 
    calculate: calculateDescontoSimplesRacional
  },
  '/PagamentoAntecipado': {
    fields: formFieldsPagamentoAntecipado, 
    calculate: calculatePagamentoAntecipado
  },
  '/SerieDiferida': {
    fields: formFieldsSerieDiferida, 
    calculate: calculateSerieDiferida
  },
  '/SeriePostecipada': {
    fields: formFieldsSeriePostecipada, 
    calculate: calculateSeriePostecipada
  },
  '/TaxaDesvalorizacaoMoeda': {
    fields: formFieldsTaxaDesvalorizacaoMoeda, 
    calculate: calculateTaxaDesvalorizacaoMoeda
  },
};

watch(() => route.path, (newPath) => {
  const config = calculationRoutes[newPath];
  if (config) {
    formFields.value = config.fields;
    calculationFunction = config.calculate;
    clearKatexParts(); 
    if (config.fields.length === 0 && calculationFunction) {
        const defaultInputsForNoFields = { input1: 1, input4: 100 }; 
        calculationFunction(defaultInputsForNoFields, { setKatexResult, clearKatexParts, formatNumberForLatex, parseNumber, approximationSymbol });
    }

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
