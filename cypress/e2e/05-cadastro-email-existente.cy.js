describe('CT05 - Register User with existing email', () => {
  const nome = 'Nah QA';
  const senha = 'Teste@123456';
  const email = `nah.existente.${Date.now()}@example.com`;

  it('Deve impedir o cadastro com um e-mail já existente', () => {
    // Acessar a aplicação
    cy.visit('https://automationexercise.com');

    // Acessar a página de cadastro
    cy.contains('a', 'Signup / Login').click();

    // Cadastrar o primeiro usuário
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

    // Validar cadastro realizado
    cy.contains('b', 'Account Created!')
      .should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    // Validar usuário autenticado
    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    // Realizar logout
    cy.contains('a', 'Logout').click();

    // Tentar cadastrar outro usuário com o mesmo e-mail
    cy.get('[data-qa="signup-name"]').type('Nah QA Segundo Cadastro');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // Validar mensagem de erro
    cy.contains('p', 'Email Address already exist!')
      .should('be.visible');

    // Garantir que o formulário de criação de conta não foi aberto
    cy.contains('b', 'Enter Account Information')
      .should('not.exist');

    // Realizar login para excluir a conta criada
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]')
      .type(senha, { log: false });

    cy.get('[data-qa="login-button"]').click();

    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    // Excluir a conta utilizada no teste
    cy.contains('a', 'Delete Account').click();

    cy.contains('b', 'Account Deleted!')
      .should('be.visible');
  });
});