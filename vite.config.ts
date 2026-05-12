import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteSitemapPlugin from 'vite-plugin-sitemap'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    ViteSitemapPlugin({ 
      hostname: 'https://mathboard.guilhermepinho.com.br/',
      routes: [
        '/',
        '/JurosComposto',
        '/ValorInicialSimples',
        '/ValorInicialComposto',
        '/AumentoCapitalSimplesV1',
        '/AumentoCapitalSimplesV2',
        '/AumentoCapitalCompostoV1',
        '/AumentoCapitalCompostoV2',
        '/SAF',
        '/SAC',
        '/SAM',
        '/SSA',
        '/CorrecaoMonetaria01',
        '/CorrecaoMonetaria02',
        '/DescontoCompostoComercial',
        '/DescontoCompostoRacional',
        '/DescontoSimplesComercial',
        '/DescontoSimplesRacional',
        '/PagamentoAntecipado',
        '/SerieDiferida',
        '/SeriePostecipada',
        '/TaxaDesvalorizacaoMoeda',
      ],
      outDir: 'dist',
    }),
  ],
})