# MathBoard

[![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)](https://github.com/Guiiih/MathBoard)

## Visão Geral

O MathBoard é uma aplicação web interativa desenvolvida para simplificar e automatizar uma vasta gama de cálculos financeiros e matemáticos. Criado com Vue.js e TypeScript, o projeto visa ser uma ferramenta educacional e prática para estudantes, profissionais e qualquer pessoa que precise realizar cálculos complexos de forma rápida e precisa, sem a necessidade de planilhas ou softwares especializados.

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

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

