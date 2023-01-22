// COMP 3133 - Full Stack Development II
// Lab Exercise - 01
//
// Julien Widmer - 101320111

const fs = require("fs");

const canadaFileName = "canada.txt";
const usaFileName = "usa.txt";
const countriesFileName = "input_countries.csv";


/*
a) Delete "canada.txt" and "usa.txt" if already exist using fs module
 */
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
function createFile(fileName, filter) {
    try {
        // --- Read file
        const stringData = fs.readFileSync(countriesFileName, "utf-8");

        // Convert string to array of rows using return line separator
        let rows = stringData.split("\r\n");
        // Retrieve headers
        const headers = rows.shift();
        // Filter rows
        rows = rows.filter(row => row.toLowerCase().includes(filter.toLowerCase()));

        // Merge headers and rows array to create result string
        const filteredData = headers + "\r\n" + rows.join("\r\n");

        // --- Write file
        fs.writeFileSync(fileName, filteredData);
        console.log(`"${fileName}" was CREATED.`);
    } catch (error) {
        console.log(`"${countriesFileName}" was NOT read:\n\t${error.message}`);
    }
}

console.log("--- Task B ---");
createFile(canadaFileName, "Canada");


/*
c) Filter data of "United States" and write data to "usa.txt"
 */
console.log("--- Task C ---");
createFile(usaFileName, "United States");