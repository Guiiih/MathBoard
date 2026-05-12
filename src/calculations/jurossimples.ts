interface JurosSimplesValues {
  capital: number | null;
  taxaJuros: number | null;
  tempo: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

export function calculateJurosSimples(values: JurosSimplesValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { capital, taxaJuros, tempo, jurosTipo, tempoTipo } = values;

  if (capital === null || taxaJuros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = taxaJuros / 100;

  const jurosFinal = jurosTipo === tempoTipo ? jurosDecimal : parseFloat((jurosDecimal / 12).toFixed(7));

  const jurosSimples = capital * jurosFinal * tempo;

  const formulaLatex = `
    \\begin{aligned}
    J &= ${formatNumberForLatex(capital)} \\cdot ${formatNumberForLatex(jurosFinal)} \\cdot ${formatNumberForLatex(tempo)} \\\\
    J &= ${formatNumberForLatex(capital)} \\cdot ${formatNumberForLatex(jurosFinal * tempo)} \\\\
    J &= ${formatNumberForLatex(jurosSimples)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsJurosSimples = [
  { id: 'capital', label: 'calculator.capitalInicial', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'tempo', label: 'calculator.tempo', placeholder: 'calculator.placeholderNumber', type: 'time' }
];