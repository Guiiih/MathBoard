interface AumentoCapitalCompostoValues {
  montante: number | null;
  capital: number | null;
  juros: number | null;
}

export function calculateAumentoCapitalCompostoV2(values: AumentoCapitalCompostoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { montante, capital, juros } = values;

  if (montante === null || capital === null || juros === null || capital === 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros / 100;
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
  { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
  { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
  { id: 'juros', label: 'Taxa de Juros', placeholder: '0 %' }
];