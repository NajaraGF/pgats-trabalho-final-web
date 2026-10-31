describe('CT16 - Place Order: Login before Checkout', () => {
  it('Deve finalizar uma compra após realizar login', () => {
    const nome = 'Nah QA';
    const email = `nah.checkout.${Date.now()}@example.com`;
    const senha = 'Teste@123456';

    // ==========================================
    // 1. PREPARAÇÃO: CADASTRAR USUÁRIO
    // ==========================================

    cy.visit('https://automationexercise.com');

    // Validar página inicial
    cy.get('body').should('be.visible');

    // Acessar cadastro
    cy.contains('a', 'Signup / Login').click();

    // Preencher dados iniciais
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // Validar formulário de cadastro
    cy.contains('b', 'Enter Account Information')
      .should('be.visible');

    // Informações pessoais
    cy.get('#id_gender2').check();
    cy.get('#password').type(senha, { log: false });

    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');

    // Informações de endereço
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

    // Validar cadastro realizado
    cy.contains('b', 'Account Created!')
      .should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    // Validar usuário autenticado
    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    // ==========================================
    // 2. REALIZAR LOGOUT
    // ==========================================

    cy.contains('a', 'Logout').click();

    // Validar redirecionamento
    cy.url().should('include', '/login');

    cy.contains('h2', 'Login to your account')
      .should('be.visible');

    // ==========================================
    // 3. REALIZAR LOGIN
    // ==========================================

    cy.get('[data-qa="login-email"]')
      .type(email);

    cy.get('[data-qa="login-password"]')
      .type(senha, { log: false });

    cy.get('[data-qa="login-button"]')
      .click();

    // Validar login realizado
    cy.contains('a', `Logged in as ${nome}`)
      .should('be.visible');

    // ==========================================
    // 4. ADICIONAR PRODUTO AO CARRINHO
    // ==========================================

    // Acessar página de produtos
    cy.contains('a', 'Products').click();

    cy.url().should('include', '/products');

    // Validar listagem
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);

    // Adicionar primeiro produto
    cy.get('.features_items .product-image-wrapper')
      .first()
      .within(() => {
        cy.contains('Add to cart')
          .first()
          .click();
      });

    // ==========================================
    // 5. VALIDAR INCLUSÃO NO CARRINHO
    // ==========================================

    // Aguardar modal de confirmação
    cy.get('#cartModal', { timeout: 10000 })
      .should('be.visible');

    // Validar mensagem de inclusão
    cy.get('#cartModal')
      .contains('Added!')
      .should('be.visible');

    // Fechar modal
    cy.get('#cartModal')
      .contains('Continue Shopping')
      .click();

    // Acessar carrinho pelo menu superior
    cy.get('a[href="/view_cart"]')
      .filter(':visible')
      .first()
      .click();

    // Validar redirecionamento
    cy.url().should('include', '/view_cart');

    // Validar tabela do carrinho
    cy.get('#cart_info_table', { timeout: 10000 })
      .should('be.visible');

    // Validar existência de produto
    cy.get('#cart_info_table tbody tr')
      .should('have.length.greaterThan', 0);

    // ==========================================
    // 6. PROSSEGUIR PARA CHECKOUT
    // ==========================================

    cy.contains('a', 'Proceed To Checkout')
      .click();

    // Validar endereço de entrega
    cy.contains('Address Details')
      .should('be.visible');

    // Validar resumo do pedido
    cy.contains('Review Your Order')
      .should('be.visible');

    // Preencher comentário
    cy.get('textarea[name="message"]')
      .should('be.visible')
      .type('Compra automatizada CT16 - Trabalho final PGATS.');

    // ==========================================
    // 7. FINALIZAR PEDIDO
    // ==========================================

    cy.contains('a', 'Place Order')
      .click();

    // Validar formulário de pagamento
    cy.get('[data-qa="name-on-card"]')
      .should('be.visible');

    // Preencher dados fictícios
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

    // Confirmar pagamento
    cy.get('[data-qa="pay-button"]')
      .click();

    // ==========================================
    // 8. VALIDAR COMPRA REALIZADA
    // ==========================================

    cy.contains(
      'Congratulations! Your order has been confirmed!'
    ).should('be.visible');

    // ==========================================
    // 9. EXCLUIR CONTA DE TESTE
    // ==========================================

    cy.contains('a', 'Delete Account')
      .click();

    // Validar exclusão
    cy.contains('b', 'Account Deleted!')
      .should('be.visible');
  });
});