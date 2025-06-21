interface AumentoCapitalSimplesValues {
  montante: number | null;
  capital: number | null;
  juros: number | null;
}

export function calculateAumentoCapitalSimplesV2(values: AumentoCapitalSimplesValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { montante, capital, juros } = values;

  if (montante === null || capital === null || juros === null || capital === 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros / 100;
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
  { id: 'montante', label: 'Montante', placeholder: 'R$ 0,00' },
  { id: 'capital', label: 'Capital Inicial', placeholder: 'R$ 0,00' },
  { id: 'juros', label: 'Taxa de Juros', placeholder: '0 %' }
];