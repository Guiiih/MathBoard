<template>
  <div>
      <NavBar />
      <input-component :Label01="'Aumento'" :placeholder="'0'" :Label04="'Taxa De Juros'" :show-div="false" :show-div4="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado" :part1="part1" :part2="part2" :part3="part3" :part4="part4" :part5="part5" :part6="part6"/>
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
      },
      resultado: '',
      part1: '',
      part2: '',
      part3: '',
      part4: '',
      part5: '',
      part6: '',
      jurosDecimalTipo: 'anual',
      tempoTipo: 'anual',
  }
},
methods: {
  calculateResult(inputs) {
    if (!inputs.input1 || !inputs.input4 ) {
      this.resultado = '';
      return;
    }

    const aumento = parseFloat(inputs.input1.replace(',', '.'));
    const juros = parseFloat(inputs.input4.replace(',', '.'));

    const jurosDecimal = parseFloat((juros/100).toFixed(7).replace(/(\.0+|0+)$/, ""));

    const logAumento = Math.log10(aumento).toFixed(3).replace(/(\.0+|0+)$/, "");
    const logTaxa = Math.log10(1 +(jurosDecimal)).toFixed(4).replace(/(\.0+|0+)$/, "");

    this.part1 = katex.renderToString(`{${aumento}}C = C *(1+${jurosDecimal})^{t}`);
    this.part2 = katex.renderToString(`{${aumento}}\\cancel{C} = \\cancel{C} *(${1 + jurosDecimal})^{t}`);
    this.part3 = katex.renderToString(`{${aumento}} = ${(1 + jurosDecimal).toFixed(2)}^{t}`);
    this.part4 = katex.renderToString(`\\log_{10} {${aumento}} = \\log_{10} {${(1 + jurosDecimal).toFixed(2)}}^{t}`);
    this.part5 = katex.renderToString(`{${logAumento}} = t * ${logTaxa}`);
    this.part6 = katex.renderToString(`t = \\frac{${logAumento}} {${logTaxa}}`);

    const resultado = logAumento/logTaxa;

    this.resultado = katex.renderToString(`t \\approx ${(resultado).toFixed(2)}`);
  }
}
}
</script>


