# Automação de Testes Web com Cypress — PGATS

Projeto desenvolvido como trabalho final da disciplina **Automação de Testes na Camada de Interface (Web)**, da Pós-Graduação em Automação de Testes de Software (PGATS).

## Objetivo

Implementar testes automatizados de interface web utilizando o framework Cypress, aplicando boas práticas de automação, validações funcionais, integração contínua e geração de relatórios.

A aplicação utilizada nos testes é o **Automation Exercise**, um ambiente fictício de comércio eletrônico destinado à prática de testes de software.

## Tecnologias utilizadas

- JavaScript
- Cypress
- Node.js
- Git e GitHub
- GitHub Actions
- Mochawesome Reporter

## Cenários de teste automatizados

Foram implementados os 10 casos de teste solicitados na atividade:

| Caso | Cenário |
|---|---|
| CT01 | Register User |
| CT02 | Login User with correct email and password |
| CT03 | Login User with incorrect email and password |
| CT04 | Logout User |
| CT05 | Register User with existing email |
| CT08 | Verify All Products and product detail page |
| CT09 | Search Product |
| CT10 | Verify Subscription in Home Page |
| CT15 | Place Order: Register before Checkout |
| CT16 | Place Order: Login before Checkout |

Os testes contemplam fluxos de cadastro, autenticação, navegação, pesquisa de produtos, inscrição em newsletter e finalização de compras.

## Estrutura do projeto

```text
pgats-trabalho-final-web/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── 01-register-user.cy.js
│   │   ├── 02-login-user.cy.js
│   │   ├── 03-login-invalido.cy.js
│   │   ├── 04-logout-user.cy.js
│   │   ├── 05-cadastro-email-existente.cy.js
│   │   ├── 08-produtos-detalhes.cy.js
│   │   ├── 09-pesquisa-produtos.cy.js
│   │   ├── 10-inscricao-newsletter.cy.js
│   │   ├── 15-compra-cadastro-antes-checkout.cy.js
│   │   └── 16-compra-login-antes-checkout.cy.js
│   ├── fixtures/
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Pré-requisitos

Para executar o projeto localmente, é necessário ter:

- Node.js e npm instalados.
- Git instalado.
- Um navegador compatível com Cypress.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/NajaraGF/pgats-trabalho-final-web.git
```

Acesse a pasta do projeto:

```bash
cd pgats-trabalho-final-web
```

Instale as dependências:

```bash
npm ci
```

## Execução dos testes

### Modo interativo

Para abrir a interface do Cypress:

```bash
npx cypress open
```

Selecione **E2E Testing**, escolha o navegador e execute o cenário desejado.

### Modo headless

Para executar todos os testes pelo terminal:

```bash
npx cypress run
```

### Execução no Google Chrome

```bash
npx cypress run --browser chrome
```

### Execução de um cenário específico

Exemplo para o CT16:

```bash
npx cypress run --spec "cypress/e2e/16-compra-login-antes-checkout.cy.js"
```

## Integração contínua — GitHub Actions

O projeto possui integração contínua configurada por meio do GitHub Actions.

O workflow está localizado em:

```text
.github/workflows/cypress.yml
```

A execução automatizada ocorre em eventos de `push` e `pull_request` na branch `main`, além de permitir execução manual.

O pipeline realiza as seguintes etapas:

1. Checkout do repositório.
2. Configuração do Node.js.
3. Instalação das dependências.
4. Execução dos testes Cypress no Google Chrome.
5. Publicação do relatório Mochawesome.
6. Disponibilização de screenshots em caso de falha.

## Relatórios de execução

O projeto utiliza o **Mochawesome Reporter** para gerar relatórios HTML.

Após a execução local, o relatório pode ser encontrado em:

```text
cypress/reports/html/index.html
```

No GitHub Actions, o relatório é disponibilizado como artefato da execução, permitindo consultar os resultados dos testes.

## Resultado da execução

A suíte foi executada localmente e também no GitHub Actions.

**Resultado da execução validada:**

| Indicador | Resultado |
|---|---|
| Total de testes | 10 |
| Testes aprovados | 10 |
| Testes reprovados | 0 |
| Status | Success |

**Resultado:** todos os cenários automatizados foram executados com sucesso.

## Boas práticas aplicadas

O projeto foi estruturado buscando:

- Organização dos testes por cenário funcional.
- Utilização de seletores para interação com elementos da interface.
- Validação dos resultados esperados por meio de assertions.
- Separação dos arquivos de configuração e suporte.
- Execução automatizada em pipeline de integração contínua.
- Geração de relatórios para acompanhamento das execuções.

## Autora

**Najara Ferraz**

Pós-Graduação em Automação de Testes de Software — PGATS

**Disciplina:** Automação de Testes na Camada de Interface (Web)
