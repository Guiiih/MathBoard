<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'" :Label02="'Taxa De Juros'" :Label03="'Tempo'"  :show-div="true" @update="calculateResult($event)" />
      <result-component :resultado="resultado" :part1="part1" :part2="part2" :part3="part3" />
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

    const montante = parseFloat(inputs.input1.replace(',', '.'));
    const juros = parseFloat(inputs.input2.replace(',', '.'));
    const tempo = parseFloat(inputs.input3.replace(',', '.'));

    const jurosFinal = inputs.jurosTipo === inputs.tempoTipo ? juros/100 : (juros / 12)/100;

    const ValorInicialComposto = montante / (1 + jurosFinal) ** (tempo);

    this.part1 = katex.renderToString(`Vi = ${montante} / (1 + ${jurosFinal})^{${tempo}}`);
    this.part2 = katex.renderToString(`Vi = ${montante} / ${1+jurosFinal}^{${tempo}}`);
    this.part3 = katex.renderToString(`Vi = ${montante} / ${((1+jurosFinal)**tempo).toFixed(6)}`);

    this.resultado = katex.renderToString(`Vi = ${ValorInicialComposto.toFixed(2)}`);
  }
}
}
</script>


