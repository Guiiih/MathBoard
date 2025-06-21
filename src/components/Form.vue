<template>
  <div class="form-wrapper">
    <div class='form-container'>

      <div v-for="field in fields" :key="field.id" class="form-field-group">
        <label class="form-label" :for="field.id">{{ field.label }}</label>

        <input
          v-if="!field.type || !['interest', 'time'].includes(field.type)"
          v-model="formValues[field.id]"
          @input="emitUpdate"
          @keydown="handleKeyDown($event, field.id)" type="text"
          class="form-input"
          :placeholder="field.placeholder"
          :id="field.id"
          aria-label="Campo de entrada"
        >

        <div v-if="['interest', 'time'].includes(field.type)" class="form-input-group">
          <input
            v-model="formValues[field.id]"
            @input="emitUpdate"
            @keydown="handleKeyDown($event, field.id)" type="text"
            class="form-input-grouped"
            :placeholder="field.placeholder"
            :id="field.id"
            aria-label="Campo de entrada"
          >
          <select
            v-model="formValues[field.type === 'interest' ? 'jurosTipo' : 'tempoTipo']"
            @change="emitUpdate"
            class="form-select"
            :id="field.type === 'interest' ? 'jurosTipo' : 'tempoTipo'"
            :aria-label="field.type === 'interest' ? 'Tipo de juros' : 'Tipo de tempo'"
          >
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
    if (field.type === 'interest') initialValues.jurosTipo = 'mensal';
    if (field.type === 'time') initialValues.tempoTipo = 'mensal';
  });
  formValues.value = initialValues;
}, { immediate: true });

function parseNumber(value) {
    if (typeof value !== 'string') return value;
    const cleanedValue = value.replace(',', '.');
    const num = parseFloat(cleanedValue);
    return isNaN(num) ? null : num;
}

function handleKeyDown(event, fieldId) {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
    return;
  }

  event.preventDefault();

  let currentValue = parseNumber(formValues.value[fieldId]);

  if (currentValue === null) {
    currentValue = 0;
  }
  let step = 1;

  if (event.key === 'ArrowUp') {
    currentValue += step;
  } else if (event.key === 'ArrowDown') {
    currentValue -= step;
  }

  formValues.value[fieldId] = String(currentValue).replace('.', ','); 
  emitUpdate();
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