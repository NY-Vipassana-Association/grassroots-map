describe("Group Sitting", () => {
  it("can be selected by user", () => {
    cy.visit("");
    cy.get("body").should("not.contain", "Group Sitting");

    const popupDataTestId = "group-sitting-popup-keven-porter";

    cy.get("[data-test=group-sitting-icon-keven-porter]").click();

    cy.get(`[data-test=${popupDataTestId}]`).contains("Group Sitting");
    cy.get(`[data-test=${popupDataTestId}]`).contains("Host: Keven Porter");
    cy.get(`[data-test=${popupDataTestId}]`).contains(
      "Rose Terrace, Newark, NJ (contact host for full address)"
    );
    cy.get(`[data-test=${popupDataTestId}]`).contains(
      "Most Sundays, 9:00a – Noon. Please call to confirm."
    );
    cy.get(`[data-test=${popupDataTestId}]`).contains("(973) 477-9914");
  });
});
