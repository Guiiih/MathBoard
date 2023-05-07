<template>
  <div>
      <NavBar />
      <input-component :Label01="'Aumento'" :placeholder="'0'" :Label04="'juros De Juros'" :show-div="false" :show-div4="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado" :part1="part1" :part2="part2" :part3="part3" :part4="part4" />
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
      jurosTipo: 'anual',
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

    const aumentoTempo = aumento - 1;

    const logAumento = Math.log10(aumento).toFixed(3);
    const logjuros = Math.log10(1 + juros).toFixed(4);

    this.part1 = katex.renderToString(`{${aumentoTempo}}C = C * ${juros} * t`);
    this.part2 = katex.renderToString(`{${aumentoTempo}}\\cancel{C} = \\cancel{C} * ${juros} * t`);
    this.part3 = katex.renderToString(`\\frac{${aumentoTempo}} {1} \\xcancel{=} \\frac{${juros}\\nobreakspace*\\nobreakspace {t}} {100}`);
    this.part4 = katex.renderToString(`${juros}t = ${aumentoTempo*100} `);

    const resultado = (aumentoTempo*100)/juros;

    this.resultado = katex.renderToString(`t \\approx ${resultado.toFixed(2)}`);
  }
}
}
</script>


