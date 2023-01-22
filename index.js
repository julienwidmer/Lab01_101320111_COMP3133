// COMP 3133 - Full Stack Development II
// Lab Exercise - 01
//
// Julien Widmer - 101320111

/*
a) Delete "canada.txt" and "usa.txt" if already exist using fs module
 */
const fs = require("fs");
const canadaFileName = "canada.txt";
const usaFileName = "usa.txt";

function deleteFile(name) {
    try {
        fs.unlinkSync(name);
        console.log(`Task A --- "${name}" was DELETED.`);
    } catch (error) {
        console.log(`Task A --- "${name}" was NOT deleted:\n\t${error.message}`);
    }
}

deleteFile(canadaFileName);
deleteFile(usaFileName);


/*
b) Filter data of Canada and write data to "canada.txt"
 */
/*
c) Filter data of "United States" and write data to "usa.txt"
 */
const countriesFileName = "input_countries.csv";
fs.open(countriesFileName, "r", (error, fd) => {
    if (error) {
        console.log(`Task B --- "${countriesFileName}" could NOT be opened:\n\t${error.message}`);
        return;
    }

    // Read
    fs.readFile(countriesFileName, "utf-8", (error, stringData) => {
        if (error) {
            console.log(`Task B --- "${countriesFileName}" could NOT be read:\n\t${error.message}`);
            return;
        }

        // Convert string to array of rows
        const rows = stringData.split("\r\n");

        // Retrieve headers
        const headers = rows.shift();

        // Retrieve data for Canada
        const canadianRows = rows.filter(row => row.toLowerCase().includes("canada"));

        // Retrieve data for United States
        const usaRows = rows.filter(row => row.toLowerCase().includes("united states"));

        // Create string data from headers and rows
        const canadianStringData = headers + "\r\n" + canadianRows.join("\r\n");
        const usaStringData = headers + "\r\n" + usaRows.join("\r\n");

        fs.writeFile(canadaFileName, canadianStringData, (error) => {
            if (error) {
                console.log(`Task B --- "${canadaFileName}" could NOT be written:\n\t${error.message}`);
            }
        })

        fs.writeFile(usaFileName, usaStringData, (error) => {
            if (error) {
                console.log(`Task B --- "${usaFileName}" could NOT be written:\n\t${error.message}`);
            }
        })
    });
});