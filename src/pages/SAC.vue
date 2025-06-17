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

  let saldoDevedor = valorFinanciado;
  let tableBody = `0 & - & - & - & R\\$${valorFinanciado.toFixed(2)} \\\\ \\hline \n`;

  let totalJuros = 0;
  let totalPrestacoes = 0;

  for (let k = 1; k <= numParcelas; k++) {
    const juros = saldoDevedor * taxaDecimal;
    const prestacao = amortizacao + juros;
    saldoDevedor -= amortizacao;
    
    totalJuros += juros;
    totalPrestacoes += prestacao;

    tableBody += `${k} & R\\$${prestacao.toFixed(2)} & R\\$${juros.toFixed(2)} & R\\$${amortizacao.toFixed(2)} & R\\$${Math.abs(saldoDevedor).toFixed(2)} \\\\ \\hline \n`;
  }
  
  tableBody += `\\textbf{Total} & \\textbf{R\\$${totalPrestacoes.toFixed(2)}} & \\textbf{R\\$${totalJuros.toFixed(2)}} & \\textbf{R\\$${valorFinanciado.toFixed(2)}} & - \\\\ \\hline \n`;

  const formulaLatex = `
    {\\begin{array}{|c|c|c|c|c|}
    \\hline
    % Primeira linha do cabeçalho com os nomes das colunas
    \\textbf{Mês} & 
    \\textbf{Prestação } (P) & 
    \\textbf{Juros } (J) & 
    \\textbf{Amortização } (A) & 
    \\textbf{Saldo Devedor } (SD) \\\\
    \\hline

    % Segunda linha do cabeçalho com as fórmulas
    &
    A + J & 
    SD \\cdot Taxa_{juros} & 
    Valor_{financiado} \\div N_{parcelas} & 
    SD - A \\\\
    \\hline
    
    % Corpo da tabela com os valores
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