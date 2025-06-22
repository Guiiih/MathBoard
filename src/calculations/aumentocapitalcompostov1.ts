interface AumentoCapitalCompostoValues {
  aumento: number | null;
  taxaJuros: number | null;
}

export function calculateAumentoCapitalCompostoV1(values: AumentoCapitalCompostoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { aumento, taxaJuros } = values;

  if (aumento === null || taxaJuros === null || taxaJuros === 0 || aumento <= 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = taxaJuros / 100;
  const basePotencia = 1 + jurosDecimal;
  const logAumento = Math.log10(aumento);
  const logTaxa = Math.log10(basePotencia);
  const resultadoFinal = logAumento / logTaxa;

  const aumentoFormatted = formatNumberForLatex(aumento);
  const jurosDecimalFormatted = formatNumberForLatex(jurosDecimal);
  const basePotenciaFormatted = formatNumberForLatex(basePotencia);
  const logAumentoFormatted = formatNumberForLatex(logAumento);
  const logTaxaFormatted = formatNumberForLatex(logTaxa);
  const resultadoFinalFormatted = formatNumberForLatex(resultadoFinal);

  const formulaLatex = `
    \\begin{aligned}
    ${aumentoFormatted}C &= C \\cdot (1 + ${jurosDecimalFormatted})^{t} \\\\
    ${aumentoFormatted}\\cancel{C} &= \\cancel{C} \\cdot (${basePotenciaFormatted})^{t} \\\\
    ${aumentoFormatted} &= ${basePotenciaFormatted}^{t} \\\\
    \\log_{10}(${aumentoFormatted}) &= \\log_{10}(${basePotenciaFormatted})^{t} \\\\
    ${logAumentoFormatted} &= t \\cdot ${logTaxaFormatted} \\\\
    t &= \\frac{${logAumentoFormatted}}{${logTaxaFormatted}} \\\\
    t & \\approx ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsAumentoCapitalCompostoV1 = [
  { id: 'aumento', label: 'calculator.aumento', placeholder: 'calculator.placeholderNumber' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage' }
];