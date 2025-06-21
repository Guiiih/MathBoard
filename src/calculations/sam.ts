interface SamValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateSAM(values: SamValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsSAM = [];