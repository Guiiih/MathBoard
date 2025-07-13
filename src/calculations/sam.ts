

export interface SAMInputs {
  valorFinanciado: number; // Valor total do financiamento
  taxaJurosMensal: number; // Taxa de juros mensal (ex: 0.01 para 1%)
  numeroParcelas: number; // Número total de parcelas
}

export interface SAMOutputs {
  parcelas: {
    mes: number;
    saldoDevedorInicial: number;
    juros: number;
    amortizacao: number;
    parcela: number;
    saldoDevedorFinal: number;
  }[];
}

export function calculateSAM(
  inputs: SAMInputs,
  katexUtils: any
): SAMOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { valorFinanciado, taxaJurosMensal, numeroParcelas } = inputs;

  if (valorFinanciado === null || taxaJurosMensal === null || numeroParcelas === null) {
    clearKatexParts();
    return { parcelas: [] };
  }

  const taxa = taxaJurosMensal / 100;
  const parcelas: SAMOutputs['parcelas'] = [];

  // --- Cálculo SAC ---
  const amortizacaoSAC = valorFinanciado / numeroParcelas;
  let saldoDevedorSAC = valorFinanciado;
  const parcelasSAC: any[] = [];

  for (let i = 0; i < numeroParcelas; i++) {
    const jurosSAC = saldoDevedorSAC * taxa;
    const parcelaSAC = amortizacaoSAC + jurosSAC;
    saldoDevedorSAC -= amortizacaoSAC;
    parcelasSAC.push({ juros: jurosSAC, amortizacao: amortizacaoSAC, parcela: parcelaSAC });
  }

  // --- Cálculo SAF ---
  const fatorSAF = (taxa * Math.pow(1 + taxa, numeroParcelas)) / (Math.pow(1 + taxa, numeroParcelas) - 1);
  const parcelaSAF = valorFinanciado * fatorSAF;
  let saldoDevedorSAF = valorFinanciado;
  const parcelasSAF: any[] = [];

  for (let i = 0; i < numeroParcelas; i++) {
    const jurosSAF = saldoDevedorSAF * taxa;
    const amortizacaoSAF = parcelaSAF - jurosSAF;
    saldoDevedorSAF -= amortizacaoSAF;
    parcelasSAF.push({ juros: jurosSAF, amortizacao: amortizacaoSAF, parcela: parcelaSAF });
  }

  // --- Cálculo SAM ---
  let saldoDevedorAtual = valorFinanciado;
  let formulaLatex = `
    \text{Sistema de Amortização Misto (SAM)} \\
    \text{Valor Financiado} = ${formatNumberForLatex(valorFinanciado)} \\
    \text{Taxa de Juros Mensal} = ${formatNumberForLatex(taxaJurosMensal)}\\% \\
    \text{Número de Parcelas} = ${formatNumberForLatex(numeroParcelas)} \\
    \\ 
    \text{Cálculo SAC:} \\
    \text{Amortização SAC} = \frac{V}{n} = \frac{${formatNumberForLatex(valorFinanciado)}}{${formatNumberForLatex(numeroParcelas)}} = ${formatNumberForLatex(amortizacaoSAC)} \\
    \\ 
    \text{Cálculo SAF:} \\
    \text{Fator SAF} = \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1} = \frac{${formatNumberForLatex(taxa)} \cdot (1 + ${formatNumberForLatex(taxa)})^{${formatNumberForLatex(numeroParcelas)}}}{(1 + ${formatNumberForLatex(taxa)})^{${formatNumberForLatex(numeroParcelas)}} - 1} = ${formatNumberForLatex(fatorSAF)} \\
    \text{Parcela SAF} = V \cdot \text{Fator SAF} = ${formatNumberForLatex(valorFinanciado)} \cdot ${formatNumberForLatex(fatorSAF)} = ${formatNumberForLatex(parcelaSAF)} \\
    \\ 
    \text{Cálculo SAM (Média entre SAC e SAF):} \\
    `;

  for (let i = 0; i < numeroParcelas; i++) {
    const jurosSAM = (parcelasSAC[i].juros + parcelasSAF[i].juros) / 2;
    const amortizacaoSAM = (parcelasSAC[i].amortizacao + parcelasSAF[i].amortizacao) / 2;
    const parcelaSAM = (parcelasSAC[i].parcela + parcelasSAF[i].parcela) / 2;

    parcelas.push({
      mes: i + 1,
      saldoDevedorInicial: saldoDevedorAtual,
      juros: jurosSAM,
      amortizacao: amortizacaoSAM,
      parcela: parcelaSAM,
      saldoDevedorFinal: saldoDevedorAtual - amortizacaoSAM,
    });
    saldoDevedorAtual -= amortizacaoSAM;

    formulaLatex += `
      \text{Mês } ${i + 1}: \\
      \text{Juros} = \frac{J_{SAC} + J_{SAF}}{2} = \frac{${formatNumberForLatex(parcelasSAC[i].juros)} + ${formatNumberForLatex(parcelasSAF[i].juros)}}{2} = ${formatNumberForLatex(jurosSAM)} \\
      \text{Amortização} = \frac{A_{SAC} + A_{SAF}}{2} = \frac{${formatNumberForLatex(parcelasSAC[i].amortizacao)} + ${formatNumberForLatex(parcelasSAF[i].amortizacao)}}{2} = ${formatNumberForLatex(amortizacaoSAM)} \\
      \text{Parcela} = \frac{P_{SAC} + P_{SAF}}{2} = \frac{${formatNumberForLatex(parcelasSAC[i].parcela)} + ${formatNumberForLatex(parcelasSAF[i].parcela)}}{2} = ${formatNumberForLatex(parcelaSAM)} \\
      \text{Saldo Devedor Final} = ${formatNumberForLatex(saldoDevedorAtual)} \\
      \\ 
    `;
  }

  setKatexResult(formulaLatex);

  return { parcelas };
}

export const formFieldsSAM = [
  { id: 'valorFinanciado', label: 'calculator.valorFinanciado', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJurosMensal', label: 'calculator.taxaJurosMensal', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'numeroParcelas', label: 'calculator.numParcelas', placeholder: 'calculator.placeholderNumber', type: 'number' },
];
