<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'" :Label04="'Capital Inicial'" :Label05="'Taxa De Juros'" :show-div3="true" :show-div="false" :show-div4="true" @update="calculateResult($event)" />
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
          input4: '',
          input5: '',
      },
      resultado: '',
      part1: '',
      part2: '',
  }
},
methods: {
  calculateResult(inputs) {
    if (!inputs.input1 || !inputs.input4 || !inputs.input5) {
      this.resultado = '';
      return;
    }

   const jurosDecimal = juros/100;

    const montante = parseFloat(inputs.input1.replace(',', '.'));
    const capital = parseFloat(inputs.input4.replace(',', '.'));
    const juros = parseFloat(inputs.input5.replace(',', '.'));

    const jurosDecimal = juros/100;

    this.part1 = katex.renderToString(`t = (${montante} - ${capital}) / ( ${capital} * ${jurosDecimal}) `);
    this.part2 = katex.renderToString(`(${montante - capital}) / (${capital * jurosDecimal})`);
    const resultado = ((montante - capital)/(capital * jurosDecimal));

    this.resultado = katex.renderToString(`t \\approx ${resultado.toFixed(2)}`);
  }
}
}
</script>


