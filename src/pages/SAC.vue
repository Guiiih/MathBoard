<template>
  <div>
      <NavBar />
      <input-component 
        :Label01="'Valor do Financiamento'" 
        :Label02="'Taxa de Juros (mensal)'" 
        :Label03="'Número de Parcelas'" 
        :show-div="true" 
        @update="calculateResult($event)" />
      <result-component :resultado="resultado"/>
  </div>
</template>
<script setup lang="ts">
import 'katex/dist/katex.min.css';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const calculateResult = (inputs: any) => {
  const valorFinanciado = inputs.input1;
  const taxaJuros = inputs.input2;
  const numParcelas = inputs.input3;

  if (valorFinanciado === null || taxaJuros === null || numParcelas === null || numParcelas <= 0) {
    clearKatexParts();
    return;
  }

  const taxaDecimal = taxaJuros / 100;
  const amortizacao = valorFinanciado / numParcelas;

  // --- Cálculos para as Fórmulas ---
  const juros1 = valorFinanciado * taxaDecimal;
  const prestacao1 = amortizacao + juros1;
  const jurosN = amortizacao * taxaDecimal;
  const prestacaoN = amortizacao + jurosN;

  // --- Geração do Corpo da Tabela ---
  let saldoDevedor = valorFinanciado;
  let tableBody = '';
  for (let k = 1; k <= numParcelas; k++) {
    const juros = saldoDevedor * taxaDecimal;
    const prestacao = amortizacao + juros;
    saldoDevedor -= amortizacao;
    tableBody += `${k} & R\\$${prestacao.toFixed(2)} & R\\$${juros.toFixed(2)} & R\\$${amortizacao.toFixed(2)} & R\\$${Math.abs(saldoDevedor).toFixed(2)} \\\\ \\hline \n`;
  }
  
  // --- Combinação das Fórmulas e da Tabela em uma única string ---
  const formulaLatex = `
    % Seção de Fórmulas
    \\begin{aligned}
    \\text{Amortização (A)} &= \\frac{R\\$${valorFinanciado.toFixed(2)}}{${numParcelas}} = R\\$${amortizacao.toFixed(2)} \\\\
    \\\\
    \\text{1ª Prestação } (P_1) &= R\\$${amortizacao.toFixed(2)} + R\\$${juros1.toFixed(2)} = R\\$${prestacao1.toFixed(2)} \\\\
    \\\\
    \\text{Última Prestação } (P_{${numParcelas}}) &= R\\$${amortizacao.toFixed(2)} + R\\$${jurosN.toFixed(2)} = R\\$${prestacaoN.toFixed(2)}
    \\end{aligned}

    % Espaçamento entre as seções
    \\

    % Seção da Tabela
    {\\begin{array}{|c|c|c|c|c|}
    \\hline
    \\text{Mês} & \\text{Prestação} & \\text{Juros} & \\text{Amortização} & \\text{Saldo Devedor} \\\\
    \\hline
    ${tableBody}
    \\end{array}}
  `;

  setKatexResult(formulaLatex);
};
</script>

<style>
#result-table {
  font-size: 0.8rem;
}
@media (min-width: 640px) {
  #result-table {
    font-size: 1rem;
  }
}
</style>