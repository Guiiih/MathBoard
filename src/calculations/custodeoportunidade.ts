
export interface CustoOportunidadeInputs {
  retornoInvestimentoEscolhido: number; // Retorno do investimento que foi escolhido
  retornoMelhorAlternativa: number; // Retorno da melhor alternativa que foi deixada de lado
}

export interface CustoOportunidadeOutputs {
  custoOportunidade: number; // O custo de oportunidade
}

export function calculateCustoOportunidade(
  inputs: CustoOportunidadeInputs,
  katexUtils: any
): CustoOportunidadeOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { retornoInvestimentoEscolhido, retornoMelhorAlternativa } = inputs;

  if (retornoInvestimentoEscolhido === null || retornoMelhorAlternativa === null) {
    clearKatexParts();
    return { custoOportunidade: 0 };
  }

  const retornoInvestimentoEscolhidoDecimal = retornoInvestimentoEscolhido / 100;
  const retornoMelhorAlternativaDecimal = retornoMelhorAlternativa / 100;

  // O custo de oportunidade é a diferença entre o retorno da melhor alternativa e o retorno do investimento escolhido
  const custoOportunidade = retornoMelhorAlternativaDecimal - retornoInvestimentoEscolhidoDecimal;

  const formulaLatex = `
    \\begin{aligned}
    CO &= R_{melhor} - R_{escolhido} \\
    CO &= ${formatNumberForLatex(retornoMelhorAlternativaDecimal)} - ${formatNumberForLatex(retornoInvestimentoEscolhidoDecimal)} \\
    CO &= ${formatNumberForLatex(custoOportunidade)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);

  return { custoOportunidade };
}

export const formFieldsCustoOportunidade = [
  { id: 'retornoInvestimentoEscolhido', label: 'calculator.retornoInvestimentoEscolhido', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'retornoMelhorAlternativa', label: 'calculator.retornoMelhorAlternativa', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
];
