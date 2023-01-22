// COMP 3133 - Full Stack Development II
// Lab Exercise - 01
//
// Julien Widmer - 101320111

/*
a) Delete "canada.txt" and "usa.txt" if already exist using fs module
 */
const fs = require("fs");

function deleteFile(name) {
    try {
        fs.unlinkSync(name);
        console.log(`Task A --- "${name}" was DELETED.`)
    } catch (error) {
        console.log(`Task A --- "${name}" was NOT deleted:\n\t${error.message}`);
    }
}

deleteFile("canada.txt");
deleteFile("usa.txt");


/*
b) Filter data of Canada and write data to "canada.txt"
 */



/*
c) Filter data of "United States" and write data to "usa.txt"
 */