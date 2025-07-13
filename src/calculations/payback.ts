
export interface PaybackInputs {
  investimentoInicial: number; // Investimento inicial (positivo)
  fluxosDeCaixa: number[]; // Array de fluxos de caixa futuros (positivos)
  taxaDesconto?: number; // Taxa de desconto para payback descontado (ex: 0.10 para 10%)
}

export interface PaybackOutputs {
  paybackSimples: number; // Tempo de payback simples
  paybackDescontado: number; // Tempo de payback descontado (NaN se taxaDesconto não for fornecida)
}

export function calculatePayback(
  inputs: PaybackInputs,
  katexUtils: any
): PaybackOutputs {
  const { setKatexResult, clearKatexParts, formatNumberForLatex } = katexUtils;
  const { investimentoInicial, fluxosDeCaixa, taxaDesconto } = inputs;

  if (investimentoInicial === null || !fluxosDeCaixa || fluxosDeCaixa.length === 0) {
    clearKatexParts();
    return { paybackSimples: 0, paybackDescontado: NaN };
  }

  let paybackSimples = 0;
  let acumuladoSimples = 0;
  let formulaLatexSimples = `
    \\text{Payback Simples:} \\ 
    \\begin{aligned}
    `;

  for (let i = 0; i < fluxosDeCaixa.length; i++) {
    acumuladoSimples += fluxosDeCaixa[i];
    formulaLatexSimples += `
      \\text{Ano } ${i + 1}: \\text{Acumulado} = ${formatNumberForLatex(acumuladoSimples)} \\ 
    `;
    if (acumuladoSimples >= investimentoInicial) {
      paybackSimples = i + 1; // Mês ou ano em que o payback ocorre
      // Interpolação linear para um payback mais preciso
      if (i > 0) {
        const excedente = acumuladoSimples - investimentoInicial;
        const anterior = fluxosDeCaixa[i];
        paybackSimples = i + 1 - (excedente / anterior);
      }
      break;
    }
  }
  if (acumuladoSimples < investimentoInicial) {
    paybackSimples = Infinity; // Nunca atinge o payback
    formulaLatexSimples += `
      \\text{Não atinge o payback simples.} \\ 
    `;
  } else {
    formulaLatexSimples += `
      \\text{Payback Simples} = ${formatNumberForLatex(paybackSimples)} \\text{ períodos} \\ 
    `;
  }
  formulaLatexSimples += `
    \\end{aligned}
  `;

  let paybackDescontado = NaN;
  let formulaLatexDescontado = '';

  if (taxaDesconto !== undefined && taxaDesconto !== null) {
    const taxaDescontoDecimal = taxaDesconto / 100;
    let acumuladoDescontado = 0;
    formulaLatexDescontado = `
      \\text{Payback Descontado (Taxa de Desconto: } ${formatNumberForLatex(taxaDesconto)}\\% \\text{):} \\ 
      \\begin{aligned}
      `;

    for (let i = 0; i < fluxosDeCaixa.length; i++) {
      const fluxoDescontado = fluxosDeCaixa[i] / Math.pow(1 + taxaDescontoDecimal, i + 1);
      acumuladoDescontado += fluxoDescontado;
      formulaLatexDescontado += `
        \\text{Ano } ${i + 1}: \\text{Fluxo Descontado} = \\frac{${formatNumberForLatex(fluxosDeCaixa[i])}}{(1 + ${formatNumberForLatex(taxaDescontoDecimal)})^{${i + 1}}} = ${formatNumberForLatex(fluxoDescontado)} \\ 
        \\text{Acumulado Descontado} = ${formatNumberForLatex(acumuladoDescontado)} \\ 
      `;
      if (acumuladoDescontado >= investimentoInicial) {
        paybackDescontado = i + 1;
        // Interpolação linear para um payback mais preciso
        if (i > 0) {
          const excedente = acumuladoDescontado - investimentoInicial;
          const anterior = fluxosDeCaixa[i] / Math.pow(1 + taxaDescontoDecimal, i + 1);
          paybackDescontado = i + 1 - (excedente / anterior);
        }
        break;
      }
    }
    if (acumuladoDescontado < investimentoInicial) {
      paybackDescontado = Infinity; // Nunca atinge o payback
      formulaLatexDescontado += `
        \\text{Não atinge o payback descontado.} \\ 
      `;
    } else {
      formulaLatexDescontado += `
        \\text{Payback Descontado} = ${formatNumberForLatex(paybackDescontado)} \\text{ períodos} \\ 
      `;
    }
    formulaLatexDescontado += `
      \\end{aligned}
    `;
  }

  setKatexResult(formulaLatexSimples + formulaLatexDescontado);

  return { paybackSimples, paybackDescontado };
}

export const formFieldsPayback = [
  { id: 'investimentoInicial', label: 'calculator.investimentoInicial', placeholder: 'calculator.placeholderCurrency' },
  { id: 'fluxosDeCaixa', label: 'calculator.fluxosDeCaixa', placeholder: 'calculator.placeholderCurrency', type: 'array' },
  { id: 'taxaDesconto', label: 'calculator.taxaDescontoOpcional', placeholder: 'calculator.placeholderPercentage', type: 'interest', optional: true },
];
