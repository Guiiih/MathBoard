interface DescontoSimplesComercialValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateDescontoSimplesComercial(values: DescontoSimplesComercialValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsDescontoSimplesComercial = [];