interface SafValues {
  capital: number | null;
  juros: number | null;
  parcelas: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

export function calculateSAF(values: SafValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { capital, juros, parcelas, jurosTipo, tempoTipo } = values;

  if (capital === null || juros === null || parcelas === null || parcelas <= 0) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = juros / 100;
  const parcelasFinal = jurosTipo === tempoTipo ? parcelas : (tempoTipo === 'anual' ? parcelas * 12 : parcelas / 12);

  const approximationSymbol = jurosTipo === tempoTipo ? '=' : '\\approx';

  const basePotencia = 1 + jurosDecimal;
  const potenciaResultado = basePotencia ** parcelasFinal;
  const numerador = jurosDecimal * potenciaResultado;
  const denominador = potenciaResultado - 1;
  const safCalculado = denominador > 0 ? capital * (numerador / denominador) : 0;

  const jurosDecimalFormatted = formatNumberForLatex(jurosDecimal);
  const potenciaResultadoFormatted = formatNumberForLatex(potenciaResultado);
  const numeradorFormatted = formatNumberForLatex(numerador);
  const denominadorFormatted = formatNumberForLatex(denominador);
  const fatorMultiplicadorFormatted = denominador > 0 ? formatNumberForLatex(numerador / denominador) : '0';
  const safFinalFormatted = formatNumberForLatex(safCalculado);

  const formulaLatex = `
    \\begin{aligned}
    P &= ${formatNumberForLatex(capital)} \\cdot \\frac{${jurosDecimalFormatted} \\cdot (1+${jurosDecimalFormatted})^{${formatNumberForLatex(parcelasFinal)}}}{(1+${jurosDecimalFormatted})^{${formatNumberForLatex(parcelasFinal)}}-1} \\\\
    P &= ${formatNumberForLatex(capital)} \\cdot \\frac{${jurosDecimalFormatted} \\cdot ${potenciaResultadoFormatted}}{${potenciaResultadoFormatted}-1} \\\\
    P &= ${formatNumberForLatex(capital)} \\cdot \\frac{${numeradorFormatted}}{${denominadorFormatted}} \\\\
    P &= ${formatNumberForLatex(capital)} \\cdot ${fatorMultiplicadorFormatted} \\\\
    P & ${approximationSymbol} ${safFinalFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}