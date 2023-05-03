<template>

  <NavBar/>

  <div class="flex justify-center place-content-center pt-6 relative top-3">
    <div class=" p-4 text-center rounded-lg sm:p-8 bg-green-light sm:w-5/6 sm:h-32">
      <div class='flex flex-col gap-4 place-items-center place-content-center sm:flex-row'>

        <div class="flex flex-col text-left">
          <label for="montante" class="block mb-1 text-sm font-medium text-input-text">Montante</label>
          <input v-model="montante" type="text" class="w-72 md:w-64 bg-input rounded-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="R$ 0,00">
        </div>
        
        <div class="flex flex-col text-left">
          <label for="taxa de juros" class="block mb-1 text-sm font-medium text-input-text">Taxa de Juros</label>
          <div class="flex">
            <input v-model="juros" type="text" class="w-56 md:w-48 bg-input rounded-tl-md rounded-bl-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="0 %">
            <select v-model="jurosTipo" class="md:w-16 bg-input text-gray-400 text-xs rounded-r-md border-b-4 border-gray-300 border-l-2 p-2">
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>
        
        <div class="flex flex-col text-left">
          <label for="Tempo" class="block mb-1 text-sm font-medium text-input-text">Tempo</label>
          <div class="flex">
            <input v-model="tempo" type="number" class="w-56 md:w-48 bg-input rounded-tl-md rounded-bl-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="0">
            <select v-model="tempoTipo" class="md:w-16 bg-input text-gray-400 text-xs rounded-r-md border-b-4 border-gray-300 border-l-2 p-2">
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>

        <div class="relative sm:top-2.5">
          <button @click="calcular" class="bg-brand-green w-20 h-10 text-white rounded-sm">Calcular</button>
        </div>
        
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="w-10/12 h-Table fixed p-4 text-center rounded-lg sm:p-8 bg-brand-green text-white">
      <div v-if="resultado" class="text-xl font-bold mt-4">
        <div v-html="part1"></div>
        <div v-html="part2"></div>
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
  name: 'JurosSimples',
  components: {
    NavBar,
  },
  data() {
    return {
      montante: '',
      juros: '',
      jurosTipo: 'anual',
      tempo: '',
      tempoTipo: 'anual',
      resultado: '',
      part1: '',
      part2: '',
    }
  },
  methods: {
    calcular() {
      if (!this.montante ||!this.juros || !this.tempo) {
        this.resultado = '';
        return;
      }
      
      const valorFinal = parseFloat(this.montante.replace(',', '.'));
      const juros = parseFloat(this.juros.replace(',', '.'));
      const tempo = parseInt(this.tempo);

      const jurosFinal = this.jurosTipo === this.tempoTipo ? juros/100 : (juros / 12)/100;

      const ValorInicialSimples = valorFinal / (1+(jurosFinal) * (tempo));

      this.part1 = katex.renderToString(`Vi = ${valorFinal} / (1 + ${jurosFinal} * ${tempo})`);
      this.part2 = katex.renderToString(`Vi = ${valorFinal} / ${1 + (jurosFinal/100) * tempo}`);
      
      this.resultado = katex.renderToString(`Vi = R$ ${ValorInicialSimples.toFixed(2)}`);
    }
  }
}
</script>

