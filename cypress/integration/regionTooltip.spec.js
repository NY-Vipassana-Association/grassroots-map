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

  it("shows regional contact info when available", () => {
    cy.visit("");
    cy.get("[data-test=region-brooklyn]")
      .eq(4)
      .click();

    cy.contains(
      "Interested in connecting with your local Brooklyn old-student community? Reach out to our community organizer:"
    );
    cy.contains("Gretchen Ostheimer");
    cy.contains("brooklynplanning.nyva@gmail.com");
    cy.contains("413-489-0025");
  });

  it("shows planning committee contact info when there is no regional contact", () => {
    cy.visit("");
    cy.get("[data-test=region-bronx]")
      .eq(4)
      .click();

    cy.contains(
      "If you are interested in joining your local community planning team, please reach out to our Dhamma Service Committee at dhammaservice.nyva@gmail.com or (413) 438-7821."
    );
  });
});
