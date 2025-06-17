<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'" :Label02="'Taxa De Juros'" :Label03="'Tempo'"  :show-div="true" @update="calculateResult($event)" />
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
  const juros = parseNumber(inputs.input2);
  const tempo = parseNumber(inputs.input3);

  if (montante === null || juros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros/100;

  const tempoFinal = inputs.jurosTipo === inputs.tempoTipo ? tempo : parseFloat((tempo / 12 ).toFixed(7).replace(/(\.0+|0+)$/, ""));
  const ValorInicialComposto = inputs.jurosTipo === inputs.tempoTipo ? montante / (1 + jurosDecimal) ** (tempo) : montante / ( 1 + jurosDecimal) ** (tempo/12);

  const approximationSymbol = inputs.jurosTipo === inputs.tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    Vi &= \\frac{${montante}}{(1 + ${jurosDecimal})^{${tempoFinal}}} \\\\
    Vi &= \\frac{${montante}}{${(1+jurosDecimal).toFixed(7).replace(/(\.0+|0+)$/, "")}^{${tempoFinal}}} \\\\
    Vi &= \\frac{${montante}}{${((1+jurosDecimal)**tempoFinal).toFixed(7).replace(/(\.0+|0+)$/, "")}} \\\\
    Vi & ${approximationSymbol} ${(ValorInicialComposto).toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>