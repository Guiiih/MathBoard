<template>
  <div>
      <NavBar />
      <input-component :fields="formFields" @update="calculateResult" />
      <result-component :resultado="resultado" />
  </div>
</template>

<script setup lang="ts">
import 'katex/dist/katex.min.css';
import { ref } from 'vue';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

interface JurosSimplesValues {
  capital: number | null;
  juros: number | null;
  tempo: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

const { resultado, setKatexResult, clearKatexParts, formatNumberForLatex } = useKatexDisplay();

const formFields = ref([
  { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
  { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %', type: 'interest' },
  { id: 'tempo', label: 'Tempo', placeholder: '0', type: 'time' }
]);

const calculateResult = (values: JurosSimplesValues) => {
  const { capital, juros, tempo, jurosTipo, tempoTipo } = values;

  if (capital === null || juros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros / 100;

  const jurosFinal = jurosTipo === tempoTipo ? jurosDecimal : parseFloat((jurosDecimal / 12).toFixed(7));
  
  const jurosSimples = capital * jurosFinal * tempo;

  const formulaLatex = `
    \\begin{aligned}
    J &= ${formatNumberForLatex(capital)} \\cdot ${formatNumberForLatex(jurosFinal)} \\cdot ${formatNumberForLatex(tempo)} \\\\
    J &= ${formatNumberForLatex(capital)} \\cdot ${formatNumberForLatex(jurosFinal * tempo)} \\\\
    J &= ${formatNumberForLatex(jurosSimples)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>