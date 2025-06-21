interface SeriePostecipadaValues {
  aumento: number | null;
  taxa: number | null;
}

export function calculateSeriePostecipada(values: SeriePostecipadaValues, katexUtils: any) {
  const { setKatexResult, clearKatexParts, parseNumber, approximationSymbol } = katexUtils;
  const { aumento, taxa } = values;

  if (aumento === null || taxa === null) {
    clearKatexParts();
    return;
  }

  const juros = taxa / 100;

  const logAumento = Math.log10(aumento).toFixed(3);
  const logTaxa = Math.log10(1 + (juros)).toFixed(4);

  const resultadoCalculado = parseFloat(logAumento) / parseFloat(logTaxa);

  const formulaLatex = `
    \\begin{aligned}
    {${aumento}}C &= C \\cdot (1+${juros})^{t} \\\\
    {${aumento}}\\cancel{C} &= \\cancel{C} \\cdot (${1 + juros})^{t} \\\\
    {${aumento}} &= ${(1 + juros).toFixed(2)}^{t} \\\\
    \\log_{10} {${aumento}} &= \\log_{10} {${(1 + juros).toFixed(2)}}^{t} \\\\
    {${logAumento}} &= t \\cdot ${logTaxa} \\\\
    t &= \\frac{${logAumento}} {${logTaxa}} \\\\
    t & ${approximationSymbol} ${(resultadoCalculado).toFixed(2)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);
}