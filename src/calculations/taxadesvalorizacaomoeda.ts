interface TaxaDesvalorizacaoMoedaValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateTaxaDesvalorizacaoMoeda(values: TaxaDesvalorizacaoMoedaValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsTaxaDesvalorizacaoMoeda = [];