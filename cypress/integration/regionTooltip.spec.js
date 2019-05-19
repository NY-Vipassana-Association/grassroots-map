import mapCounties from "../../src/data/gitignored/oldStudentData.json";

describe("Region Tooltip", () => {
  it("shows regional info when you click on a region", () => {
    cy.visit("");
    cy.get("[data-test=region-manhattan]")
      .first()
      .click();

    const numManhattanOldStudents = mapCounties.find(
      county => county.region_name === "Manhattan"
    ).student_count_all_time;

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
    cy.get("[data-test=region-hudson]").click();

    cy.contains(
      "Interested in connecting with your local Hudson old-student community? Reach out to our community organizer:"
    );

    const hudsonNJ = mapCounties.find(
      county => county.region_name === "Hudson" && county.state_name === "NJ"
    );

    hudsonNJ.regional_contact.split("\n").forEach(regionalContactLine => {
      cy.contains(regionalContactLine);
    });
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
