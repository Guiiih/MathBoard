# MathBoard

[![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)](https://github.com/Guiiih/MathBoard)

[**Experimente o MathBoard Online!**](https://mathboard.vercel.app/) (Link para a demonstração ao vivo - *Este link é um placeholder, por favor, atualize-o com o link real do seu deploy*)

## Visão Geral

O MathBoard é uma aplicação web interativa desenvolvida para simplificar e automatizar uma vasta gama de cálculos financeiros e matemáticos. Criado com Vue.js e TypeScript, o projeto visa ser uma ferramenta educacional e prática para estudantes, profissionais e qualquer pessoa que precise realizar cálculos complexos de forma rápida e precisa, sem a necessidade de planilhas ou softwares especializados.

A plataforma se destaca pela sua interface intuitiva, pela renderização clara de equações matemáticas via KaTeX e pelo suporte a múltiplos idiomas, tornando-o acessível a um público global.

## Funcionalidades Implementadas

O MathBoard oferece uma coleção abrangente de calculadoras, cobrindo diversas áreas da matemática financeira e contábil:

### 1. Cálculos de Juros
*   **Juros Simples:** Cálculo básico de juros sobre o capital inicial.
*   **Juros Composto:** Cálculo de juros sobre o capital inicial mais os juros acumulados.

### 2. Valor Inicial e Aumento de Capital
*   **Valor Inicial Simples:** Determina o capital inicial com base em juros simples.
*   **Valor Inicial Composto:** Determina o capital inicial com base em juros compostos.
*   **Aumento de Capital Simples (V1 e V2):** Diferentes abordagens para calcular o aumento de capital sob regime de juros simples.
*   **Aumento de Capital Composto (V1 e V2):** Diferentes abordagens para calcular o aumento de capital sob regime de juros compostos.

### 3. Sistemas de Amortização
*   **SAF (Sistema de Amortização Francês):** Cálculo de prestações fixas.
*   **SAC (Sistema de Amortização Constante):** Cálculo de amortizações fixas.
*   **SAM (Sistema de Amortização Misto):** Combinação de SAF e SAC.
*   **SSA (Sistema de Amortização Americano):** Pagamento de juros periódicos e amortização total no final.

### 4. Correção Monetária
*   **Correção Monetária 01 e 02:** Diferentes métodos para ajustar valores pela inflação ou desvalorização da moeda.

### 5. Descontos
*   **Desconto Composto Comercial:** Desconto calculado sobre o valor nominal, com juros compostos.
*   **Desconto Composto Racional:** Desconto calculado sobre o valor atual, com juros compostos.
*   **Desconto Simples Comercial:** Desconto calculado sobre o valor nominal, com juros simples.
*   **Desconto Simples Racional:** Desconto calculado sobre o valor atual, com juros simples.

### 6. Séries de Pagamento
*   **Pagamento Antecipado:** Cálculos para pagamentos realizados no início do período.
*   **Série Diferida:** Cálculos para séries de pagamentos que começam após um período de carência.
*   **Série Postecipada:** Cálculos para séries de pagamentos realizados no final do período.

### 7. Outros Cálculos
*   **Taxa de Desvalorização da Moeda:** Determina a taxa de desvalorização de uma moeda ao longo do tempo.

## Tecnologias Utilizadas

*   **Frontend:**
    *   **Vue.js 3:** Framework progressivo para construção de interfaces de usuário.
    *   **TypeScript:** Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.
    *   **Vue Router 4:** Gerenciamento de rotas para a aplicação Single Page Application (SPA).
    *   **Vue I18n:** Biblioteca para internacionalização, permitindo suporte a múltiplos idiomas (atualmente Português e Inglês).
    *   **KaTeX:** Biblioteca de renderização de equações matemáticas de alta qualidade.
    *   **Vite:** Ferramenta de build rápida e leve para desenvolvimento frontend.
*   **Ferramentas de Desenvolvimento:**
    *   **Vite:** Servidor de desenvolvimento e bundler.
    *   **Vue-tsc:** Ferramenta para verificação de tipos em projetos Vue com TypeScript.
    *   **gh-pages:** Utilizado para facilitar o deploy da aplicação em GitHub Pages.

## Estrutura do Projeto

O projeto MathBoard segue uma estrutura modular e organizada para facilitar o desenvolvimento e a manutenção:

```
MathBoard/
├── public/                 # Arquivos estáticos (ícones, index.html)
├── src/                    # Código fonte da aplicação
│   ├── assets/             # Ativos como CSS global e imagens
│   │   ├── images/         # Imagens e logos
│   │   └── style.css       # Estilos CSS globais
│   ├── calculations/       # Módulos TypeScript para cada cálculo financeiro/matemático
│   │   ├── *.ts            # Lógica de cálculo e configuração de campos
│   │   └── index.ts        # Exporta todas as configurações de cálculo
│   ├── components/         # Componentes Vue reutilizáveis
│   │   ├── Form.vue        # Componente para entrada de dados
│   │   ├── LanguageSwitcher.vue # Componente para troca de idioma
│   │   ├── Modal.vue       # Componente de modal
│   │   ├── NavBar.vue      # Barra de navegação
│   │   └── Result.vue      # Componente para exibição de resultados
│   ├── composables/        # Funções reutilizáveis (Composition API)
│   │   ├── useKatexDisplay.ts # Lógica para renderização KaTeX
│   │   └── useTheme.ts     # Lógica para gerenciamento de tema (se aplicável)
│   ├── locales/            # Arquivos JSON para internacionalização
│   │   ├── en.json         # Textos em inglês
│   │   └── pt.json         # Textos em português
│   ├── pages/              # Páginas principais da aplicação
│   │   └── CalculatorPage.vue # Página principal da calculadora
│   ├── App.vue             # Componente raiz da aplicação Vue
│   ├── i18n.ts             # Configuração da instância de internacionalização
│   ├── main.ts             # Ponto de entrada da aplicação Vue
│   ├── router.ts           # Configuração das rotas do Vue Router
│   └── vite-env.d.ts       # Definições de tipo para o ambiente Vite
├── .gitattributes          # Configurações do Git para atributos de arquivo
├── .gitignore              # Arquivos e diretórios ignorados pelo Git
├── CNAME                   # Configuração de domínio personalizado para GitHub Pages
├── index.html              # Arquivo HTML principal
├── LICENSE                 # Informações sobre a licença do projeto
├── package.json            # Metadados do projeto e scripts npm
├── package-lock.json       # Bloqueio de dependências
├── README.md               # Este arquivo
├── tsconfig.json           # Configurações do TypeScript para o projeto
├── tsconfig.node.json      # Configurações do TypeScript para arquivos Node.js
└── vite.config.ts          # Configurações do Vite
```

## Configuração do Ambiente de Desenvolvimento

Para configurar e executar o MathBoard localmente, siga os passos abaixo:

### Pré-requisitos
*   Node.js e npm (ou yarn) instalados.

### Passos para Configuração

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Guiiih/MathBoard.git
    cd MathBoard
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se 5173 estiver em uso).

## Como Fazer o Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```
Isso irá compilar o projeto e gerar os arquivos estáticos na pasta `dist/`.

## Deploy

O projeto está configurado para deploy automático no GitHub Pages usando a biblioteca `gh-pages`.

Para fazer o deploy:

```bash
npm run deploy
```

## Executando Testes

Atualmente, este projeto não possui scripts de teste automatizados configurados. A verificação de tipos é realizada durante o processo de build com `vue-tsc`.

Para garantir a qualidade do código, recomenda-se a adição de testes unitários e de integração no futuro.

## Próximos Passos e Melhorias Futuras

Com base nas sugestões de melhoria e nas práticas recomendadas para projetos de software, aqui estão os próximos passos e áreas para futuras melhorias no MathBoard:

1.  **Testes Abrangentes:** Implementar testes unitários e de integração para garantir a correção dos cálculos e a estabilidade da aplicação.
2.  **Validação de Entrada (Frontend):** Aprimorar a validação dos campos de entrada para fornecer feedback instantâneo e claro ao usuário.
3.  **Tratamento de Erros Consistente:** Implementar um tratamento de erros padronizado em toda a aplicação, com mensagens informativas para o usuário.
4.  **Documentação de API (Interna):** Embora não haja uma API externa, documentar a lógica interna dos módulos de cálculo para facilitar a manutenção e a adição de novas funcionalidades.
5.  **Cache (Frontend):** Considerar estratégias de cache para ativos estáticos e dados, melhorando o desempenho e a experiência do usuário.
6.  **Lazy Loading (Frontend):** Implementar lazy loading para componentes e rotas, otimizando o tempo de carregamento inicial da aplicação.
7.  **Otimização de Imagens:** Otimizar o tamanho e o formato das imagens para reduzir o tempo de carregamento.
8.  **Análise de Dependências:** Realizar análises periódicas das dependências para identificar vulnerabilidades e manter as bibliotecas atualizadas.
9.  **Variáveis de Ambiente Seguras:** Garantir que quaisquer variáveis de ambiente sensíveis sejam tratadas de forma segura (embora para um projeto frontend estático, isso seja menos crítico).
10. **Padronização de Código:** Utilizar ferramentas de linting (como ESLint) e formatação (como Prettier) para manter um estilo de código consistente.
11. **Tipagem (TypeScript):** Continuar aprimorando a tipagem em todo o projeto para maximizar os benefícios do TypeScript.
12. **Modularização:** Refinar a modularização dos componentes e lógicas para aumentar a reusabilidade e a manutenibilidade.
13. **Feedback Visual:** Melhorar o feedback visual para as interações do usuário (e.g., estados de carregamento, mensagens de sucesso/erro).
14. **Acessibilidade (A11y):** Garantir que a aplicação seja acessível para usuários com deficiência, seguindo as diretrizes de acessibilidade web.
15. **Pipeline CI/CD:** Configurar um pipeline de Integração Contínua/Entrega Contínua para automatizar testes e deploys.
16. **Monitoramento e Logging:** Implementar ferramentas de monitoramento e logging para acompanhar o desempenho da aplicação e identificar problemas em produção.

## Contribuir

Contribuições são muito bem-vindas! Se você deseja contribuir para o MathBoard, por favor, siga o fluxo padrão do GitHub:

1.  Faça um "fork" do repositório.
2.  Crie uma nova "branch" para sua funcionalidade ou correção de bug (`git checkout -b feature/minha-nova-funcionalidade`).
3.  Faça suas alterações e "commit" (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Envie suas alterações para o seu "fork" (`git push origin feature/minha-nova-funcionalidade`).
5.  Abra um "Pull Request" para o repositório original.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato e Suporte

Para dúvidas, sugestões, relatórios de bugs ou suporte, por favor, abra uma [Issue no GitHub](https://github.com/Guiiih/MathBoard/issues) ou entre em contato através do email: [seu.email@example.com](mailto:seu.email@example.com) (Por favor, substitua pelo seu email de contato real).