<template>
  <div>
      <NavBar />
      <input-component :Label01="'Montante'" :Label02="'Taxa de Juros'" :Label03="'Numero de Parcelas'" :show-div="true"  @update="calculateResult($event)" />
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

    const capital  = parseFloat(inputs.input1.replace(',', '.'));
    const juros = parseFloat(inputs.input2.replace(',', '.'));
    const parcelas = parseFloat(inputs.input3.replace(',', '.'));

    const jurosDecimal = parseFloat((juros/100).toFixed(7).replace(/(\.0+|0+)$/, ""));

    const ParcelasFinal = inputs.jurosTipo === inputs.tempoTipo ? parcelas : parseFloat((parcelas / 12 ).toFixed(8).replace(/(\.0+|0+)$/, ""));
    const SAF = inputs.jurosTipo === inputs.tempoTipo ? capital * (jurosDecimal * (((1 + jurosDecimal) ** (parcelas))) / (((1+jurosDecimal) ** parcelas)-1)) : capital * (jurosDecimal * (((1 + jurosDecimal) ** (parcelas/12))) / (((1+jurosDecimal) ** (parcelas/12))-1)) ;

    this.part1 = katex.renderToString(`P = ${capital} * \\begin{pmatrix} \\frac{${jurosDecimal}*(1+${jurosDecimal})^{${ParcelasFinal}}} {(1+${jurosDecimal})^{${ParcelasFinal}}-1} \\end{pmatrix}`);
    this.part2 = katex.renderToString(`P = ${capital} * \\begin{pmatrix} \\frac{${jurosDecimal}*(${1+jurosDecimal})^{${ParcelasFinal}}} {(${1+jurosDecimal})^{${ParcelasFinal}}-1} \\end{pmatrix}`);
    this.part3 = katex.renderToString(`P = ${capital} * \\begin{pmatrix} \\frac{${jurosDecimal}*${((1+jurosDecimal) ** ParcelasFinal).toFixed(8).replace(/(\.0+|0+)$/, "")}} {${(((1+jurosDecimal) ** ParcelasFinal).toFixed(8).replace(/(\.0+|0+)$/, ""))}-1} \\end{pmatrix}`);
    this.part4 = katex.renderToString(`P = ${capital} * \\frac{${jurosDecimal * ((1+jurosDecimal) ** ParcelasFinal).toFixed(8).replace(/(\.0+|0+)$/, "")}} {${(((1+jurosDecimal) ** ParcelasFinal) - 1).toFixed(8).replace(/(\.0+|0+)$/, "")}} `);
    this.part5 = katex.renderToString(`P = ${capital} * ${((jurosDecimal * ((1+jurosDecimal) ** ParcelasFinal)) / (((1+jurosDecimal) ** ParcelasFinal) - 1)).toFixed(8).replace(/(\.0+|0+)$/, "")} `);

    if (inputs.jurosTipo === inputs.tempoTipo){
      this.resultado = katex.renderToString(`P \\approxeq ${(SAF).toFixed(2)}`);
    }else
      this.resultado = katex.renderToString(`Vi \\approx ${(SAF).toFixed(2)}`);
    
  }
}
}
</script>


