describe('CT09 - Search Product', () => {
  it('Deve pesquisar um produto e validar os resultados', () => {
    const produtoPesquisado = 'Top';

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

    // Preencher o campo de pesquisa
    cy.get('#search_product')
      .should('be.visible')
      .type(produtoPesquisado);

    // Clicar no botão de pesquisa
    cy.get('#submit_search')
      .should('be.visible')
      .click();

    // Validar título dos resultados
    cy.contains('h2', 'Searched Products')
      .should('be.visible');

    // Validar que existem produtos na pesquisa
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);

    // Validar que os produtos possuem nomes
    cy.get('.features_items .productinfo p')
      .should('have.length.greaterThan', 0)
      .each(($produto) => {
        cy.wrap($produto)
          .invoke('text')
          .should('not.be.empty');
      });

    // Validar que pelo menos um produto corresponde à pesquisa
    cy.get('.features_items .productinfo p')
      .should(($produtos) => {
        const nomesProdutos = $produtos.toArray().map((produto) =>
          produto.textContent.trim().toLowerCase()
        );

        const produtoEncontrado = nomesProdutos.some((nome) =>
          nome.includes(produtoPesquisado.toLowerCase())
        );

        expect(
          produtoEncontrado,
          'Deve existir pelo menos um produto correspondente à pesquisa'
        ).to.be.true;
      });
  });
});