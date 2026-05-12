<template>
  <div>
    <NavBar />
    <input-component :fields="formFields" @update="handleUpdate" />
    <result-component :tableData="tableDataResult" :katexString="katexResult" />
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
import { allCalculations } from '../calculations/index'; 

const route = useRoute();
const { resultado: katexResult, setKatexResult, clearKatexParts: clearKatex } = useKatexDisplay();
const tableDataResult = ref<any>(null);
const formFields = ref<any[]>([]);
let calculationFunction: Function | null = null;

const formatNumber = (value: number): string => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    });
};

const calculationRoutesMap = new Map(allCalculations.map(calc => [calc.path, calc])); 

const clearResults = () => {
    clearKatex();
    tableDataResult.value = null;
};

watch(() => route.path, (newPath) => {
  const config = calculationRoutesMap.get(newPath); 
  if (config) {
    formFields.value = config.fields;
    calculationFunction = config.calculate;
    clearResults();
  } else {
    formFields.value = [];
    calculationFunction = null;
    clearResults();
    console.warn(`Rota não configurada: ${newPath}`);
  }
}, { immediate: true });

const handleUpdate = (values: any) => {
  if (!calculationFunction) return;

  clearResults();

  if (route.path === '/SAC') {
    const katexUtils = { formatNumberForLatex: formatNumber, clearKatexParts: clearResults };
    tableDataResult.value = calculationFunction(values, katexUtils);
  } else {
    const katexUtils = { setKatexResult, clearKatexParts: clearResults, formatNumberForLatex: formatNumber };
    calculationFunction(values, katexUtils);
  }
};
</script>