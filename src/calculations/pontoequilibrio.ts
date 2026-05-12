
export interface PontoEquilibrioInputs {
  custosFixosTotais: number; // Custos fixos totais da empresa
  precoVendaPorUnidade: number; // Preço de venda por unidade do produto/serviço
  custoVariavelPorUnidade: number; // Custo variável por unidade do produto/serviço
}

export interface PontoEquilibrioOutputs {
  pontoEquilibrioUnidades: number; // Ponto de equilíbrio em unidades
  pontoEquilibrioValor: number; // Ponto de equilíbrio em valor monetário
}

export function calculatePontoEquilibrio(
  inputs: PontoEquilibrioInputs,
  katexUtils: any
): PontoEquilibrioOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const {
    custosFixosTotais,
    precoVendaPorUnidade,
    custoVariavelPorUnidade,
  } = inputs;

  if (custosFixosTotais === null || precoVendaPorUnidade === null || custoVariavelPorUnidade === null) {
    clearKatexParts();
    return { pontoEquilibrioUnidades: 0, pontoEquilibrioValor: 0 };
  }

  // Margem de Contribuição por Unidade
  const margemContribuicaoPorUnidade = precoVendaPorUnidade - custoVariavelPorUnidade;

  let pontoEquilibrioUnidades = 0;
  let pontoEquilibrioValor = 0;
  let formulaLatex = '';

  if (margemContribuicaoPorUnidade > 0) {
    pontoEquilibrioUnidades = custosFixosTotais / margemContribuicaoPorUnidade;
    pontoEquilibrioValor = pontoEquilibrioUnidades * precoVendaPorUnidade;

    formulaLatex = `
      \\begin{aligned}
      MC_{unidade} &= PV_{unidade} - CV_{unidade} \\
      MC_{unidade} &= ${formatNumberForLatex(precoVendaPorUnidade)} - ${formatNumberForLatex(custoVariavelPorUnidade)} \\
      MC_{unidade} &= ${formatNumberForLatex(margemContribuicaoPorUnidade)} \\
      \\\\ 
      PE_{unidades} &= \\frac{CF}{MC_{unidade}} \\
      PE_{unidades} &= \\frac{${formatNumberForLatex(custosFixosTotais)}}{${formatNumberForLatex(margemContribuicaoPorUnidade)}} \\
      PE_{unidades} &= ${formatNumberForLatex(pontoEquilibrioUnidades)} \\
      \\\\ 
      PE_{valor} &= PE_{unidades} \\times PV_{unidade} \\
      PE_{valor} &= ${formatNumberForLatex(pontoEquilibrioUnidades)} \\times ${formatNumberForLatex(precoVendaPorUnidade)} \\
      PE_{valor} &= ${formatNumberForLatex(pontoEquilibrioValor)}
      \\end{aligned}
    `;
  } else {
    // Se a margem de contribuição for zero ou negativa, o ponto de equilíbrio é inatingível
    pontoEquilibrioUnidades = Infinity;
    pontoEquilibrioValor = Infinity;
    formulaLatex = `
      \\text{Não é possível calcular o ponto de equilíbrio com margem de contribuição zero ou negativa.}
    `;
  }

  setKatexResult(formulaLatex);

  return { pontoEquilibrioUnidades, pontoEquilibrioValor };
}

export const formFieldsPontoEquilibrio = [
  { id: 'custosFixosTotais', label: 'calculator.custosFixosTotais', placeholder: 'calculator.placeholderCurrency' },
  { id: 'precoVendaPorUnidade', label: 'calculator.precoVendaPorUnidade', placeholder: 'calculator.placeholderCurrency' },
  { id: 'custoVariavelPorUnidade', label: 'calculator.custoVariavelPorUnidade', placeholder: 'calculator.placeholderCurrency' },
];
