<template>
  <div>
      <NavBar />
      <input-component :Label01="'Aumento'" :placeholder="'0'" :Label04="'Taxa De Juros'" :show-div="false" :show-div4="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado" />
  </div>
</template>
<script setup lang="ts">
import 'katex/dist/katex.min.css';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

const { resultado, setKatexResult, clearKatexParts, parseNumber } = useKatexDisplay();

const calculateResult = (inputs: any) => {
  const aumento = parseNumber(inputs.input1);
  const juros = parseNumber(inputs.input4);

  if (aumento === null || juros === null) {
    clearKatexParts();
    return;
  }

  const aumentoTempo = aumento - 1;

  const resultadoCalculado = (aumentoTempo * 100) / juros;

  const formulaLatex = `
    \\begin{aligned}
    ${aumentoTempo}C &= C \\cdot \\frac{${juros}}{100} \\cdot t \\\\
    ${aumentoTempo}\\cancel{C} &= \\cancel{C} \\cdot \\frac{${juros}}{100} \\cdot t \\\\
    ${aumentoTempo} &= \\frac{${juros} \\cdot t}{100} \\\\
    ${juros}t &= ${aumentoTempo * 100} \\\\
    t &= \\frac{${aumentoTempo * 100}}{${juros}} \\\\
    t &= ${resultadoCalculado.toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>