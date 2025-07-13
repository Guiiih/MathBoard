
export interface TIRInputs {
  fluxosDeCaixa: number[]; // Array de fluxos de caixa, incluindo o investimento inicial (negativo)
}

export interface TIROutputs {
  tir: number; // Taxa Interna de Retorno
}

// Função auxiliar para calcular o VPL dado uma taxa de desconto
function calculateVPLForTIR(taxa: number, fluxosDeCaixa: number[]): number {
  let vpl = 0;
  for (let i = 0; i < fluxosDeCaixa.length; i++) {
    vpl += fluxosDeCaixa[i] / Math.pow(1 + taxa, i);
  }
  return vpl;
}

export function calculateTIR(
  inputs: TIRInputs,
  katexUtils: any
): TIROutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { fluxosDeCaixa } = inputs;

  if (!fluxosDeCaixa || fluxosDeCaixa.length === 0) {
    clearKatexParts();
    return { tir: 0 };
  }

  // A TIR é a taxa que faz o VPL ser zero. Encontrar a TIR requer um método iterativo.
  // Esta é uma implementação simplificada e pode não convergir para todos os casos.
  // Para uma solução robusta, considere bibliotecas financeiras ou algoritmos mais avançados.

  const MAX_ITERATIONS = 1000;
  const PRECISION = 0.00001;

  let lowRate = -0.99; // Taxa mínima (evita -100%)
  let highRate = 10; // Taxa máxima (1000%)
  let tir = 0;
  let formulaLatex = '';

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    tir = (lowRate + highRate) / 2;
    const vpl = calculateVPLForTIR(tir, fluxosDeCaixa);

    if (Math.abs(vpl) < PRECISION) {
      formulaLatex = `
        \\text{TIR} \\approx ${formatNumberForLatex(tir * 100)}\\% \\ 
      `;
      setKatexResult(formulaLatex);
      return { tir };
    }

    if (vpl > 0) {
      lowRate = tir;
    } else {
      highRate = tir;
    }
  }

  formulaLatex = `
    \\text{Não foi possível convergir para a TIR.}\n
    \\text{Última estimativa: } ${formatNumberForLatex(tir * 100)}\\% \\ 
  `;
  setKatexResult(formulaLatex);

  // Se não convergir, retorna um valor indicativo de falha ou a última estimativa
  return { tir: NaN }; // Retorna NaN se não convergir dentro das iterações
}

export const formFieldsTIR = [
  { id: 'fluxosDeCaixa', label: 'calculator.fluxosDeCaixa', placeholder: 'calculator.placeholderCurrency', type: 'array' },
];
