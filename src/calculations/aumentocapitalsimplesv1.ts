interface AumentoCapitalSimplesValues {
  aumento: number | null;
  taxaJuros: number | null;
}

export function calculateAumentoCapitalSimplesV1(values: AumentoCapitalSimplesValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { aumento, taxaJuros } = values;

  if (aumento === null || taxaJuros === null || taxaJuros === 0 || aumento <= 1) {
    clearKatexParts();
    return;
  }

  const aumentoComoJuro = aumento - 1;
  const jurosTotalMultiplicado = aumentoComoJuro * 100;
  const resultadoFinal = jurosTotalMultiplicado / taxaJuros;

  const aumentoComoJuroFormatted = formatNumberForLatex(aumentoComoJuro);
  const jurosTotalMultiplicadoFormatted = formatNumberForLatex(jurosTotalMultiplicado);
  const resultadoFinalFormatted = formatNumberForLatex(resultadoFinal);
  const jurosFormatted = formatNumberForLatex(taxaJuros);


  const formulaLatex = `
    \\begin{aligned}
    ${aumentoComoJuroFormatted}C &= C \\cdot \\frac{${jurosFormatted}}{100} \\cdot t \\\\
    ${aumentoComoJuroFormatted}\\cancel{C} &= \\cancel{C} \\cdot \\frac{${jurosFormatted}}{100} \\cdot t \\\\
    ${aumentoComoJuroFormatted} &= \\frac{${jurosFormatted} \\cdot t}{100} \\\\
    ${jurosFormatted}t &= ${jurosTotalMultiplicadoFormatted} \\\\
    t &= \\frac{${jurosTotalMultiplicadoFormatted}}{${jurosFormatted}} \\\\
    t &= ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsAumentoCapitalSimplesV1 = [
  { id: 'aumento', label: 'calculator.aumento', placeholder: 'calculator.placeholderNumber' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage' }
];