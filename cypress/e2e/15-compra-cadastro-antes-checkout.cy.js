describe('CT15 - Place Order: Register before Checkout', () => {
  it('Deve finalizar uma compra após cadastrar um usuário', () => {
    const nome = 'Nah QA';
    const email = `nah.compra.${Date.now()}@example.com`;
    const senha = 'Teste@123456';

    // 1. Acessar a aplicação
    cy.visit('https://automationexercise.com');

    // 2. Validar carregamento da página inicial
    cy.get('body').should('be.visible');

    // 3. Acessar a página de cadastro
    cy.contains('a', 'Signup / Login').click();

    // 4. Preencher os dados iniciais
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // 5. Validar formulário de cadastro
    cy.contains('b', 'Enter Account Information')
      .should('be.visible');

    // 6. Preencher informações pessoais
    cy.get('#id_gender2').check();
    cy.get('#password').type(senha, { log: false });
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');

    // 7. Preencher informações de endereço
    cy.get('#first_name').type('Nah');
    cy.get('#last_name').type('QA');
    cy.get('#company').type('PGATS');
    cy.get('#address1').type('Rua dos Testes, 100');
    cy.get('#country').select('Canada');
    cy.get('#state').type('Ontario');
    cy.get('#city').type('Toronto');
    cy.get('#zipcode').type('10000');
    cy.get('#mobile_number').type('11999999999');

    // 8. Criar a conta
    cy.get('[data-qa="create-account"]').click();

    // Validar cadastro realizado
    cy.contains('b', 'Account Created!')
      .should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    // 9. Validar usuário autenticado
    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    // 10. Acessar a página de produtos
    cy.contains('a', 'Products').click();

    cy.url().should('include', '/products');

    // 11. Adicionar o primeiro produto ao carrinho
    cy.get('.features_items .product-image-wrapper')
      .first()
      .within(() => {
        cy.contains('Add to cart')
          .first()
          .click();
      });

    // 12. Acessar o carrinho pelo menu superior
    // Correção do erro de visibilidade do link "View Cart"
    cy.get('a[href="/view_cart"]')
      .filter(':visible')
      .first()
      .click();

    // Validar redirecionamento
    cy.url().should('include', '/view_cart');

    // 13. Validar produto no carrinho
    cy.get('#cart_info_table')
      .should('be.visible');

    cy.get('#cart_info_table tbody tr')
      .should('have.length.greaterThan', 0);

    // 14. Prosseguir para o checkout
    cy.contains('a', 'Proceed To Checkout').click();

    // 15. Validar informações do checkout
    cy.contains('Address Details')
      .should('be.visible');

    cy.contains('Review Your Order')
      .should('be.visible');

    // 16. Preencher comentário do pedido
    cy.get('textarea[name="message"]')
      .should('be.visible')
      .type('Compra automatizada CT15 - Trabalho final PGATS.');

    // 17. Finalizar pedido
    cy.contains('a', 'Place Order').click();

    // 18. Preencher dados fictícios de pagamento
    cy.get('[data-qa="name-on-card"]')
      .type(nome);

    cy.get('[data-qa="card-number"]')
      .type('4111111111111111');

    cy.get('[data-qa="cvc"]')
      .type('123');

    cy.get('[data-qa="expiry-month"]')
      .type('12');

    cy.get('[data-qa="expiry-year"]')
      .type('2030');

    // 19. Confirmar pagamento
    cy.get('[data-qa="pay-button"]').click();

    // 20. Validar confirmação do pedido
    cy.contains(
      'Congratulations! Your order has been confirmed!'
    ).should('be.visible');

    // 21. Excluir conta utilizada no teste
    cy.contains('a', 'Delete Account').click();

    // 22. Validar exclusão da conta
    cy.contains('b', 'Account Deleted!')
      .should('be.visible');
  });
});