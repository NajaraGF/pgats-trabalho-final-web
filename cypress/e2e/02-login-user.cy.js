describe('CT02 - Login User with correct email and password', () => {
  const nome = 'Nah QA';
  const senha = 'Teste@123456';
  const email = `nah.qa.${Date.now()}@example.com`;

  before(() => {
    // Acessar a aplicação
    cy.visit('https://automationexercise.com');

    // Acessar a página de cadastro
    cy.contains('a', 'Signup / Login').click();

    // Preencher dados iniciais
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // Preencher informações da conta
    cy.contains('b', 'Enter Account Information')
      .should('be.visible');

    cy.get('#id_gender2').check();
    cy.get('#password').type(senha);
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');

    // Preencher endereço
    cy.get('#first_name').type('Nah');
    cy.get('#last_name').type('QA');
    cy.get('#address1').type('Rua dos Testes, 100');
    cy.get('#country').select('Canada');
    cy.get('#state').type('Ontario');
    cy.get('#city').type('Toronto');
    cy.get('#zipcode').type('10000');
    cy.get('#mobile_number').type('11999999999');

    // Criar conta
    cy.get('[data-qa="create-account"]').click();

    // Validar cadastro
    cy.contains('b', 'Account Created!')
      .should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    // Validar usuário autenticado
    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    // Realizar logout
    cy.contains('a', 'Logout').click();

    // Validar retorno à página de login
    cy.contains('h2', 'Login to your account')
      .should('be.visible');
  });

  it('Deve realizar login com e-mail e senha válidos', () => {
    // Validar formulário de login
    cy.contains('h2', 'Login to your account')
      .should('be.visible');

    // Preencher credenciais válidas
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]')
      .type(senha, { log: false });

    // Realizar login
    cy.get('[data-qa="login-button"]').click();

    // Validar login realizado com sucesso
    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');
  });

  after(() => {
    // Excluir conta de teste após a execução
    cy.visit('https://automationexercise.com');

    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    cy.contains('a', 'Delete Account').click();

    // Validar exclusão da conta
    cy.contains('b', 'Account Deleted!')
      .should('be.visible');
  });
});