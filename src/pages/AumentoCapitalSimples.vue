<template>
  <div>
      <NavBar />
      <input-component :Label01="'Aumento'" :Label02="'Taxa De Juros'" :show-div="false" @update="calculateResult($event)" />
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
          input2: '',
          input3: '',
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
    if (!inputs.input1 || !inputs.input2 ) {
      this.resultado = '';
      return;
    }

    const aumento = parseFloat(inputs.input1.replace(',', '.'));
    const taxa = parseFloat(inputs.input2.replace(',', '.'));

    const aumentoTempo = aumento - 1;

    const jurosAnual = this.jurosTipo === 'anual' ? taxa : taxa * 12;
    const juros = jurosAnual/100;

    const logAumento = Math.log10(this.aumento).toFixed(3);
    const logTaxa = Math.log10(1 +(juros)).toFixed(4);

    this.part1 = katex.renderToString(`{${aumentoTempo}}C = C * ${taxa} * t`);
    this.part2 = katex.renderToString(`{${aumentoTempo}}\\cancel{C} = \\cancel{C} * ${taxa} * t`);
    this.part3 = katex.renderToString(`\\frac{${aumentoTempo}} {1} \\xcancel{=} \\frac{${taxa}\\nobreakspace*\\nobreakspace {t}} {100}`);
    this.part4 = katex.renderToString(`${taxa}t = ${aumentoTempo*100} `);

    const resultado = (aumentoTempo*100)/taxa;

    const resultadoTipo = this.jurosTipo === 'anual' ? resultado.toFixed(2)  : (resultado.toFixed(2) * 12).toFixed(2) ;

    this.resultado = katex.renderToString(`t \\approx ${resultadoTipo}`);
  }
}
}
</script>


