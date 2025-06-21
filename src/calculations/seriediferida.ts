interface SerieDiferidaValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateSerieDiferida(values: SerieDiferidaValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsSerieDiferida = [];