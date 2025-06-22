<template>
  <div class="result-wrapper">
    <div class="result-flex-container">
      <div class="result-container">
        
        <div v-if="tableData && tableData.headers" class="result-content">
          <div class="result-output overflow-x-auto">
            <table class="design-table">
              <thead>
                <tr>
                  <th v-for="header in tableData.headers" :key="header.titleKey">
                    {{ $t(header.titleKey) }} {{ header.symbolKey ? $t(header.symbolKey) : '' }}
                  </th>
                </tr>
                <tr>
                  <th v-for="header in tableData.headers" :key="header.titleKey + '-sub'">
                    <div v-if="header.subTitleKey" class="header-subtitle">
                      <div v-if="header.isFraction" class="fraction">
                        <span class="numerator">{{ $t(header.subTitleKey) }}</span>
                        <span class="denominator">n</span>
                      </div>
                      <span v-else v-html="$t(header.subTitleKey)"></span>
                    </div>
                    <div v-else class="header-subtitle">&nbsp;</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableData.rows" :key="row.month">
                  <td>{{ row.month }}</td>
                  <td>{{ row.installment }}</td>
                  <td>{{ row.interest }}</td>
                  <td>{{ row.amortization }}</td>
                  <td>{{ row.balance }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>{{ $t('resultTable.total') }}</th>
                  <td>{{ tableData.totals.totalInstallments }}</td>
                  <td>{{ tableData.totals.totalInterest }}</td>
                  <td>{{ tableData.totals.totalAmortization }}</td>
                  <td>-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div v-else-if="katexString" class="result-content">
          <div class="result-output overflow-x-auto">
            <div v-html="katexString" class="result-output-inner"></div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Object,
      default: null
    },
    katexString: {
      type: String,
      default: ''
    },
  },
}
</script>

