describe('CT04 - Logout User', () => {
  const nome = 'Nah QA';
  const senha = 'Teste@123456';
  const email = `nah.logout.${Date.now()}@example.com`;

  it('Deve realizar logout com sucesso', () => {
    // Acessar a aplicação
    cy.visit('https://automationexercise.com');

    // Acessar a página de cadastro
    cy.contains('a', 'Signup / Login').click();

    // Cadastrar usuário para o teste
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

    // Validar criação da conta
    cy.contains('b', 'Account Created!')
      .should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    // Validar usuário autenticado
    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    // Realizar logout
    cy.contains('a', 'Logout').click();

    // Validar redirecionamento
    cy.url().should('include', '/login');

    // Validar formulário de login
    cy.contains('h2', 'Login to your account')
      .should('be.visible');

    // Validar que o usuário não está mais autenticado
    cy.contains('a', 'Logged in as')
      .should('not.exist');
  });
});