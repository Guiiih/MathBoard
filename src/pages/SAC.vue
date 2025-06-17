<template>
  <div>
      <NavBar />
      <input-component :Label01="'Aumento'" :placeholder="'0'" :Label04="'Taxa De Juros'" :show-div="false" :show-div4="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado"/>
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
  const taxa = parseNumber(inputs.input4);

  if (aumento === null || taxa === null) {
    clearKatexParts();
    return;
  }

  const juros = taxa/100;

  const logAumento = Math.log10(aumento).toFixed(3);
  const logTaxa = Math.log10(1 +(juros)).toFixed(4);

  const resultadoCalculado = parseFloat(logAumento) / parseFloat(logTaxa);

  const approximationSymbol = '\\approx'; 

  const formulaLatex = `
    \\begin{aligned}
    {${aumento}}C &= C \\cdot (1+${juros})^{t} \\\\
    {${aumento}}\\cancel{C} &= \\cancel{C} \\cdot (${1 + juros})^{t} \\\\
    {${aumento}} &= ${(1 + juros).toFixed(2)}^{t} \\\\
    \\log_{10} {${aumento}} &= \\log_{10} {${(1 + juros).toFixed(2)}}^{t} \\\\
    {${logAumento}} &= t \\cdot ${logTaxa} \\\\
    t &= \\frac{${logAumento}} {${logTaxa}} \\\\
    t & ${approximationSymbol} ${(resultadoCalculado).toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>