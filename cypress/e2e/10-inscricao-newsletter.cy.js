describe('CT10 - Verify Subscription in Home Page', () => {
  it('Deve realizar a inscrição na newsletter com sucesso', () => {
    const email = `nah.newsletter.${Date.now()}@example.com`;

    // Acessar a aplicação
    cy.visit('https://automationexercise.com');

    // Validar carregamento da página inicial
    cy.get('body').should('be.visible');

    // Rolar até o rodapé
    cy.get('#footer').scrollIntoView();

    // Validar título da seção
    cy.get('#footer')
      .contains('h2', 'Subscription')
      .should('be.visible');

    // Preencher e-mail
    cy.get('#susbscribe_email')
      .should('be.visible')
      .type(email);

    // Clicar no botão de inscrição
    cy.get('#subscribe').click();

    // Validar mensagem de sucesso
    cy.contains('You have been successfully subscribed!')
      .should('be.visible');
  });
});