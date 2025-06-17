<template>
  <div>
      <NavBar />
      <input-component :Label01="'Capital Inicial'" :Label02="'Taxa De Juros'" :Label03="'Tempo'" :show-div="true" @update="calculateResult($event)" />
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
  const capital = parseNumber(inputs.input1);
  const juros = parseNumber(inputs.input2);
  const tempo = parseNumber(inputs.input3);

  if (capital === null || juros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = parseFloat((juros / 100).toFixed(7).replace(/(\.0+|0+)$/, ""));
  const tempoFinal = inputs.jurosTipo === inputs.tempoTipo ? tempo : parseFloat((tempo / 12 ).toFixed(7).replace(/(\.0+|0+)$/, ""));
  const montanteComposto = inputs.jurosTipo === inputs.tempoTipo ? capital * (1 + jurosDecimal) ** (tempo) : capital * ( 1 + jurosDecimal) ** (tempo/12);

  const approximationSymbol = inputs.jurosTipo === inputs.tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    M &= ${capital} \\cdot (1 + ${jurosDecimal})^{${tempoFinal}} \\\\
    M &= ${capital} \\cdot ${1 + jurosDecimal}^{${tempoFinal}} \\\\
    M &= ${capital} \\cdot ${((1 + jurosDecimal) ** tempoFinal).toFixed(7).replace(/(\.0+|0+)$/, "")} \\\\
    M & ${approximationSymbol} ${(montanteComposto).toFixed(2).replace(/(\.0+|0+)$/, "")}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>