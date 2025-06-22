interface ValorInicialCompostoValues {
  montante: number | null;
  taxaJuros: number | null;
  tempo: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

export function calculateValorInicialComposto(values: ValorInicialCompostoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { montante, taxaJuros, tempo, jurosTipo, tempoTipo } = values;

  if (montante === null || taxaJuros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = taxaJuros / 100;
  const tempoFinal = jurosTipo === tempoTipo ? tempo : tempo / 12;
  const basePotencia = 1 + jurosDecimal;
  const denominador = basePotencia ** tempoFinal;
  const valorInicialComposto = montante / denominador;

  const tempoFinalFormatted = formatNumberForLatex(tempoFinal);
  const basePotenciaFormatted = formatNumberForLatex(basePotencia);
  const denominadorFormatted = formatNumberForLatex(denominador);
  const valorInicialFormatted = formatNumberForLatex(valorInicialComposto);

  const approximationSymbol = jurosTipo === tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
      Vi &= \\frac{${formatNumberForLatex(montante)}}{(1 + ${formatNumberForLatex(jurosDecimal)})^{${tempoFinalFormatted}}} \\\\
      Vi &= \\frac{${formatNumberForLatex(montante)}}{(${basePotenciaFormatted})^{${tempoFinalFormatted}}} \\\\
      Vi &= \\frac{${formatNumberForLatex(montante)}}{${denominadorFormatted}} \\\\
      Vi & ${approximationSymbol} ${valorInicialFormatted}
      \\end{aligned}
    `;

  setKatexResult(formulaLatex);
}

export const formFieldsValorInicialComposto = [
  { id: 'montante', label: 'calculator.montante', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'tempo', label: 'calculator.tempo', placeholder: 'calculator.placeholderNumber', type: 'time' }
];