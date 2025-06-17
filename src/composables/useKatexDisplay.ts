import { ref } from 'vue';
import katex from 'katex';

export function useKatexDisplay() {
  const resultado = ref(''); 

  const setKatexResult = (latexString: string) => {
    resultado.value = latexString ? katex.renderToString(latexString) : '';
  };

  const clearKatexParts = () => {
    resultado.value = '';
  };

  return {
    resultado,
    setKatexResult,
    clearKatexParts
  };
}