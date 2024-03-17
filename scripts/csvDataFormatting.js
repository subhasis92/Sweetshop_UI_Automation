const fs = require("fs");
const { parse } = require("csv-parse");

const breedNames = [];

fs.createReadStream("./cypress/downloads/2017.csv")
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (rowData) {
    let lowerCaseFormattedData=rowData.Breed.toLowerCase();
    if(!breedNames.includes(lowerCaseFormattedData)){
      breedNames.push(lowerCaseFormattedData);
    }
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("parsed csv data:");
    console.log(breedNames);
  });
