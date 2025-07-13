
export interface RentabilidadeRealInputs {
  rentabilidadeNominal: number; // Rentabilidade nominal do investimento (ex: 0.10 para 10%)
  inflacao: number; // Taxa de inflação do período (ex: 0.05 para 5%)
}

export interface RentabilidadeRealOutputs {
  rentabilidadeReal: number; // Rentabilidade real do investimento
}

export function calculateRentabilidadeReal(
  inputs: RentabilidadeRealInputs,
  katexUtils: any
): RentabilidadeRealOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { rentabilidadeNominal, inflacao } = inputs;

  if (rentabilidadeNominal === null || inflacao === null) {
    clearKatexParts();
    return { rentabilidadeReal: 0 };
  }

  const rentabilidadeNominalDecimal = rentabilidadeNominal / 100;
  const inflacaoDecimal = inflacao / 100;

  // Fórmula da Rentabilidade Real: ((1 + Rentabilidade Nominal) / (1 + Inflação)) - 1
  const rentabilidadeReal = ((1 + rentabilidadeNominalDecimal) / (1 + inflacaoDecimal)) - 1;

  const formulaLatex = `
    \\begin{aligned}
    R_{real} &= \\left( \\frac{1 + R_{nominal}}{1 + I} \\right) - 1 \\\\
    R_{real} &= \\left( \\frac{1 + ${formatNumberForLatex(rentabilidadeNominalDecimal)}}{1 + ${formatNumberForLatex(inflacaoDecimal)}} \\right) - 1 \\\\
    R_{real} &= ${formatNumberForLatex(rentabilidadeReal)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);

  return { rentabilidadeReal };
}

export const formFieldsRentabilidadeReal = [
  { id: 'rentabilidadeNominal', label: 'calculator.rentabilidadeNominal', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'inflacao', label: 'calculator.inflacao', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
];
