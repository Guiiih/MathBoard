<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'" :Label02="'Taxa de Juros'" :Label03="'Numero de Parcelas'" :show-div="true"  @update="calculateResult($event)" />
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
  const parcelas = parseNumber(inputs.input3);

  if (capital === null || juros === null || parcelas === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = parseFloat((juros / 100).toFixed(7).replace(/(\.0+|0+)$/, ""));

  const ParcelasFinal = inputs.jurosTipo === inputs.tempoTipo ? parcelas : parseFloat((parcelas / 12 ).toFixed(8).replace(/(\.0+|0+)$/, ""));

  const baseForPower = (1 + jurosDecimal);
  const powerResult = (baseForPower ** ParcelasFinal);
  const numeratorTerm = jurosDecimal * powerResult;
  const denominatorTerm = powerResult - 1;

  let SAF_calculated = 0;
  if (denominatorTerm !== 0) { 
    SAF_calculated = capital * (numeratorTerm / denominatorTerm);
  } else {
    setKatexResult("Erro: Divisão por zero no cálculo de SAF.");
    return;
  }

  const formattedJurosDecimal = jurosDecimal.toFixed(7).replace(/(\.0+|0+)$/, "");
  const formattedParcelasFinal = ParcelasFinal.toFixed(8).replace(/(\.0+|0+)$/, "");
  const formattedPowerResult = powerResult.toFixed(8).replace(/(\.0+|0+)$/, "");
  const formattedNumeratorTerm = numeratorTerm.toFixed(8).replace(/(\.0+|0+)$/, "");
  const formattedDenominatorTermValue = denominatorTerm.toFixed(8).replace(/(\.0+|0+)$/, "");

  const approximationSymbol = inputs.jurosTipo === inputs.tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    P &= ${capital} \\cdot \\begin{pmatrix} \\frac{${formattedJurosDecimal} \\cdot (1+${formattedJurosDecimal})^{${formattedParcelasFinal}}} {(1+${formattedJurosDecimal})^{${formattedParcelasFinal}}-1} \\end{pmatrix} \\\\
    P &= ${capital} \\cdot \\begin{pmatrix} \\frac{${formattedJurosDecimal} \\cdot ${formattedPowerResult}} {${formattedPowerResult}-1} \\end{pmatrix} \\\\
    P &= ${capital} \\cdot \\frac{${formattedNumeratorTerm}} {${formattedDenominatorTermValue}} \\\\
    P &= ${capital} \\cdot ${ (numeratorTerm / denominatorTerm).toFixed(8).replace(/(\.0+|0+)$/, "")} \\\\
    P & ${approximationSymbol} ${(SAF_calculated).toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>