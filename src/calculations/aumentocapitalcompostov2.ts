interface AumentoCapitalCompostoValues {
  montante: number | null;
  capital: number | null;
  taxaJuros: number | null;
}

export function calculateAumentoCapitalCompostoV2(values: AumentoCapitalCompostoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { montante, capital, taxaJuros } = values;

  if (montante === null || capital === null || taxaJuros === null || capital === 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = taxaJuros / 100;
  const relacaoCapital = montante / capital;
  const logRelacao = Math.log10(relacaoCapital);
  const logTaxa = Math.log10(1 + jurosDecimal);
  const resultadoFinal = logRelacao / logTaxa;

  const montanteFormatted = formatNumberForLatex(montante);
  const capitalFormatted = formatNumberForLatex(capital);
  const jurosDecimalFormatted = formatNumberForLatex(jurosDecimal);
  const relacaoCapitalFormatted = formatNumberForLatex(relacaoCapital);
  const logRelacaoFormatted = formatNumberForLatex(logRelacao);
  const logTaxaFormatted = formatNumberForLatex(logTaxa);
  const resultadoFinalFormatted = formatNumberForLatex(resultadoFinal);

  const formulaLatex = `
    \\begin{aligned}
    ${montanteFormatted} &= ${capitalFormatted} \\cdot (1 + ${jurosDecimalFormatted})^{t} \\\\
    \\frac{${montanteFormatted}}{${capitalFormatted}} &= (1 + ${jurosDecimalFormatted})^{t} \\\\
    ${relacaoCapitalFormatted} &= (1 + ${jurosDecimalFormatted})^{t} \\\\
    \\log_{10}(${relacaoCapitalFormatted}) &= \\log_{10}(${formatNumberForLatex(1 + jurosDecimal)})^{t} \\\\
    ${logRelacaoFormatted} &= t \\cdot ${logTaxaFormatted} \\\\
    t &= \\frac{${logRelacaoFormatted}}{${logTaxaFormatted}} \\\\
    t & \\approx ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsAumentoCapitalCompostoV2 = [
  { id: 'montante', label: 'calculator.montante', placeholder: 'calculator.placeholderCurrency' },
  { id: 'capital', label: 'calculator.capitalInicial', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage' }
];