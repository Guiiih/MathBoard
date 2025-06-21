interface DescontoCompostoComercialValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateDescontoCompostoComercial(values: DescontoCompostoComercialValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsDescontoCompostoComercial = [];