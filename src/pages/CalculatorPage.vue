<template>
  <div>
    <NavBar />
    <input-component :fields="formFields" @update="handleUpdate" />
    <result-component :tableData="tableDataResult" :katexString="katexResult" />

    <!-- <button @click="openExplanationModal">Show Explanation</button> -->

    <Modal :is-open="showExplanationModal" @update:is-open="showExplanationModal = $event" :title="explanationTitle" :question="explanationQuestion" :explanation="explanationContent">
    </Modal>
  </div>
</template>

<script setup lang="ts">
import 'katex/dist/katex.min.css';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { useI18n } from 'vue-i18n';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import Modal from '../components/Modal.vue'; // Import the Modal component
import { useKatexDisplay } from '../composables/useKatexDisplay';
import { allCalculations } from '../calculations/index'; 

const route = useRoute();
// const { t } = useI18n();
const { resultado: katexResult, setKatexResult, clearKatexParts: clearKatex } = useKatexDisplay();
const tableDataResult = ref<any>(null);
const formFields = ref<any[]>([]);
let calculationFunction: Function | null = null;
const showExplanationModal = ref(false); // Control modal visibility
const explanationTitle = ref('');
const explanationQuestion = ref('');
const explanationContent = ref('');
const currentFormValues = ref<any>({});

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
  currentFormValues.value = values; // Store current form values
  if (!calculationFunction) return;

  clearResults();

  if (route.path === '/SAC' || route.path === '/SAM') {
    const katexUtils = { formatNumberForLatex: formatNumber, clearKatexParts: clearResults };
    tableDataResult.value = calculationFunction(values, katexUtils);
  } else {
    const katexUtils = { setKatexResult, clearKatexParts: clearResults, formatNumberForLatex: formatNumber };
    calculationFunction(values, katexUtils);
  }
};

/*
const generateExplanation = () => {
... (keeping the entire block commented out)
*/

/*
const openExplanationModal = () => {
  const { title, question, content } = generateExplanation();
  explanationTitle.value = title;
  explanationQuestion.value = question;
  explanationContent.value = content;
  showExplanationModal.value = true;
};
*/

</script>
