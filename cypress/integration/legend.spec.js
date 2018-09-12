describe("Legend", () => {
  it("shows student counts", () => {
    cy.visit("");

    cy.get("[data-test=legend-box]").contains("0–200");
    cy.get("[data-test=legend-box]").contains("1000–1500");
    cy.get("[data-test=legend-box]").contains("2500+");
  });
});
