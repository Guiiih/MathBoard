<template>
  <div>
      <NavBar />
      <input-component :Label01="'Capital Inicial'"  :Label02="'Taxa De Juros'" :Label03="'Tempo'" :show-div="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado" /> </div>
</template>
<script setup lang="ts">
import 'katex/dist/katex.min.css';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay'; 
import katex from 'katex'; 

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay(); 

const calculateResult = (inputs: any) => {
  if (inputs.input1 === null || inputs.input2 === null || inputs.input3 === null) {
    clearKatexParts();
    return;
  }

  const capital = inputs.input1; 
  const juros = inputs.input2;   
  const tempo = inputs.input3;   

  const jurosDecimal = juros / 100;

  const jurosFinal = inputs.jurosTipo === inputs.tempoTipo ? jurosDecimal : parseFloat((jurosDecimal / 12).toFixed(7).replace(/(\.0+|0+)$/, ""));
  const jurosSimples = inputs.jurosTipo === inputs.tempoTipo ? capital * (jurosDecimal / (inputs.jurosTipo === inputs.tempoTipo ? 1 : 12)) * tempo : capital * ((jurosDecimal / 12) * tempo); // Correção de lógica na sua linha original, se necessário

  const formulaLatex = `
    \\begin{aligned}
    J &= ${capital} \\cdot ${jurosFinal} \\cdot ${tempo} \\\\
    J &= ${capital} \\cdot ${(jurosFinal * tempo).toFixed(2)} \\\\
    J &= ${(jurosSimples).toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex); 
};
</script>