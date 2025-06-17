<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'" :Label04="'Capital Inicial'" :Label05="'Taxa De Juros'" :show-div3="true" :show-div="false" :show-div4="true" @update="calculateResult($event)" />
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
  const montante = parseNumber(inputs.input1);
  const capital = parseNumber(inputs.input4);
  const juros = parseNumber(inputs.input5);

  if (montante === null || capital === null || juros === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = parseFloat((juros/100).toFixed(7).replace(/(\.0+|0+)$/, ""));

  const logAumento = Math.log10(montante/capital).toPrecision(4).replace(/(\.0+|0+)$/, "");
  const logTaxa = (Math.floor((Math.log10(1 +(jurosDecimal))) * 1000000) / 1000000).toFixed(6).replace(/\.?0+$/, '');

  const resultadoCalculado = (parseFloat(logAumento) / parseFloat(logTaxa)).toFixed(2).replace(/(\.0+|0+)$/, "");

  const approximationSymbol = '\\approx'; 

  const formulaLatex = `
    \\begin{aligned}
    ${montante} &= ${capital} \\cdot (1 + ${jurosDecimal}) ^ {t} \\\\
    \\frac{${montante}}{${capital}} &= (1 + ${jurosDecimal}) ^ {t} \\\\
    ${montante / capital} &= (${1 + jurosDecimal}) ^ {t} \\\\
    \\log_{10} {${montante/capital}} &= \\log_{10} {${(1 + jurosDecimal)}}^{t} \\\\
    ${logAumento} &= t \\cdot ${logTaxa} \\\\
    t &= \\frac{${logAumento}} {${logTaxa}} \\\\
    t & ${approximationSymbol} ${(resultadoCalculado)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>