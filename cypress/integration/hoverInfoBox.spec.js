import mapCounties from "../../src/data/gitignored/oldStudentData.json";

describe("Hover Info Box", () => {
  it("shows number of old students on hover", () => {
    const numManhattanOldStudents = mapCounties.find(
      county => county.region_name === "Manhattan"
    ).student_count_all_time;

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
