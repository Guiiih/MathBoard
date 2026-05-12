interface ValorInicialValues {
  montante: number | null;
  taxaJuros: number | null;
  tempo: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

export function calculateValorInicialSimples(values: ValorInicialValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { montante, taxaJuros, tempo, jurosTipo, tempoTipo } = values;

  if (montante === null || taxaJuros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = taxaJuros / 100;
  const jurosFinal = jurosTipo === tempoTipo ? jurosDecimal : jurosDecimal / 12;
  const denominador = 1 + (jurosFinal * tempo);
  const valorInicialSimples = montante / denominador;

  const jurosFinalFormatted = formatNumberForLatex(jurosFinal);
  const denominadorFormatted = formatNumberForLatex(denominador);
  const valorInicialFormatted = formatNumberForLatex(valorInicialSimples);

  const approximationSymbol = jurosTipo === tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    Vi &= \\frac{${formatNumberForLatex(montante)}}{1 + (${jurosFinalFormatted} \\cdot ${formatNumberForLatex(tempo)})} \\\\
    Vi &= \\frac{${formatNumberForLatex(montante)}}{${denominadorFormatted}} \\\\
    Vi & ${approximationSymbol} ${valorInicialFormatted}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsValorInicialSimples = [
  { id: 'montante', label: 'calculator.montante', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'tempo', label: 'calculator.tempo', placeholder: 'calculator.placeholderNumber', type: 'time' }
];