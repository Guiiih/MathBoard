interface SeriePostecipadaValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateSeriePostecipada(values: SeriePostecipadaValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsSeriePostecipada = [];