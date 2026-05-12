
export interface ConversorTaxasJurosInputs {
  taxa: number; // A taxa de juros a ser convertida (ex: 0.12 para 12%)
  periodoOrigem: 'diario' | 'mensal' | 'anual'; // Período da taxa de origem
  periodoDestino: 'diario' | 'mensal' | 'anual'; // Período da taxa de destino
}

export interface ConversorTaxasJurosOutputs {
  taxaConvertida: number; // A taxa de juros convertida
}

export function calculateConversorTaxasJuros(
  inputs: ConversorTaxasJurosInputs,
  katexUtils: any
): ConversorTaxasJurosOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { taxa, periodoOrigem, periodoDestino } = inputs;

  if (taxa === null || periodoOrigem === null || periodoDestino === null) {
    clearKatexParts();
    return { taxaConvertida: 0 };
  }

  const taxaDecimal = taxa / 100;

  // Converte a taxa para o período diário primeiro
  let taxaDiaria: number;
  let formulaLatex = '';

  if (periodoOrigem === 'anual') {
    taxaDiaria = Math.pow(1 + taxaDecimal, 1 / 365) - 1;
    formulaLatex += `
      \\text{Taxa Diária} = (1 + ${formatNumberForLatex(taxaDecimal)})^{1/365} - 1 = ${formatNumberForLatex(taxaDiaria)} \\
    `;
  } else if (periodoOrigem === 'mensal') {
    taxaDiaria = Math.pow(1 + taxaDecimal, 1 / 30) - 1; // Assumindo 30 dias por mês
    formulaLatex += `
      \\text{Taxa Diária} = (1 + ${formatNumberForLatex(taxaDecimal)})^{1/30} - 1 = ${formatNumberForLatex(taxaDiaria)} \\
    `;
  } else {
    taxaDiaria = taxaDecimal;
    formulaLatex += `
      \\text{Taxa Diária} = ${formatNumberForLatex(taxaDecimal)} \\
    `;
  }

  // Converte a taxa diária para o período de destino
  let taxaConvertida: number;
  if (periodoDestino === 'anual') {
    taxaConvertida = Math.pow(1 + taxaDiaria, 365) - 1;
    formulaLatex += `
      \\text{Taxa Anual} = (1 + ${formatNumberForLatex(taxaDiaria)})^{365} - 1 = ${formatNumberForLatex(taxaConvertida)} \\
    `;
  } else if (periodoDestino === 'mensal') {
    taxaConvertida = Math.pow(1 + taxaDiaria, 30) - 1; // Assumindo 30 dias por mês
    formulaLatex += `
      \\text{Taxa Mensal} = (1 + ${formatNumberForLatex(taxaDiaria)})^{30} - 1 = ${formatNumberForLatex(taxaConvertida)} \\
    `;
  } else {
    taxaConvertida = taxaDiaria;
    formulaLatex += `
      \\text{Taxa Diária} = ${formatNumberForLatex(taxaDiaria)} \\
    `;
  }

  setKatexResult(formulaLatex);

  return { taxaConvertida };
}

export const formFieldsConversorTaxasJuros = [
  { id: 'taxa', label: 'calculator.taxaJuros', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'periodoOrigem', label: 'calculator.periodoOrigem', type: 'select', options: [
    { value: 'diario', label: 'calculator.diario' },
    { value: 'mensal', label: 'calculator.mensal' },
    { value: 'anual', label: 'calculator.anual' },
  ]},
  { id: 'periodoDestino', label: 'calculator.periodoDestino', type: 'select', options: [
    { value: 'diario', label: 'calculator.diario' },
    { value: 'mensal', label: 'calculator.mensal' },
    { value: 'anual', label: 'calculator.anual' },
  ]},
];
