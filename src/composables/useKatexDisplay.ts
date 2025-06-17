import { ref } from 'vue';
import katex from 'katex';

export function useKatexDisplay() {
  const resultado = ref('');

  const renderKatex = (latexString: string) => {
    return latexString ? katex.renderToString(latexString, { throwOnError: false }) : '';
  };

  const setKatexResult = (latexString: string) => {
    resultado.value = renderKatex(latexString);
  };

  const clearKatexParts = () => {
    resultado.value = '';
  };

  const parseNumber = (value: string | number | null): number | null => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const stringValue = String(value);
    const cleanedValue = stringValue.replace(',', '.');
    const num = parseFloat(cleanedValue);
    return isNaN(num) ? null : num;
  };

  return {
    resultado,
    setKatexResult,
    clearKatexParts,
    parseNumber
  };
}