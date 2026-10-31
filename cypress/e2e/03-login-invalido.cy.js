describe('CT03 - Login User with incorrect email and password', () => {
  it('Deve apresentar mensagem de erro ao informar credenciais inválidas', () => {
    const emailInvalido = `usuario.inexistente.${Date.now()}@example.com`;
    const senhaInvalida = 'SenhaIncorreta@123';

    // Acessar a aplicação
    cy.visit('https://automationexercise.com');

    // Validar que a página inicial foi carregada
    cy.get('body').should('be.visible');

    // Acessar a página de login
    cy.contains('a', 'Signup / Login').click();

    // Validar que o formulário de login está visível
    cy.contains('h2', 'Login to your account')
      .should('be.visible');

    // Preencher e-mail inválido
    cy.get('[data-qa="login-email"]')
      .should('be.visible')
      .type(emailInvalido);

    // Preencher senha inválida
    cy.get('[data-qa="login-password"]')
      .should('be.visible')
      .type(senhaInvalida, { log: false });

    // Clicar no botão de login
    cy.get('[data-qa="login-button"]')
      .click();

    // Validar mensagem de erro
    cy.contains('p', 'Your email or password is incorrect!')
      .should('be.visible');

    // Validar que o usuário não foi autenticado
    cy.contains('a', 'Logged in as')
      .should('not.exist');
  });
});
