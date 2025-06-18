<template>
  <div>
      <NavBar />
      <input-component :fields="formFields" @update="calculateResult" />
      <result-component :resultado="resultado"/>
  </div>
</template>

<script setup lang="ts">
import 'katex/dist/katex.min.css';
import { ref } from 'vue';

import NavBar from '../components/NavBar.vue';
import InputComponent from '../components/Form.vue';
import ResultComponent from '../components/Result.vue';
import { useKatexDisplay } from '../composables/useKatexDisplay';

interface SacValues {
  valorFinanciado: number | null;
  taxaJuros: number | null;
  numParcelas: number | null;
  jurosTipo: 'anual' | 'mensal';
  tempoTipo: 'anual' | 'mensal';
}

const { resultado, setKatexResult, clearKatexParts } = useKatexDisplay();

const formFields = ref([
    { id: 'valorFinanciado', label: 'Valor do Financiamento', placeholder: 'R$ 0,00' },
    { id: 'taxaJuros', label: 'Taxa de Juros', placeholder: '0 %', type: 'interest' },
    { id: 'numParcelas', label: 'Período', placeholder: '0', type: 'time' }
]);

const calculateResult = (values: SacValues) => {
  const { valorFinanciado, taxaJuros, numParcelas, jurosTipo, tempoTipo } = values;

  if (valorFinanciado === null || taxaJuros === null || numParcelas === null || numParcelas <= 0) {
    clearKatexParts();
    return;
  }


  const taxaDecimal = taxaJuros / 100;
  const taxaMensalEfetiva = jurosTipo === 'mensal'
    ? taxaDecimal
    : Math.pow(1 + taxaDecimal, 1 / 12) - 1;

  const totalParcelasMensais = tempoTipo === 'mensal'
    ? numParcelas
    : numParcelas * 12;

  const amortizacao = valorFinanciado / totalParcelasMensais;
  let saldoDevedor = valorFinanciado;
  let tableBody = `0 & - & - & - & R\\$${valorFinanciado.toFixed(2)} \\\\ \\hline \n`;

  let totalJuros = 0;
  let totalPrestacoes = 0;

  for (let k = 1; k <= totalParcelasMensais; k++) {
    const juros = saldoDevedor * taxaMensalEfetiva; // Usa a taxa mensal
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
    \\textbf{Mês} & 
    \\textbf{Prestação } (P) & 
    \\textbf{Juros } (J) & 
    \\textbf{Amortização } (A) & 
    \\textbf{Saldo Devedor } (SD) \\\\
    \\hline
     & A + J & SD \\cdot i_{mensal} & \\frac{\\text{Valor Financiado}}{n} & SD_{anterior} - A \\\\
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