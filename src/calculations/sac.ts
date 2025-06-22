interface SacValues {
  valorFinanciado: number | null;
  taxaJuros: number | null;
  numParcelas: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

export function calculateSAC(values: SacValues, katexUtils: any) {
  const { clearKatexParts, formatNumberForLatex } = katexUtils;
  const { valorFinanciado, taxaJuros, numParcelas, jurosTipo, tempoTipo } = values;

  if (valorFinanciado === null || taxaJuros === null || numParcelas === null || numParcelas <= 0) {
    clearKatexParts();
    return null;
  }

  const taxaDecimal = taxaJuros / 100;
  const taxaMensalEfetiva = jurosTipo === 'mensal'
    ? taxaDecimal
    : Math.pow(1 + taxaDecimal, 1 / 12) - 1;
  const totalParcelasMensais = tempoTipo === 'mensal' ? numParcelas : numParcelas * 12;
  const amortizacao = valorFinanciado / totalParcelasMensais;
  let saldoDevedor = valorFinanciado;

  const tableRows = [];
  let totalJuros = 0;
  let totalPrestacoes = 0;

  tableRows.push({
    month: 0,
    installment: '-',
    interest: '-',
    amortization: '-',
    balance: `R$ ${formatNumberForLatex(valorFinanciado)}`
  });

  for (let k = 1; k <= totalParcelasMensais; k++) {
    const juros = saldoDevedor * taxaMensalEfetiva;
    const prestacao = amortizacao + juros;
    saldoDevedor -= amortizacao;
    totalJuros += juros;
    totalPrestacoes += prestacao;
    tableRows.push({
      month: k,
      installment: `R$ ${formatNumberForLatex(prestacao)}`,
      interest: `R$ ${formatNumberForLatex(juros)}`,
      amortization: `R$ ${formatNumberForLatex(amortizacao)}`,
      balance: `R$ ${formatNumberForLatex(Math.abs(saldoDevedor))}`
    });
  }
  
  const totals = {
      totalInstallments: `R$ ${formatNumberForLatex(totalPrestacoes)}`,
      totalInterest: `R$ ${formatNumberForLatex(totalJuros)}`,
      totalAmortization: `R$ ${formatNumberForLatex(valorFinanciado)}`,
  };
  
  return {
    headers: [
      { titleKey: 'resultTable.month' },
      { titleKey: 'resultTable.installment', subTitleKey: 'resultTable.formulaInstallment', symbolKey: 'resultTable.symbolInstallment' },
      { titleKey: 'resultTable.interest', subTitleKey: 'resultTable.formulaInterest', symbolKey: 'resultTable.symbolInterest' },
      { titleKey: 'resultTable.amortization', subTitleKey: 'resultTable.financedAmount', symbolKey: 'resultTable.symbolAmortization', isFraction: true },
      { titleKey: 'resultTable.outstandingBalance', subTitleKey: 'resultTable.formulaOutstandingBalance', symbolKey: 'resultTable.symbolOutstandingBalance' },
    ],
    rows: tableRows,
    totals: totals
  };
}

export const formFieldsSAC = [
  { id: 'valorFinanciado', label: 'calculator.valorFinanciado', placeholder: 'calculator.placeholderCurrency' },
  { id: 'taxaJuros', label: 'calculator.juros', placeholder: 'calculator.placeholderPercentage', type: 'interest' },
  { id: 'numParcelas', label: 'calculator.numParcelas', placeholder: 'calculator.placeholderNumber', type: 'time' }
];