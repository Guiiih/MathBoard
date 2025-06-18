<template>
  <div>
      <NavBar />
      <input-component :fields="formFields" @update="calculateResult" />
      <result-component :resultado="resultado" />
  </div>
</template>

<script setup lang="ts">
import 'katex/dist/katex.min.css';
import { ref } from 'vue';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

interface AumentoCapitalSimplesValues {
  aumento: number | null;
  juros: number | null;
}

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const formFields = ref([
  { id: 'aumento', label: 'Aumento', placeholder: '0' },
  { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %' }
]);

const calculateResult = (values: AumentoCapitalSimplesValues) => {
  const { aumento, juros } = values;

  if (aumento === null || juros === null || juros === 0 || aumento <= 1) {
    clearKatexParts();
    return;
  }

  const aumentoComoJuro = aumento - 1;
  const jurosTotalMultiplicado = aumentoComoJuro * 100;
  const resultadoFinal = jurosTotalMultiplicado / juros;
  const resultadoFinalFormatted = resultadoFinal.toFixed(2);

  const formulaLatex = `
    \\begin{aligned}
    ${aumentoComoJuro}C &= C \\cdot \\frac{${juros}}{100} \\cdot t \\\\
    ${aumentoComoJuro}\\cancel{C} &= \\cancel{C} \\cdot \\frac{${juros}}{100} \\cdot t \\\\
    ${aumentoComoJuro} &= \\frac{${juros} \\cdot t}{100} \\\\
    ${juros}t &= ${jurosTotalMultiplicado} \\\\
    t &= \\frac{${jurosTotalMultiplicado}}{${juros}} \\\\
    t &= ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>