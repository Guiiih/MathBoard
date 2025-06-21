interface DescontoCompostoRacionalValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateDescontoCompostoRacional(values: DescontoCompostoRacionalValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsDescontoCompostoRacional = [];