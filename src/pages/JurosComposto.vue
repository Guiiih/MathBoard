<template>
  <div>
      <NavBar />
      <input-component :Label01="'Capital Inicial'" :Label02="'Taxa De Juros'" :Label03="'Tempo'" :show-div="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado" :part1="part1" :part2="part2" :part3="part3" :part4="part4" :part5="part5"/>
  </div>
</template>
<script>

import katex from 'katex'
import 'katex/dist/katex.min.css';

import NavBar from '../components/NavBar.vue'
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';

export default {
  components: {
      InputComponent,
      ResultComponent,
      NavBar,
  },
  data() {
      return {
      inputs: {
          input1: '',
          input2: '',
          input3: '',
      },
      resultado: '',
      part1: '',
      part2: '',
      part3: '',
      part4: '',
      part5: '',
      jurosTipo: 'anual',
      tempoTipo: 'anual',
  }
},
methods: {
  calculateResult(inputs) {
    if (!inputs.input1 || !inputs.input2 || !inputs.input3) {
      this.resultado = '';
      return;
    }

    const capital = parseFloat(inputs.input1.replace(',', '.'));
    const juros = parseFloat(inputs.input2.replace(',', '.'));
    const tempo = parseFloat(inputs.input3.replace(',', '.'));

    const jurosFinal = inputs.jurosTipo === inputs.tempoTipo ? juros/100 : (juros / 12)/100;

    const montanteComposto = capital * (1 + jurosFinal) ** (tempo);

    this.part1 = katex.renderToString(`M = ${capital} * (1 + ${jurosFinal})^{${tempo}}`);
    this.part2 = katex.renderToString(`M = ${capital} * ${1 + jurosFinal}^{${tempo}}`);
    this.part3 = katex.renderToString(`M = ${capital} * ${(1 + (jurosFinal) ** tempo).toFixed(5)}`);
    this.part4 = katex.renderToString(`J =${montanteComposto.toFixed(2)} - ${capital}`);
    this.part5 = katex.renderToString(`J = ${(montanteComposto - capital).toFixed(2)}`);

    this.resultado = katex.renderToString(`M = ${montanteComposto.toFixed(2)}`);
  }
}
}
</script>