interface AumentoCapitalCompostoValues {
  aumento: number | null;
  juros: number | null;
}

export function calculateAumentoCapitalCompostoV1(values: AumentoCapitalCompostoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { aumento, juros } = values;

  if (aumento === null || juros === null || juros === 0 || aumento <= 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros / 100;
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
  { id: 'aumento', label: 'Aumento', placeholder: '0' },
  { id: 'juros', label: 'Taxa De Juros', placeholder: '0 %' }
];