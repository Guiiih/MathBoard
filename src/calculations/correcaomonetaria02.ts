interface CorrecaoMonetaria02Values {
  aumento: number | null;
  taxa: number | null;
}

export function calculateCorrecaoMonetaria02(values: CorrecaoMonetaria02Values, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsCorrecaoMonetaria02 = [];