const gsjson = require("google-spreadsheet-to-json");
const fs = require("fs");

gsjson({
  spreadsheetId: "15bAkyPI-hJj8N0sQGU3f47CCvClewkx6YQAJ-ASC_M4",
  allWorksheets: true
})
  .then(function(result) {
    const student_counts_response = result[0];
    const group_sittings_response = result[1];

    fs.writeFileSync(
      "./src/data/gitignored/oldStudentData.json",
      JSON.stringify(student_counts_response)
    );

    fs.writeFileSync(
      "./src/data/gitignored/groupSittings.json",
      JSON.stringify(group_sittings_response)
    );
  })
  .catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
  });
