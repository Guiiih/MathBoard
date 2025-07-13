
export interface AluguelVsCompraInputs {
  valorImovel: number; // Valor do imóvel para compra
  entrada: number; // Valor da entrada para compra
  taxaJurosFinanciamentoAnual: number; // Taxa de juros anual do financiamento
  prazoFinanciamentoAnos: number; // Prazo do financiamento em anos
  valorAluguelMensal: number; // Valor do aluguel mensal
  taxaValorizacaoImovelAnual: number; // Taxa de valorização anual do imóvel
  taxaRentabilidadeInvestimentoAnual: number; // Taxa de rentabilidade anual para o dinheiro não usado na compra
  custosManutencaoAnualImovel: number; // Custos anuais de manutenção do imóvel (IPTU, condomínio, etc.)
  periodoAnaliseAnos: number; // Período de análise em anos
}

export interface AluguelVsCompraOutputs {
  custoTotalAluguel: number; // Custo total de alugar no período
  custoTotalCompra: number; // Custo total de comprar no período
  diferenca: number; // Diferença entre os custos (positivo se alugar for mais caro)
}

export function calculateAluguelVsCompra(
  inputs: AluguelVsCompraInputs,
  katexUtils: any
): AluguelVsCompraOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const {
    valorImovel,
    entrada,
    taxaJurosFinanciamentoAnual,
    prazoFinanciamentoAnos,
    valorAluguelMensal,
    taxaValorizacaoImovelAnual,
    taxaRentabilidadeInvestimentoAnual,
    custosManutencaoAnualImovel,
    periodoAnaliseAnos,
  } = inputs;

  if (valorImovel === null || entrada === null || taxaJurosFinanciamentoAnual === null || prazoFinanciamentoAnos === null || valorAluguelMensal === null || taxaValorizacaoImovelAnual === null || taxaRentabilidadeInvestimentoAnual === null || custosManutencaoAnualImovel === null || periodoAnaliseAnos === null) {
    clearKatexParts();
    return { custoTotalAluguel: 0, custoTotalCompra: 0, diferenca: 0 };
  }

  const taxaJurosFinanciamentoMensal = taxaJurosFinanciamentoAnual / 12 / 100;
  const taxaValorizacaoImovelAnualDecimal = taxaValorizacaoImovelAnual / 100;
  const taxaRentabilidadeInvestimentoAnualDecimal = taxaRentabilidadeInvestimentoAnual / 100;

  // --- Cálculo para Aluguel ---
  let custoTotalAluguel = 0;
  // Considera o custo do aluguel mensal multiplicado pelo número de meses no período de análise
  custoTotalAluguel = valorAluguelMensal * 12 * periodoAnaliseAnos;

  // Considera a rentabilidade do dinheiro que seria usado na entrada e não foi
  const dinheiroNaoUsadoNaEntrada = entrada;
  const rendimentoDinheiroNaoUsado = dinheiroNaoUsadoNaEntrada * (Math.pow(1 + taxaRentabilidadeInvestimentoAnualDecimal, periodoAnaliseAnos) - 1);
  custoTotalAluguel -= rendimentoDinheiroNaoUsado; // Reduz o custo total de aluguel pelo rendimento

  // --- Cálculo para Compra ---
  let custoTotalCompra = 0;

  // Custo da entrada
  custoTotalCompra += entrada;

  // Cálculo das parcelas do financiamento
  const valorFinanciado = valorImovel - entrada;
  const numeroParcelas = prazoFinanciamentoAnos * 12;

  let parcelaFinanciamento = 0;
  if (taxaJurosFinanciamentoMensal > 0) {
    parcelaFinanciamento = valorFinanciado *
      (taxaJurosFinanciamentoMensal * Math.pow(1 + taxaJurosFinanciamentoMensal, numeroParcelas)) /
      (Math.pow(1 + taxaJurosFinanciamentoMensal, numeroParcelas) - 1);
  } else {
    parcelaFinanciamento = valorFinanciado / numeroParcelas;
  }

  // Custo total das parcelas do financiamento
  custoTotalCompra += parcelaFinanciamento * numeroParcelas;

  // Custos de manutenção anuais
  custoTotalCompra += custosManutencaoAnualImovel * periodoAnaliseAnos;

  // Valorização do imóvel (reduz o custo total de compra)
  const valorImovelFinal = valorImovel * Math.pow(1 + taxaValorizacaoImovelAnualDecimal, periodoAnaliseAnos);
  custoTotalCompra -= valorImovelFinal; // Reduz o custo total de compra pelo valor final do imóvel

  const diferenca = custoTotalAluguel - custoTotalCompra;

  const formulaLatex = `
    \\begin{aligned}
    \\text{Custo Total Aluguel} &= (\\text{Aluguel Mensal} \\times 12 \\times \\text{Período}) - (\\text{Entrada} \\times ((1 + R_{investimento})^{\\text{Período}} - 1)) \\\\
    \\text{Custo Total Aluguel} &= (${formatNumberForLatex(valorAluguelMensal)} \\times 12 \\times ${formatNumberForLatex(periodoAnaliseAnos)}) - (${formatNumberForLatex(entrada)} \\times ((1 + ${formatNumberForLatex(taxaRentabilidadeInvestimentoAnualDecimal)})^{${formatNumberForLatex(periodoAnaliseAnos)}} - 1)) \\\\
    \\text{Custo Total Aluguel} &= ${formatNumberForLatex(custoTotalAluguel)} \\\\
    \\\\ 
    \\text{Custo Total Compra} &= \\text{Entrada} + (\\text{Parcela Financiamento} \\times \\text{Nº Parcelas}) + (\\text{Custos Manutenção} \\times \\text{Período}) - (\\text{Valor Imóvel} \\times (1 + V_{imóvel})^{\\text{Período}}) \\\\
    \\text{Custo Total Compra} &= ${formatNumberForLatex(entrada)} + (${formatNumberForLatex(parcelaFinanciamento)} \\times ${formatNumberForLatex(numeroParcelas)}) + (${formatNumberForLatex(custosManutencaoAnualImovel)} \\times ${formatNumberForLatex(periodoAnaliseAnos)}) - (${formatNumberForLatex(valorImovel)} \\times (1 + ${formatNumberForLatex(taxaValorizacaoImovelAnualDecimal)})^{${formatNumberForLatex(periodoAnaliseAnos)}}) \\\\
    \\text{Custo Total Compra} &= ${formatNumberForLatex(custoTotalCompra)} \\\\
    \\\\ 
    \\text{Diferença (Aluguel - Compra)} &= ${formatNumberForLatex(diferenca)}
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);

  return { custoTotalAluguel, custoTotalCompra, diferenca };
}

export const formFieldsAluguelVsCompra = [
  { id: 'valorImovel', label: 'calculator.valorImovel', placeholder: 'calculator.placeholderCurrency' },
  { id: 'entrada', label: 'calculator.entrada', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJurosFinanciamentoAnual', label: 'calculator.taxaJurosFinanciamentoAnual', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'prazoFinanciamentoAnos', label: 'calculator.prazoFinanciamentoAnos', placeholder: 'calculator.placeholderNumber', type: 'number' },
  { id: 'valorAluguelMensal', label: 'calculator.valorAluguelMensal', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaValorizacaoImovelAnual', label: 'calculator.taxaValorizacaoImovelAnual', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'taxaRentabilidadeInvestimentoAnual', label: 'calculator.taxaRentabilidadeInvestimentoAnual', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'custosManutencaoAnualImovel', label: 'calculator.custosManutencaoAnualImovel', placeholder: 'calculator.placeholderCurrency' },
  { id: 'periodoAnaliseAnos', label: 'calculator.periodoAnaliseAnos', placeholder: 'calculator.placeholderNumber', type: 'number' },
];
