describe("Hover Info Box", () => {
  it("shows number of old students on hover", () => {
    const numManhattanOldStudents = 2782;
    cy.visit("");

    cy.get("[data-test=hover-info-box]").contains("Vipassana Grassroots Map");
    cy.get("[data-test=hover-info-box]").contains("Hover over a region");

    cy.get("[data-test=region-manhattan]")
      .first()
      .trigger("mouseover");
    cy.get("[data-test=hover-info-box]").contains("Manhattan");
    cy.get("[data-test=hover-info-box]").contains(
      `${numManhattanOldStudents} old students`
    );

    cy.get("[data-test=region-manhattan]")
      .first()
      .trigger("mouseout");
    cy.get("[data-test=hover-info-box]").contains("Hover over a region");
  });
});
