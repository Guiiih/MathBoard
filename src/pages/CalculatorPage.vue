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
import { allCalculations } from '../calculations/index'; 

const route = useRoute();
const { resultado, setKatexResult, clearKatexParts, formatNumberForLatex, parseNumber, approximationSymbol } = useKatexDisplay();

const formFields = ref<any[]>([]);
let calculationFunction: Function | null = null;

const calculationRoutesMap = new Map(allCalculations.map(calc => [calc.path, calc])); 

watch(() => route.path, (newPath) => {
  const config = calculationRoutesMap.get(newPath); 
  if (config) {
    formFields.value = config.fields;
    calculationFunction = config.calculate;
    clearKatexParts();
    if (config.fields.length === 0 && calculationFunction) {
        const defaultInputsForNoFields = { aumento: 1, taxa: 10 }; 
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