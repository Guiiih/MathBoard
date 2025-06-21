interface DescontoSimplesRacionalValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateDescontoSimplesRacional(values: DescontoSimplesRacionalValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsDescontoSimplesRacional = [];