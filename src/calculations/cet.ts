
export interface CETInputs {
  valorFinanciado: number; // Valor principal do financiamento
  taxaJurosMensal: number; // Taxa de juros mensal do financiamento (ex: 0.01 para 1%)
  numeroParcelas: number; // Número total de parcelas
  outrosCustosMensais: number; // Soma de outras taxas, impostos, seguros mensais
  outrosCustosIniciais: number; // Soma de outras taxas, impostos, seguros iniciais
}

export interface CETOutputs {
  cetMensal: number; // Custo Efetivo Total mensal
  cetAnual: number; // Custo Efetivo Total anual
}

export function calculateCET(
  inputs: CETInputs,
  katexUtils: any
): CETOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const {
    valorFinanciado,
    taxaJurosMensal,
    numeroParcelas,
    outrosCustosMensais,
    outrosCustosIniciais,
  } = inputs;

  if (valorFinanciado === null || taxaJurosMensal === null || numeroParcelas === null || outrosCustosMensais === null || outrosCustosIniciais === null) {
    clearKatexParts();
    return { cetMensal: 0, cetAnual: 0 };
  }

  const taxaJurosMensalDecimal = taxaJurosMensal / 100;

  // Calcula o valor da parcela do financiamento (sem outros custos)
  // Fórmula da parcela de financiamento (Tabela Price)
  const parcelaFinanciamento = valorFinanciado *
    (taxaJurosMensalDecimal * Math.pow(1 + taxaJurosMensalDecimal, numeroParcelas)) /
    (Math.pow(1 + taxaJurosMensalDecimal, numeroParcelas) - 1);

  // Calcula o fluxo de caixa do financiamento para o cálculo da TIR (que será o CET)
  // O primeiro fluxo é o valor recebido (valorFinanciado - custos iniciais)
  // Os demais fluxos são as parcelas pagas (parcelaFinanciamento + outrosCustosMensais)
  const fluxosDeCaixa: number[] = [];
  fluxosDeCaixa.push(valorFinanciado - outrosCustosIniciais);

  for (let i = 0; i < numeroParcelas; i++) {
    fluxosDeCaixa.push(-(parcelaFinanciamento + outrosCustosMensais));
  }

  // A TIR dos fluxos de caixa é o CET mensal
  // Reutilizando a lógica da TIR (simplificada) para encontrar o CET
  const MAX_ITERATIONS = 1000;
  const PRECISION = 0.00001;

  let lowRate = -0.99; // Taxa mínima (evita -100%)
  let highRate = 10; // Taxa máxima (1000%)
  let cetMensal = 0;

  // Função auxiliar para calcular o VPL dado uma taxa de desconto para o CET
  const calculateVPLForCET = (taxa: number, fcs: number[]): number => {
    let vpl = 0;
    for (let i = 0; i < fcs.length; i++) {
      vpl += fcs[i] / Math.pow(1 + taxa, i);
    }
    return vpl;
  };

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    cetMensal = (lowRate + highRate) / 2;
    const vpl = calculateVPLForCET(cetMensal, fluxosDeCaixa);

    if (Math.abs(vpl) < PRECISION) {
      break;
    }

    if (vpl > 0) {
      lowRate = cetMensal;
    } else {
      highRate = cetMensal;
    }
  }

  const cetAnual = Math.pow(1 + cetMensal, 12) - 1;

  const formulaLatex = `
    \\begin{aligned}
    \\text{Parcela Financiamento} &= \\frac{V \\cdot i \\cdot (1 + i)^n}{(1 + i)^n - 1} \\\\
    \\text{Parcela Financiamento} &= \\frac{${formatNumberForLatex(valorFinanciado)} \\cdot ${formatNumberForLatex(taxaJurosMensalDecimal)} \\cdot (1 + ${formatNumberForLatex(taxaJurosMensalDecimal)})^{${formatNumberForLatex(numeroParcelas)}}}{(1 + ${formatNumberForLatex(taxaJurosMensalDecimal)})^{${formatNumberForLatex(numeroParcelas)}} - 1} \\\\
    \\text{Parcela Financiamento} &= ${formatNumberForLatex(parcelaFinanciamento)} \\\\
    \\\\ 
    \\text{Fluxos de Caixa} &= [${formatNumberForLatex(fluxosDeCaixa[0])}, ${fluxosDeCaixa.slice(1).map(f => formatNumberForLatex(f)).join(', ')}] \\\\
    \\\\ 
    CET_{mensal} &= ${formatNumberForLatex(cetMensal * 100)}\\\\% \\\\
    CET_{anual} &= ${formatNumberForLatex(cetAnual * 100)}\\\\% \\
    \\end{aligned}
  `;

  setKatexResult(formulaLatex);

  return { cetMensal, cetAnual };
}

export const formFieldsCET = [
  { id: 'valorFinanciado', label: 'calculator.valorFinanciado', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJurosMensal', label: 'calculator.taxaJurosMensal', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'numeroParcelas', label: 'calculator.numeroParcelas', placeholder: 'calculator.placeholderNumber', type: 'number' },
  { id: 'outrosCustosMensais', label: 'calculator.outrosCustosMensais', placeholder: 'calculator.placeholderCurrency' },
  { id: 'outrosCustosIniciais', label: 'calculator.outrosCustosIniciais', placeholder: 'calculator.placeholderCurrency' },
];
