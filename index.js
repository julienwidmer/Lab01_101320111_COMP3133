// COMP 3133 - Full Stack Development II
// Lab Exercise - 01
//
// Julien Widmer - 101320111

const canadaFileName = "canada.txt";
const usaFileName = "usa.txt";
const countriesFileName = "input_countries.csv";


/*
a) Delete "canada.txt" and "usa.txt" if already exist using fs module
 */
const fs = require("fs");

function deleteFile(name) {
    try {
        fs.unlinkSync(name);
        console.log(`"${name}" was DELETED.`);
    } catch (error) {
        console.log(`"${name}" was NOT deleted:\n\t${error.message}`);
    }
}

console.log("--- Task A ---");
deleteFile(canadaFileName);
deleteFile(usaFileName);


/*
b) Filter data of Canada and write data to "canada.txt"
 */
const csv = require("csv-parser");

function createFile(countryFileName, countryFilter) {
    // Create reading stream
    let readStream = fs.createReadStream(countriesFileName).on("error", (error) => {
        console.log(`"${countriesFileName}" was NOT read:\n\t${error.message}`);
    });

    const pipe = readStream.pipe(csv());

    // -- Start Reading
    let countriesData = [];
    pipe.on("data", (row) => {
        // Add row to array
        countriesData.push(row);
    })

    // -- Reading ended --> write file
    pipe.on("end", () => {
        // Filter rows
        const filteredData = countriesData.filter(row => row.country.toLowerCase() === countryFilter.toLowerCase());

        // Format CSV data as string
        let resultString = "country,year,population\n"; // headers
        resultString += filteredData.map(row => `${row.country},${row.year},${row.population}`).join("\n"); // rows

        // Write file
        fs.writeFileSync(countryFileName, resultString);
        console.log(`"${countryFileName}" was CREATED.`);
    });
}

console.log("--- Task B ---");
createFile(canadaFileName, "canada");


/*
c) Filter data of "United States" and write data to "usa.txt"
 */
console.log("--- Task C ---");
createFile(usaFileName, "United States");