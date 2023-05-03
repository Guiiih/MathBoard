<template>

  <NavBar/>

  <div class="flex justify-center place-content-center pt-6 relative top-3">
    <div class=" p-4 text-center rounded-lg sm:p-8 bg-green-light sm:w-5/6 sm:h-32">
      <div class='flex flex-col gap-4 place-items-center place-content-center sm:flex-row'>

        <div class="flex flex-col text-left">
          <label for="Capital Inicial" class="block mb-1 text-sm font-medium text-input-text">Capital Inicial</label>
          <input v-model="capitalInicial" type="text" class="w-72 md:w-64 bg-input rounded-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="R$ 0,00">
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

import NavBar from '../components/NavBar.vue'

export default {
  name: 'JurosComposto',
  components: {
    NavBar,
  },
  data() {
    return {
      capitalInicial: '',
      juros: '',
      jurosTipo: 'anual',
      tempo: '',
      tempoTipo: 'anual',
      resultado: '',
      stepTempo: '',
      part1: '',
      part2: '',
      part3: '',
      part4: '',
      part5: '',
      part6: '',
      part7: ''
    }
  },
  methods: {
    calcular() {
      if (!this.capitalInicial ||!this.juros || !this.tempo) {
        this.resultado = '';
        return;
      }
      
      const capital = parseFloat(this.capitalInicial.replace(',', '.'));
      const juros = parseFloat(this.juros.replace(',', '.'));
      const tempo = parseInt(this.tempo);

      const jurosFinal = this.jurosTipo === this.tempoTipo ? juros/100 : (juros / 12)/100;

      const montanteComposto = capital * (1 + jurosFinal) ** (tempo);

      this.part1 = katex.renderToString(`{${aumento}}C = C *(1+${juros})^{t}`);
      this.part2 = katex.renderToString(`{${aumento}}\\cancel{C} = \\cancel{C} *(${1 + juros})^{t}`);
      this.part3 = katex.renderToString(`{${aumento}} = ${(1 + juros).toFixed(2)}^{t}`);
      this.part4 = katex.renderToString(`\\log_{10} {${aumento}} = \\log_{10} {${(1 + juros).toFixed(2)}}^{t}`);
      this.part5 = katex.renderToString(`{${logAumento}} = t * ${logTaxa}`);
      this.part6 = katex.renderToString(`t = \\frac{${logAumento}} {${logTaxa}}`);

      this.step01 = `M = ${capital} * (1 + ${jurosFinal})^{${tempo}}`;
      this.step02 = `M = ${capital} * (${1 + jurosFinal})`;
      this.step03 = `M = ${capital} * ${(1 + (jurosFinal) ** tempo).toFixed(5)}`;
      this.step04 = `J = ${montanteComposto.toFixed(2)} - ${capital}`;
      this.step05 = `J = R$ ${(montanteComposto - capital).toFixed(2)}`;

      this.resultado = katex.renderToString(`t \\approx ${(resultadoTipo).toFixed(2)}`);
      this.resultado = `M = R$ ${montanteComposto.toFixed(2)}`;
    }
  }
}
</script>

