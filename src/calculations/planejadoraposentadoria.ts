
export interface PlanejadorAposentadoriaInputs {
  idadeAtual: number; // Idade atual do usuário
  idadeAposentadoriaDesejada: number; // Idade em que o usuário deseja se aposentar
  despesasMensaisEstimadas: number; // Despesas mensais estimadas na aposentadoria
  rentabilidadeEsperadaAnual: number; // Rentabilidade anual esperada dos investimentos (ex: 0.08 para 8%)
  inflacaoAnual: number; // Inflação anual esperada (ex: 0.03 para 3%)
}

export interface PlanejadorAposentadoriaOutputs {
  valorTotalNecessario: number; // Valor total necessário para se aposentar
  anosRestantes: number; // Anos restantes até a aposentadoria
}

export function calculatePlanejadorAposentadoria(
  inputs: PlanejadorAposentadoriaInputs,
  katexUtils: any
): PlanejadorAposentadoriaOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const {
    idadeAtual,
    idadeAposentadoriaDesejada,
    despesasMensaisEstimadas,
    rentabilidadeEsperadaAnual,
    inflacaoAnual,
  } = inputs;

  if (idadeAtual === null || idadeAposentadoriaDesejada === null || despesasMensaisEstimadas === null || rentabilidadeEsperadaAnual === null || inflacaoAnual === null) {
    clearKatexParts();
    return { valorTotalNecessario: 0, anosRestantes: 0 };
  }

  const anosRestantes = idadeAposentadoriaDesejada - idadeAtual;
  const rentabilidadeEsperadaAnualDecimal = rentabilidadeEsperadaAnual / 100;
  const inflacaoAnualDecimal = inflacaoAnual / 100;

  // Ajusta as despesas mensais pela inflação até a aposentadoria
  const despesasMensaisAjustadas = despesasMensaisEstimadas * Math.pow(1 + inflacaoAnualDecimal, anosRestantes);

  // Valor anual necessário na aposentadoria
  const despesasAnuaisAjustadas = despesasMensaisAjustadas * 12;

  const rentabilidadeRealAnual = ((1 + rentabilidadeEsperadaAnualDecimal) / (1 + inflacaoAnualDecimal)) - 1;

  let valorTotalNecessario = 0;
  let formulaLatex = '';

  if (rentabilidadeRealAnual > 0) {
    valorTotalNecessario = despesasAnuaisAjustadas / rentabilidadeRealAnual;
    formulaLatex = `
      \\begin{aligned}
      D_{ajustadas} &= D_{mensais} \\cdot (1 + I)^{Anos} \\\\
      D_{ajustadas} &= ${formatNumberForLatex(despesasMensaisEstimadas)} \\cdot (1 + ${formatNumberForLatex(inflacaoAnualDecimal)})^{${formatNumberForLatex(anosRestantes)}} \\\\
      D_{ajustadas} &= ${formatNumberForLatex(despesasMensaisAjustadas)} \\\\
      \\\\ 
      R_{real} &= \\left( \\frac{1 + R_{esperada}}{1 + I} \\right) - 1 \\\\
      R_{real} &= \\left( \\frac{1 + ${formatNumberForLatex(rentabilidadeEsperadaAnualDecimal)}}{1 + ${formatNumberForLatex(inflacaoAnualDecimal)}} \\right) - 1 \\\\
      R_{real} &= ${formatNumberForLatex(rentabilidadeRealAnual)} \\\\
      \\\\ 
      V_{necessario} &= \\frac{D_{anuais\\_ajustadas}}{R_{real}} \\\\
      V_{necessario} &= \\frac{${formatNumberForLatex(despesasAnuaisAjustadas)}}{${formatNumberForLatex(rentabilidadeRealAnual)}} \\\\
      V_{necessario} &= ${formatNumberForLatex(valorTotalNecessario)}
      \\end{aligned}
    `;
  } else {
    valorTotalNecessario = Infinity;
    formulaLatex = `
      \\text{Não é possível calcular o valor necessário com rentabilidade real zero ou negativa.}
    `;
  }

  setKatexResult(formulaLatex);

  return { valorTotalNecessario, anosRestantes };
}

export const formFieldsPlanejadorAposentadoria = [
  { id: 'idadeAtual', label: 'calculator.idadeAtual', placeholder: 'calculator.placeholderNumber', type: 'number' },
  { id: 'idadeAposentadoriaDesejada', label: 'calculator.idadeAposentadoriaDesejada', placeholder: 'calculator.placeholderNumber', type: 'number' },
  { id: 'despesasMensaisEstimadas', label: 'calculator.despesasMensaisEstimadas', placeholder: 'calculator.placeholderCurrency' },
  { id: 'rentabilidadeEsperadaAnual', label: 'calculator.rentabilidadeEsperadaAnual', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'inflacaoAnual', label: 'calculator.inflacaoAnual', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
];
