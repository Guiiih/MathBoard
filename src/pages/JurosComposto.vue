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

interface JurosCompostoValues {
  capital: number | null;
  juros: number | null;
  tempo: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const formFields = ref([
  { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
  { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %', type: 'interest' },
  { id: 'tempo', label: 'Tempo', placeholder: '0', type: 'time' }
]);

const calculateResult = (values: JurosCompostoValues) => {
  const { capital, juros, tempo, jurosTipo, tempoTipo } = values;

  if (capital === null || juros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = parseFloat((juros / 100).toFixed(7));
  
  const tempoFinal = jurosTipo === tempoTipo ? tempo : parseFloat((tempo / 12).toFixed(7));
  const montanteComposto = jurosTipo === tempoTipo
    ? capital * (1 + jurosDecimal) ** tempo
    : capital * (1 + jurosDecimal) ** (tempo / 12);

  const approximationSymbol = jurosTipo === tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    M &= ${capital} \\cdot (1 + ${jurosDecimal})^{${tempoFinal}} \\\\
    M &= ${capital} \\cdot ${1 + jurosDecimal}^{${tempoFinal}} \\\\
    M &= ${capital} \\cdot ${((1 + jurosDecimal) ** tempoFinal).toFixed(7).replace(/(\\.0+|0+)$/, "")} \\\\
    M & ${approximationSymbol} ${montanteComposto.toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>