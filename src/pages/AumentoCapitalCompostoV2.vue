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
  montante: number | null;
  capital: number | null;
  juros: number | null;
}

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const formFields = ref([
    { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
    { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
    { id: 'juros', label: 'Taxa de Juros', placeholder: '0 %' }
]);

const calculateResult = (values: AumentoCapitalCompostoValues) => {
  const { montante, capital, juros } = values;

  if (montante === null || capital === null || juros === null || capital === 0) {
    clearKatexParts();
    return;
  }


  const jurosDecimal = juros / 100;
  const relacaoCapital = montante / capital;
  const logRelacao = Math.log10(relacaoCapital);
  const logTaxa = Math.log10(1 + jurosDecimal);
  const resultadoFinal = logRelacao / logTaxa;

  const formatIntermediate = (num: number, precision: number): string => {
    return num.toFixed(precision).replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
  };

  const relacaoCapitalFormatted = formatIntermediate(relacaoCapital, 4); 
  const logRelacaoFormatted = formatIntermediate(logRelacao, 4);      
  const logTaxaFormatted = formatIntermediate(logTaxa, 4);           
  const resultadoFinalFormatted = resultadoFinal.toFixed(2);           

  const formulaLatex = `
    \\begin{aligned}
    ${montante} &= ${capital} \\cdot (1 + ${jurosDecimal})^{t} \\\\
    \\frac{${montante}}{${capital}} &= (1 + ${jurosDecimal})^{t} \\\\
    ${relacaoCapitalFormatted} &= (1 + ${jurosDecimal})^{t} \\\\
    \\log_{10}(${relacaoCapitalFormatted}) &= \\log_{10}(${1 + jurosDecimal})^{t} \\\\
    ${logRelacaoFormatted} &= t \\cdot ${logTaxaFormatted} \\\\
    t &= \\frac{${logRelacaoFormatted}}{${logTaxaFormatted}} \\\\
    t & \\approx ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>