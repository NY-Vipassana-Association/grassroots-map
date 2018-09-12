describe("Region Tooltip", () => {
  it("shows regional info when you click on a region", () => {
    cy.visit("");
    cy.get("[data-test=region-manhattan]")
      .first()
      .click();

    const numManhattanOldStudents = 2782;
    cy.contains(
      `There are ${numManhattanOldStudents} old students in Manhattan.`
    );
    cy.contains("Apply to host a group sitting");
    cy.get(".leaflet-popup-close-button").click();
    cy.get("body").should(
      "not.contain",
      `There are ${numManhattanOldStudents} old students in Manhattan.`
    );
  });
});
