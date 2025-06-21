interface CorrecaoMonetaria01Values {
  aumento: number | null;
  taxa: number | null;
}

export function calculateCorrecaoMonetaria01(values: CorrecaoMonetaria01Values, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsCorrecaoMonetaria01 = [];