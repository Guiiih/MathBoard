<template>
  <div>
      <NavBar />
      <input-component :Label01="'Aumento'" :Label02="'Taxa De Juros'" :show-div="false" @update="calculateResult($event)" />
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
          input2: '',
          input3: '',
      },
      resultado: '',
      part1: '',
      part2: '',
      part3: '',
      part4: '',
      part5: '',
      part6: '',
      jurosTipo: 'anual',
      tempoTipo: 'anual',
  }
},
methods: {
  calculateResult(inputs) {
    if (!inputs.input1 || !inputs.input2 ) {
      this.resultado = '';
      return;
    }

    const aumento = parseFloat(inputs.input1.replace(',', '.'));
    const taxa = parseFloat(inputs.input2.replace(',', '.'));

    const juros = taxa/100;

    const logAumento = Math.log10(this.aumento).toFixed(3);
    const logTaxa = Math.log10(1 +(juros)).toFixed(4);

    this.part1 = katex.renderToString(`{${aumento}}C = C *(1+${juros})^{t}`);
    this.part2 = katex.renderToString(`{${aumento}}\\cancel{C} = \\cancel{C} *(${1 + juros})^{t}`);
    this.part3 = katex.renderToString(`{${aumento}} = ${(1 + juros).toFixed(2)}^{t}`);
    this.part4 = katex.renderToString(`\\log_{10} {${aumento}} = \\log_{10} {${(1 + juros).toFixed(2)}}^{t}`);
    this.part5 = katex.renderToString(`{${logAumento}} = t * ${logTaxa}`);
    this.part6 = katex.renderToString(`t = \\frac{${logAumento}} {${logTaxa}}`);

    const resultado = logAumento/logTaxa;

    const resultadoTipo = this.jurosTipo === 'anual' ? resultado  : resultado * 12 ;

    this.resultado = katex.renderToString(`t \\approx ${(resultadoTipo).toFixed(2)}`);
  }
}
}
</script>


