describe('CT08 - Verify All Products and Product Detail Page', () => {
  it('Deve visualizar a lista de produtos e os detalhes de um produto', () => {
    // Acessar a aplicação
    cy.visit('https://automationexercise.com');

    // Validar carregamento da página inicial
    cy.get('body').should('be.visible');

    // Acessar a página de produtos
    cy.contains('a', 'Products').click();

    // Validar redirecionamento
    cy.url().should('include', '/products');

    // Validar título da página
    cy.contains('h2', 'All Products')
      .should('be.visible');

    // Validar que existem produtos na listagem
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);

    // Acessar os detalhes do primeiro produto
    cy.contains('a', 'View Product')
      .first()
      .click();

    // Validar redirecionamento para detalhes
    cy.url().should('include', '/product_details/');

    // Validar informações do produto
    cy.get('.product-information').within(() => {
      // Nome do produto
      cy.get('h2')
        .should('be.visible')
        .and('not.be.empty');

      // Categoria
      cy.contains('Category:')
        .should('be.visible');

      // Preço
      cy.contains('Rs.')
        .should('be.visible');

      // Disponibilidade
      cy.contains('Availability:')
        .should('be.visible');

      // Condição
      cy.contains('Condition:')
        .should('be.visible');

      // Marca
      cy.contains('Brand:')
        .should('be.visible');
    });
  });
});