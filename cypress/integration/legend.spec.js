describe("Legend", () => {
  it("shows student counts", () => {
    cy.visit("");

    cy.get("[data-test=legend-box]").contains("100–200");
    cy.get("[data-test=legend-box]").contains("400–1500");
    cy.get("[data-test=legend-box]").contains("2500+");
  });
});
