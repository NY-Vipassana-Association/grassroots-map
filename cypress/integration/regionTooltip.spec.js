describe("Region Tooltip", () => {
  it("shows regional info when you click on a region", () => {
    cy.visit("");
    cy.get(".region-manhattan")
      .first()
      .click();
    cy.contains("old students in Manhattan.");
    cy.contains("Apply to host a group sitting");
    cy.get(".leaflet-popup-close-button").click();
    cy.get("body").should("not.contain", "old students in Manhattan.");
  });
});
