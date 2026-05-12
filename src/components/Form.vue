<template>
  <div class="form-wrapper">
    <div class='form-container'>
      <div v-for="field in fields" :key="field.id" class="form-field-group">
        <label class="form-label" :for="field.id">{{ $t(field.label) }}</label> <input
          v-if="!field.type || !['interest', 'time'].includes(field.type)"
          v-model="formValues[field.id]"
          @input="handleInput(field.id)"
          @keydown="handleKeyDown($event, field.id)" type="text"
          class="form-input"
          :placeholder="$t(field.placeholder)" :id="field.id"
          aria-label="Campo de entrada"
        >

        <div v-if="['interest', 'time'].includes(field.type)" class="form-input-group">
          <input
            v-model="formValues[field.id]"
            @input="handleInput(field.id)"
            @keydown="handleKeyDown($event, field.id)" type="text"
            class="form-input-grouped"
            :placeholder="$t(field.placeholder)" :id="field.id"
            aria-label="Campo de entrada"
          >
          <select
            v-model="formValues[field.type === 'interest' ? 'jurosTipo' : 'tempoTipo']"
            @change="emitUpdate"
            class="form-select"
            :id="field.type === 'interest' ? 'jurosTipo' : 'tempoTipo'"
            :aria-label="field.type === 'interest' ? 'Tipo de juros' : 'Tipo de tempo'"
          >
              <option value="anual">{{ $t('calculator.anual') }}</option> <option value="mensal">{{ $t('calculator.mensal') }}</option> </select>
        </div>
        <div class="error-message-container">
          <p v-if="errors[field.id]" class="error-message">{{ $t('error.errorMessageInvalidNumber') }}</p> </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { useI18n } from 'vue-i18n'; 

const { t } = useI18n(); 

const props = defineProps({
  fields: {
    type: Array,
    required: true,
    default: () => []
  }
});

const emit = defineEmits(['update']);

const formValues = ref({});
const errors = ref({});

watch(() => props.fields, (newFields) => {
  const initialValues = {};
  const initialErrors = {};
  newFields.forEach(field => {
    initialValues[field.id] = '';
    initialErrors[field.id] = '';
    if (field.type === 'interest') initialValues.jurosTipo = 'mensal';
    if (field.type === 'time') initialValues.tempoTipo = 'mensal';
  });
  formValues.value = initialValues;
  errors.value = initialErrors;
}, { immediate: true });

function parseNumber(value) {
    if (typeof value !== 'string') return value;
    const cleanedValue = value.replace(',', '.');
    const num = parseFloat(cleanedValue);
    return isNaN(num) ? null : num;
}

function validateField(fieldId) {
  const value = formValues.value[fieldId];
  if (value === '') {
    errors.value[fieldId] = '';
    return true;
  }
  const parsedValue = parseNumber(value);
  if (parsedValue === null) {
    errors.value[fieldId] = t('calculator.errorMessageInvalidNumber'); 
    return false;
  }
  errors.value[fieldId] = '';
  return true;
}

function handleInput(fieldId) {
  validateField(fieldId);
  emitUpdate();
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
  validateField(fieldId);
  emitUpdate();
}

function emitUpdate() {
  const valuesToEmit = { ...formValues.value };
  let allValid = true;

  for (const key in valuesToEmit) {
    if (key !== 'jurosTipo' && key !== 'tempoTipo') {
      const isValid = validateField(key);
      if (!isValid) {
        allValid = false;
      }
      valuesToEmit[key] = parseNumber(valuesToEmit[key]);
    }
  }

  if (allValid) {
    emit('update', valuesToEmit);
  } else {
    emit('update', {});
  }
}
</script>