<template>
  <div class="flex place-content-center relative pt-6 top-3">
    <div class='flex flex-col gap-4 place-items-center place-content-center sm:flex-row p-8 text-center rounded-lg sm:p-8 bg-green-light sm:w-5/6 sm:h-32 w-5/6 '>

      <div v-for="field in fields" :key="field.id" class="flex flex-col text-left">
        <label class="block mb-1 text-sm font-medium text-input-text">{{ field.label }}</label>
        
        <input 
          v-if="!field.type || !['interest', 'time'].includes(field.type)"
          v-model="formValues[field.id]" 
          @input="emitUpdate" 
          type="text" 
          class="w-64 lg:w-64 md:w-40 sm:text-xs lg:text-sm rounded-md border-b-4 bg-input border-gray-300 focus:border-brand-green p-2 focus:outline-none" 
          :placeholder="field.placeholder">

        <div v-if="['interest', 'time'].includes(field.type)" class="flex">
          <input 
            v-model="formValues[field.id]" 
            @input="emitUpdate" 
            type="text" 
            class="w-48 lg:w-56 md:w-28 lg:text-sm sm:text-xs rounded-tl-md rounded-bl-md border-b-4 bg-input border-gray-300 focus:border-brand-green p-2 focus:outline-none" 
            :placeholder="field.placeholder">
          <select 
            v-model="formValues[field.type === 'interest' ? 'jurosTipo' : 'tempoTipo']" 
            @change="emitUpdate" 
            class="lg:w-16 md:w-16 sm:w-14 text-xs p-1 rounded-r-md border-b-4 border-l-2 text-gray-400 bg-input border-gray-300 focus:border-b-brand-green">
              <option value="anual">Anual</option>
              <option value="mensal">Mensal</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  fields: {
    type: Array,
    required: true,
    default: () => []
  }
});

const emit = defineEmits(['update']);

const formValues = ref({});

watch(() => props.fields, (newFields) => {
  const initialValues = {};
  newFields.forEach(field => {
    initialValues[field.id] = '';
    if (field.type === 'interest') initialValues.jurosTipo = 'anual';
    if (field.type === 'time') initialValues.tempoTipo = 'anual';
  });
  formValues.value = initialValues;
}, { immediate: true });

function parseNumber(value) {
    if (typeof value !== 'string') return value;
    const cleanedValue = value.replace(',', '.');
    const num = parseFloat(cleanedValue);
    return isNaN(num) ? null : num; 
}

function emitUpdate() {
  const valuesToEmit = { ...formValues.value };
  for (const key in valuesToEmit) {
    if (key !== 'jurosTipo' && key !== 'tempoTipo') {
      valuesToEmit[key] = parseNumber(valuesToEmit[key]);
    }
  }
  emit('update', valuesToEmit);
}
</script>