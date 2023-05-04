<template lang="">
    <div class="flex place-content-center pt-6 relative top-3">
      <div class='flex flex-col gap-4 place-items-center place-content-center sm:flex-row p-4 text-center rounded-lg sm:p-8 bg-green-light sm:w-5/6 sm:h-32 w-5/6 '>

        <div class="flex flex-col text-left">
          <label class="block mb-1 text-sm font-medium text-input-text">{{Label01}}</label>
          <input v-model="input1" @input="updateInputs" type="text" class="w-64 lg:w-64 md:w-40 sm:text-xs lg:text-sm rounded-md border-b-4 bg-input border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="R$ 0,00">
        </div>
        
        <div class="flex flex-col text-left">
          <label class="block mb-1 text-sm font-medium text-input-text">{{Label02}}</label>
          <div class="flex">
            <input v-model="input2" @input="updateInputs" type="text" class="w-48 lg:w-56 md:w-28 lg:text-sm sm:text-xs rounded-tl-md rounded-bl-md border-b-4 bg-input border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="0 %">
            <select v-model="jurosTipo"  class="lg:w-16 sm:w-14 text-xs p-1 rounded-r-md border-b-4 border-l-2 text-gray-400 bg-input border-gray-300 focus:border-b-brand-green">
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>
        
        <div v-if="showDiv" class="flex flex-col text-left">
          <label class="block mb-1 text-sm font-medium text-input-text">{{Label03}}</label>
          <div class="flex">
            <input  v-model="input3" @input="updateInputs" type="number" class="w-48 lg:w-56 md:w-28 lg:text-sm sm:text-xs rounded-tl-md rounded-bl-md border-b-4 bg-input border-gray-300 focus:border-brand-green p-2 focus:outline-none" placeholder="0">
            <select v-model="tempoTipo"  class="w-16 lg:w-16 sm:w-14 text-xs p-1 rounded-r-md border-b-4 border-l-2 text-gray-400 bg-input border-gray-300 focus:border-b-brand-green">
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>
        
      </div>
  </div>
</template>
<script>
export default {
  props: {
    showDiv: Boolean,
    Label01: String,
    Label02: String,
    Label03: String,
  },
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
    }
  },
  methods: {
    updateInputs() {
      const inputs = {
        input1: this.input1,
        input2: this.input2,
        input3: this.input3
      };
      this.$emit('update', inputs);
    }
  }
}
</script>
