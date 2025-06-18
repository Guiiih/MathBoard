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

interface SafValues {
  capital: number | null;
  juros: number | null;
  parcelas: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const formFields = ref([
  { id: 'capital', label: 'Valor do Financiamento', placeholder: 'R$ 0,00' },
  { id: 'juros', label: 'Taxa de Juros', placeholder: '0 %', type: 'interest' },
  { id: 'parcelas', label: 'Número de Parcelas', placeholder: '0', type: 'time' }
]);

const calculateResult = (values: SafValues) => {
  const { capital, juros, parcelas, jurosTipo, tempoTipo } = values;

  if (capital === null || juros === null || parcelas === null || parcelas <= 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros / 100;
  const parcelasFinal = jurosTipo === tempoTipo ? parcelas : (tempoTipo === 'anual' ? parcelas * 12 : parcelas / 12);

  const approximationSymbol = jurosTipo === tempoTipo ? '=' : '\\approx';

  const basePotencia = 1 + jurosDecimal;
  const potenciaResultado = basePotencia ** parcelasFinal;
  const numerador = jurosDecimal * potenciaResultado;
  const denominador = potenciaResultado - 1;
  const safCalculado = denominador > 0 ? capital * (numerador / denominador) : 0;

  const formatIntermediate = (num: number, precision: number): string => {
    return num.toFixed(precision).replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
  };

  const jurosDecimalFormatted = formatIntermediate(jurosDecimal, 4);
  const potenciaResultadoFormatted = formatIntermediate(potenciaResultado, 6);
  const numeradorFormatted = formatIntermediate(numerador, 8);
  const denominadorFormatted = formatIntermediate(denominador, 6);
  const fatorMultiplicadorFormatted = denominador > 0 ? formatIntermediate(numerador / denominador, 8) : '0';
  const safFinalFormatted = safCalculado.toFixed(2);

  const formulaLatex = `
    \\begin{aligned}
    P &= ${capital} \\cdot \\frac{${jurosDecimalFormatted} \\cdot (1+${jurosDecimalFormatted})^{${parcelasFinal}}}{(1+${jurosDecimalFormatted})^{${parcelasFinal}}-1} \\\\
    P &= ${capital} \\cdot \\frac{${jurosDecimalFormatted} \\cdot ${potenciaResultadoFormatted}}{${potenciaResultadoFormatted}-1} \\\\
    P &= ${capital} \\cdot \\frac{${numeradorFormatted}}{${denominadorFormatted}} \\\\
    P &= ${capital} \\cdot ${fatorMultiplicadorFormatted} \\\\
    P & ${approximationSymbol} ${safFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>