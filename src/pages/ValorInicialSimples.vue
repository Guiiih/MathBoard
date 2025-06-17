<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'"  :Label02="'Taxa De Juros'" :Label03="'Tempo'"  :show-div="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado"/>
  </div>
</template>
<script setup lang="ts">
import 'katex/dist/katex.min.css';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const calculateResult = (inputs: any) => {
  const montante = inputs.input1;
  const juros = inputs.input2;
  const tempo = inputs.input3;

  if (montante === null || juros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros/100;

  const jurosFinal = inputs.jurosTipo === inputs.tempoTipo ? jurosDecimal : parseFloat((jurosDecimal / 12 ).toFixed(7).replace(/(\.0+|0+)$/, ""));
  const ValorInicialSimples = inputs.jurosTipo === inputs.tempoTipo ? montante / (1 + (jurosDecimal * tempo)) : montante /  (1 + ((jurosDecimal / 12) * tempo));

  const approximationSymbol = inputs.jurosTipo === inputs.tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    Vi &= \\frac{${montante}}{1 + (${jurosFinal} \\cdot ${tempo})} \\\\
    Vi &= \\frac{${montante}}{${(1 + parseFloat(jurosFinal) * tempo).toFixed(7).replace(/(\.0+|0+)$/, "")}} \\\\
    Vi & ${approximationSymbol} ${(ValorInicialSimples).toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>