<template>

  <NavBar/>

  <div class="flex justify-center place-content-center pt-6 relative top-3">
    <div class=" p-4 text-center rounded-lg sm:p-8 bg-green-light sm:w-5/6 sm:h-32">
      <div class='flex flex-col gap-4 place-items-center place-content-center sm:flex-row'>
        
        <div class="flex flex-col text-left">
          <label for="Aumento" class="block mb-1 text-sm font-medium text-input-text">Aumento</label>
          <input v-model="aumento" type="text" class="w-72 md:w-64 bg-input rounded-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="R$ 0,00">
        </div>
        
        <div class="flex flex-col text-left">
          <label for="taxa de juros" class="block mb-1 text-sm font-medium text-input-text">Taxa de Juros</label>
          <div class="flex">
            <input v-model="taxa" type="text" class="w-56 md:w-48 bg-input rounded-tl-md rounded-bl-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="0 %">
            <select v-model="jurosTipo" class="md:w-16 bg-input text-gray-400 text-xs rounded-r-md border-b-4 border-gray-300 border-l-2 p-2">
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>
        <div class="relative sm:top-2.5">
          <button @click="calcularTempo" class="bg-brand-green w-20 h-10 text-white rounded-sm">Calcular</button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="w-10/12 h-Table fixed p-4 text-center rounded-lg sm:p-8 bg-brand-green text-white">
      <div v-if="resultado" class="text-xl font-bold mt-4">
        <div v-html="part1"></div>
        <div v-html="part2"></div>
        <div v-html="part3"></div>
        <div v-html="part4"></div>
        <div v-html="part5"></div>
        <div v-html="part6"></div>
        <div v-html="resultado"></div>
      </div>
    </div>
  </div>
</template>
<script>

import katex from 'katex';
import 'katex/dist/katex.min.css';

import NavBar from '../components/NavBar.vue'

export default {
  name: 'AumentoCapitalComposto',
  components: {
    NavBar,
  },
  data() {
    return {
      aumento: '',
      taxa: '',
      jurosTipo: 'anual',
      resultado: '',
      part1: '',
      part2: '',
      part3: '',
      part4: '',
      part5: '',
      part6: '',
    };
  },
  methods: {
    calcularTempo() {
      if (!this.aumento || !this.taxa) {
        this.resultado = '';
        return;
      }
      
      const aumento = parseFloat(this.aumento.replace(',', '.'));
      const taxa = parseFloat(this.taxa.replace(',', '.'));

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


