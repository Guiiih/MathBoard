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

const { resultado, setKatexResult, clearKatexParts, formatNumberForLatex } = useKatexDisplay();

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

  const aumentoComoJuroFormatted = formatNumberForLatex(aumentoComoJuro);
  const jurosTotalMultiplicadoFormatted = formatNumberForLatex(jurosTotalMultiplicado);
  const resultadoFinalFormatted = formatNumberForLatex(resultadoFinal);
  const jurosFormatted = formatNumberForLatex(juros);


  const formulaLatex = `
    \\begin{aligned}
    ${aumentoComoJuroFormatted}C &= C \\cdot \\frac{${jurosFormatted}}{100} \\cdot t \\\\
    ${aumentoComoJuroFormatted}\\cancel{C} &= \\cancel{C} \\cdot \\frac{${jurosFormatted}}{100} \\cdot t \\\\
    ${aumentoComoJuroFormatted} &= \\frac{${jurosFormatted} \\cdot t}{100} \\\\
    ${jurosFormatted}t &= ${jurosTotalMultiplicadoFormatted} \\\\
    t &= \\frac{${jurosTotalMultiplicadoFormatted}}{${jurosFormatted}} \\\\
    t &= ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>