interface AumentoCapitalSimplesValues {
  montante: number | null;
  capital: number | null;
  taxaJuros: number | null;
}

export function calculateAumentoCapitalSimplesV2(values: AumentoCapitalSimplesValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { montante, capital, taxaJuros } = values;

  if (montante === null || capital === null || taxaJuros === null || capital === 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = taxaJuros / 100;
  const jurosTotal = montante - capital;
  const denominador = capital * jurosDecimal;
  const resultadoFinal = denominador !== 0 ? jurosTotal / denominador : 0;

  const montanteFormatted = formatNumberForLatex(montante);
  const capitalFormatted = formatNumberForLatex(capital);
  const jurosDecimalFormatted = formatNumberForLatex(jurosDecimal);
  const jurosTotalFormatted = formatNumberForLatex(jurosTotal);
  const denominadorFormatted = formatNumberForLatex(denominador);
  const resultadoFinalFormatted = formatNumberForLatex(resultadoFinal);

  const formulaLatex = `
    \\begin{aligned}
    t &= \\frac{${montanteFormatted} - ${capitalFormatted}}{${capitalFormatted} \\cdot ${jurosDecimalFormatted}} \\\\
    t &= \\frac{${jurosTotalFormatted}}{${denominadorFormatted}} \\\\
    t & \\approx ${resultadoFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsAumentoCapitalSimplesV2 = [
  { id: 'montante', label: 'calculator.montante', placeholder: 'calculator.placeholderCurrency' },
  { id: 'capital', label: 'calculator.capitalInicial', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage' }
];