<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'" :Label04="'Capital Inicial'" :Label05="'Taxa De Juros'" :show-div3="true" :show-div="false" :show-div4="true" @update="calculateResult($event)" />
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
  const montante = parseNumber(inputs.input1);
  const capital = parseNumber(inputs.input4);
  const juros = parseNumber(inputs.input5);

  if (montante === null || capital === null || juros === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros/100;

  const resultadoCalculado = ((montante - capital) / (capital * jurosDecimal));

  const approximationSymbol = '\\approx'; 

  const formulaLatex = `
    \\begin{aligned}
    t &= \\frac{${montante} - ${capital}}{${capital} \\cdot ${jurosDecimal}} \\\\
    t &= \\frac{${montante - capital}}{${(capital * jurosDecimal).toFixed(7).replace(/(\.0+|0+)$/, "")}} \\\\
    t & ${approximationSymbol} ${resultadoCalculado.toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>