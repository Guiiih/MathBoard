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

interface ValorInicialValues {
  montante: number | null;
  juros: number | null;
  tempo: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const formFields = ref([
  { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
  { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %', type: 'interest' },
  { id: 'tempo', label: 'Tempo', placeholder: '0', type: 'time' }
]);

const calculateResult = (values: ValorInicialValues) => {
  const { montante, juros, tempo, jurosTipo, tempoTipo } = values;

  if (montante === null || juros === null || tempo === null) {
    clearKatexParts();
    return;
  }


  const jurosDecimal = juros / 100;
  const jurosFinal = jurosTipo === tempoTipo ? jurosDecimal : jurosDecimal / 12;
  const denominador = 1 + (jurosFinal * tempo);
  const valorInicialSimples = montante / denominador;

  const jurosFinalFormatted = jurosFinal.toFixed(7).replace(/(\.0+|0+)$/, "");
  const denominadorFormatted = denominador.toFixed(7).replace(/(\.0+|0+)$/, "");
  const valorInicialFormatted = valorInicialSimples.toFixed(2);

  const approximationSymbol = jurosTipo === tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    Vi &= \\frac{${montante}}{1 + (${jurosFinalFormatted} \\cdot ${tempo})} \\\\
    Vi &= \\frac{${montante}}{${denominadorFormatted}} \\\\
    Vi & ${approximationSymbol} ${valorInicialFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
};
</script>