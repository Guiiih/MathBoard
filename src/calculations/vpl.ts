
export interface VPLInputs {
  taxaDesconto: number; // Taxa de desconto (custo de capital) (ex: 0.10 para 10%)
  investimentoInicial: number; // Investimento inicial (geralmente negativo)
  fluxosDeCaixa: number[]; // Array de fluxos de caixa futuros
}

export interface VPLOutputs {
  vpl: number; // Valor Presente Líquido
}

export function calculateVPL(
  inputs: VPLInputs,
  katexUtils: any
): VPLOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { taxaDesconto, investimentoInicial, fluxosDeCaixa } = inputs;

  if (taxaDesconto === null || investimentoInicial === null || !fluxosDeCaixa || fluxosDeCaixa.length === 0) {
    clearKatexParts();
    return { vpl: 0 };
  }

  const taxaDescontoDecimal = taxaDesconto / 100;

  let vpl = investimentoInicial; // Começa com o investimento inicial
  let formulaLatex = `
    \\begin{aligned}
    VPL &= ${formatNumberForLatex(investimentoInicial)} \\
  `;

  for (let i = 0; i < fluxosDeCaixa.length; i++) {
    const fluxoDescontado = fluxosDeCaixa[i] / Math.pow(1 + taxaDescontoDecimal, i + 1);
    vpl += fluxoDescontado;
    formulaLatex += `
      &+ \\frac{${formatNumberForLatex(fluxosDeCaixa[i])}}{(1 + ${formatNumberForLatex(taxaDescontoDecimal)})^{${i + 1}}}} \\
    `;
  }

  formulaLatex += `
    VPL &= ${formatNumberForLatex(vpl)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);

  return { vpl };
}

export const formFieldsVPL = [
  { id: 'taxaDesconto', label: 'calculator.taxaDesconto', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'investimentoInicial', label: 'calculator.investimentoInicial', placeholder: 'calculator.placeholderCurrency' },
  { id: 'fluxosDeCaixa', label: 'calculator.fluxosDeCaixa', placeholder: 'calculator.placeholderCurrency', type: 'array' },
];
