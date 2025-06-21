interface SsaValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateSSA(values: SsaValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsSSA = [];