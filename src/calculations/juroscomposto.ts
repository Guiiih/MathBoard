interface JurosCompostoValues {
  capital: number | null;
  taxaJuros: number | null;
  tempo: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

export function calculateJurosComposto(values: JurosCompostoValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { capital, taxaJuros, tempo, jurosTipo, tempoTipo } = values;

  if (capital === null || taxaJuros === null || tempo === null) {
    clearKatexParts();
    return;
  }

  const jurosDecimal = parseFloat((taxaJuros / 100).toFixed(7));

  const tempoFinal = jurosTipo === tempoTipo ? tempo : parseFloat((tempo / 12).toFixed(7));
  const montanteComposto = jurosTipo === tempoTipo
    ? capital * (1 + jurosDecimal) ** tempo
    : capital * (1 + jurosDecimal) ** (tempo / 12);

  const approximationSymbol = jurosTipo === tempoTipo ? '=' : '\\approx';

  const formulaLatex = `
    \\begin{aligned}
    M &= ${formatNumberForLatex(capital)} \\cdot (1 + ${formatNumberForLatex(jurosDecimal)})^{${formatNumberForLatex(tempoFinal)}} \\\\
    M &= ${formatNumberForLatex(capital)} \\cdot ${formatNumberForLatex(1 + jurosDecimal)}^{${formatNumberForLatex(tempoFinal)}} \\\\
    M &= ${formatNumberForLatex(capital)} \\cdot ${formatNumberForLatex(((1 + jurosDecimal) ** tempoFinal))} \\\\
    M & ${approximationSymbol} ${formatNumberForLatex(montanteComposto)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}

export const formFieldsJurosComposto = [
  { id: 'capital', label: 'calculator.capitalInicial', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'tempo', label: 'calculator.tempo', placeholder: 'calculator.placeholderNumber', type: 'time' }
];