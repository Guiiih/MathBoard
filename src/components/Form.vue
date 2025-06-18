<template>
  <div class="form-wrapper">
    <div class='form-container'>

      <div v-for="field in fields" :key="field.id" class="form-field-group">
        <label class="form-label">{{ field.label }}</label>
        
        <input 
          v-if="!field.type || !['interest', 'time'].includes(field.type)"
          v-model="formValues[field.id]" 
          @input="emitUpdate" 
          type="text" 
          class="form-input" 
          :placeholder="field.placeholder">

        <div v-if="['interest', 'time'].includes(field.type)" class="form-input-group">
          <input 
            v-model="formValues[field.id]" 
            @input="emitUpdate" 
            type="text" 
            class="form-input-grouped"
            :placeholder="field.placeholder">
          <select 
            v-model="formValues[field.type === 'interest' ? 'jurosTipo' : 'tempoTipo']" 
            @change="emitUpdate" 
            class="form-select">
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