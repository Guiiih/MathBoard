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

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

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

  const basePotenciaFormatted = basePotencia.toFixed(2);
  const logAumentoFormatted = logAumento.toFixed(3); 
  const logTaxaFormatted = logTaxa.toFixed(4); 
  const resultadoFinalFormatted = resultadoFinal.toFixed(2); 

  const formulaLatex = `
    \\begin{aligned}
    ${aumento}C &= C \\cdot (1 + ${jurosDecimal})^{t} \\\\
    ${aumento}\\cancel{C} &= \\cancel{C} \\cdot (${basePotenciaFormatted})^{t} \\\\
    ${aumento} &= ${basePotenciaFormatted}^{t} \\\\
    \\log_{10}(${aumento}) &= \\log_{10}(${basePotenciaFormatted})^{t} \\\\
    ${logAumentoFormatted} &= t \\cdot ${logTaxaFormatted} \\\\
    t &= \\frac{${logAumentoFormatted}}{${logTaxaFormatted}} \\\\
    t & \\approx ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>