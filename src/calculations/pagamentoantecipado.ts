interface PagamentoAntecipadoValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculatePagamentoAntecipado(values: PagamentoAntecipadoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts} = katexUtils;
  const { aumento, taxa } = values;

  const finalAumento = aumento !== null ? aumento : 1; 
  const finalTaxa = taxa !== null ? taxa : 10;   

  if (finalAumento === null || finalTaxa === null) {
    clearKatexParts();
    return;
  }

  const formulaLatex = `
    \\begin{aligned}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsPagamentoAntecipado = [];