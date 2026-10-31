describe('CT01 - Register User', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {
    const email = `nah.qa.${Date.now()}@example.com`;

    cy.visit('https://automationexercise.com');

    // Acessar a página de cadastro
    cy.contains('a', 'Signup / Login').click();

    // Validar formulário de cadastro
    cy.contains('h2', 'New User Signup!').should('be.visible');

    // Preencher os dados iniciais
    cy.get('[data-qa="signup-name"]').type('Nah QA');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // Validar formulário de informações da conta
    cy.contains('b', 'Enter Account Information').should('be.visible');

    // Preencher informações pessoais
    cy.get('#id_gender2').check();
    cy.get('#password').type('Teste@123456');
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');

    // Selecionar newsletter e ofertas
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    // Preencher endereço
    cy.get('#first_name').type('Nah');
    cy.get('#last_name').type('QA');
    cy.get('#company').type('PGATS');
    cy.get('#address1').type('Rua dos Testes, 100');
    cy.get('#country').select('Canada');
    cy.get('#state').type('Ontario');
    cy.get('#city').type('Toronto');
    cy.get('#zipcode').type('10000');
    cy.get('#mobile_number').type('11999999999');

    // Criar conta
    cy.get('[data-qa="create-account"]').click();

    // Validar criação da conta
    cy.contains('b', 'Account Created!').should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    // Validar usuário autenticado
    cy.contains('Logged in as Nah QA').should('be.visible');

    // Excluir conta para finalizar o cenário
    cy.contains('a', 'Delete Account').click();

    cy.contains('b', 'Account Deleted!').should('be.visible');
  });
});