<template>
  <div>
      <NavBar />
      <input-component :fields="formFields" @update="calculateResult" />
      <result-component :resultado="resultado"/>
  </div>
</template>

<script setup lang="ts">
import 'katex/dist/katex.min.css';
import { ref } from 'vue';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

interface AumentoCapitalCompostoValues {
  aumento: number | null;
  juros: number | null;
}

const { resultado, setKatexResult, clearKatexParts, formatNumberForLatex } = useKatexDisplay();

const formFields = ref([
  { id: 'aumento', label: 'Aumento', placeholder: '0' },
  { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %' }
]);

const calculateResult = (values: AumentoCapitalCompostoValues) => {
  const { aumento, juros } = values;

  if (aumento === null || juros === null || juros === 0 || aumento <= 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros / 100;
  const basePotencia = 1 + jurosDecimal;
  const logAumento = Math.log10(aumento);
  const logTaxa = Math.log10(basePotencia);
  const resultadoFinal = logAumento / logTaxa;

  const aumentoFormatted = formatNumberForLatex(aumento);
  const jurosDecimalFormatted = formatNumberForLatex(jurosDecimal);
  const basePotenciaFormatted = formatNumberForLatex(basePotencia);
  const logAumentoFormatted = formatNumberForLatex(logAumento); 
  const logTaxaFormatted = formatNumberForLatex(logTaxa); 
  const resultadoFinalFormatted = formatNumberForLatex(resultadoFinal); 

  const formulaLatex = `
    \\begin{aligned}
    ${aumentoFormatted}C &= C \\cdot (1 + ${jurosDecimalFormatted})^{t} \\\\
    ${aumentoFormatted}\\cancel{C} &= \\cancel{C} \\cdot (${basePotenciaFormatted})^{t} \\\\
    ${aumentoFormatted} &= ${basePotenciaFormatted}^{t} \\\\
    \\log_{10}(${aumentoFormatted}) &= \\log_{10}(${basePotenciaFormatted})^{t} \\\\
    ${logAumentoFormatted} &= t \\cdot ${logTaxaFormatted} \\\\
    t &= \\frac{${logAumentoFormatted}}{${logTaxaFormatted}} \\\\
    t & \\approx ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>