const fs = require('fs');

//requires path and a callback that handles errors and printing of the dat
function readFile() {
    fs.readFile("./file.txt", (err, data) => {
        if (err) return console.error(err)
        console.log(data.toString());
    })
}

const content = "west virginia, mountain mama, take me home, country roads "

//requires path, content and callback to handle errors
function writeFile(content) {
    fs.writeFile("./newFile.txt", content, (err) => {
        if (err) return console.error(err);
        console.log("file has been saved")
    })
}

readFile();
writeFile(content);