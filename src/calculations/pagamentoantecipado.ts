interface PagamentoAntecipadoValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculatePagamentoAntecipado(values: PagamentoAntecipadoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;

  const formulaLatex = ``;

  setKatexResult(formulaLatex);
}

export const formFieldsPagamentoAntecipado = [];