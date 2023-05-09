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

    const jurosDecimal = parseFloat((juros/100).toFixed(7).replace(/(\.0+|0+)$/, ""));

    const tempoFinal = inputs.jurosTipo === inputs.tempoTipo ? tempo : parseFloat((tempo / 12 ).toFixed(7).replace(/(\.0+|0+)$/, ""));
    const montanteComposto = inputs.jurosTipo === inputs.tempoTipo ? capital * (1 + jurosDecimal) ** (tempo) : capital * ( 1 + jurosDecimal) ** (tempo/12);

    this.part1 = katex.renderToString(`M = ${capital} * (1 + ${jurosDecimal})^{${tempoFinal}}`);
    this.part2 = katex.renderToString(`M = ${capital} * ${1 + jurosDecimal}^{${tempoFinal}}`);
    this.part3 = katex.renderToString(`M = ${capital} * ${((1 + jurosDecimal) ** tempoFinal).toFixed(7).replace(/(\.0+|0+)$/, "")}`);

    if (inputs.jurosTipo === inputs.tempoTipo){
      this.resultado = katex.renderToString(`M = ${(montanteComposto).toFixed(3).replace(/(\.0+|0+)$/, "")}`);
    }else
      this.resultado = katex.renderToString(`M \\approx ${(montanteComposto).toFixed(3).replace(/(\.0+|0+)$/, "")}`);
    }
  }
}
</script>