<template>
  <div>
      <NavBar />
      <input-component :Label01="'Capital Inicial'"  :Label02="'Taxa De Juros'" :Label03="'Tempo'" :show-div="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado" :part1="part1" :part2="part2" />
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

    const jurosDecimal = juros/100;

    const jurosFinal = inputs.jurosTipo === inputs.tempoTipo ? jurosDecimal : ((jurosDecimal / 12 ).toFixed(7).replace(/(\.0+|0+)$/, ""));
    const jurosSimples = inputs.jurosTipo === inputs.tempoTipo ? capital * ( jurosDecimal * tempo) : capital * ( (jurosDecimal / 12) * tempo);

    this.part1 = katex.renderToString(`J = ${capital} * ${jurosFinal} * ${tempo}`);
    this.part2 = katex.renderToString(`J = ${capital} * ${(jurosFinal*tempo).toFixed(7).replace(/(\.0+|0+)$/, "")}`);

    if (inputs.jurosTipo === inputs.tempoTipo){
      this.resultado = katex.renderToString(`J = ${(jurosSimples).toFixed(2)}`);
    }else
      this.resultado = katex.renderToString(`J \\approx ${(jurosSimples).toFixed(2)}`);
  }
}
}
</script>