<template>

  <NavBar/>

  <div class="flex justify-center place-content-center pt-6 relative top-3">
    <div class="w-5/6 h-32 p-4 text-center rounded-lg sm:p-8 bg-green-light">
      <div class='flex flex-row gap-4 place-content-center'>

        <div class="flex flex-col text-left">
          <label for="Capital Inicial" class="block mb-1 text-sm font-medium text-input-text">Capital Inicial</label>
          <input v-model="capitalInicial" type="text" class="bg-input rounded-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="R$ 0,00">
        </div>
        
        <div class="flex flex-col text-left">
          <label for="taxa de juros" class="block mb-1 text-sm font-medium text-input-text">Taxa de Juros</label>
          <div class="flex">
            <input v-model="juros" type="text" class="bg-input rounded-tl-md rounded-bl-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="0 %">
            <select v-model="jurosTipo" class="w-17 bg-input text-gray-400 text-sm rounded-r-md border-b-4 border-gray-300 border-l-2 block p-2">
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>
        
        <div class="flex flex-col text-left">
          <label for="Tempo" class="block mb-1 text-sm font-medium text-input-text">Tempo</label>
          <div class="flex">
            <input v-model="tempo" type="number" class="bg-input rounded-tl-md rounded-bl-md border-b-4 border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="0">
            <select v-model="tempoTipo" class="w-17 bg-input text-gray-400 text-sm rounded-r-md border-b-4 border-gray-300 border-l-2 block p-2">
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>

        <div class="relative top-6">
          <button @click="calcular" class="bg-brand-green w-20 h-10 text-white rounded-sm">Calcular</button>
        </div>
        
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="w-10/12 h-Table fixed p-4 text-center rounded-lg sm:p-8 bg-brand-green text-white">
      <div v-if="resultado" class="text-xl font-bold mt-4">
        <p>{{ step01 }}<sup>{{ stepTempo }}</sup></p>
        <p>{{ step02 }}<sup>{{ stepTempo }}</sup></p>
        <p>{{ step03 }}</p>
        <p>{{ resultado }}</p>
        <br>
        <p>{{ step04 }}</p>
        <p>{{ step05 }}</p>
      </div>
    </div>
  </div>

</template>
<script>

import NavBar from '../components/NavBar.vue'

export default {
  name: 'JurosSimples',
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
      step01: '',
      step02: '',
      step03: '',
      step04: '',
      step05: '',
    }
  },
  methods: {
    calcular() {
      if (!this.capitalInicial ||!this.aumento || !this.taxa) {
        this.resultado = '';
        return;
      }
      const capital = parseFloat(this.capitalInicial.replace(',', '.'));
      const juros = parseFloat(this.juros.replace(',', '.'));
      const tempo = parseInt(this.tempo);

      const jurosAnual = this.jurosTipo === 'anual' ? juros : juros * 12;
      const tempoAnual = this.tempoTipo === 'anual' ? tempo : tempo / 12;

      const montanteComposto = capital * (1 + jurosAnual / 100) ** (tempoAnual);

      this.stepTempo = `${tempoAnual}`
      this.step01 = `M = ${capital} * (1 + ${jurosAnual/100})`;
      this.step02 = `M = ${capital} * (${1 + jurosAnual/100})`;
      this.step03 = `M = ${capital} * ${((1 + (jurosAnual / 100)) ** tempoAnual).toFixed(5)}`;
      this.step04 = `J = ${montanteComposto.toFixed(2)} - ${capital}`;
      this.step05 = `J = R$ ${(montanteComposto - capital).toFixed(2)}`;

      this.resultado = `M = R$ ${montanteComposto.toFixed(2)}`;
    }
  }
}
</script>

