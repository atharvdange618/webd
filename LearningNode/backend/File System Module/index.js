const fs = require('fs');
const cl = console.log.bind(console);

// Reading the file
let readData = fs.readFileSync('./txts/demo.txt', 'utf8');
cl('Read:', readData);

// Writing to the file
const newData = 'Hello Node.js!';
fs.writeFileSync('./txts/demo.txt', newData, 'utf8');
readData = fs.readFileSync('./txts/demo.txt', 'utf8');
cl('Read:', readData);

// Async read
fs.readFile('./txts/Buffer.txt', 'utf8', (err, data) => {
    if (err) throw err;
    cl('Async Read: ', data);

    // Async write
    const newText = 'The Predestination Paradox!';
    fs.writeFile('./txts/Buffer.txt', newText, 'utf8', (err) => {
        if (err) throw err;
        cl("Async Write: Successful");
    });
});

//Unveiling File System 
//Retrieve details such as file size, creation time, and permissions.
fs.stat('./txts/student.txt', (err, stats) => {
    if (err) throw err;
    // cl('File Stats: ', stats);
    cl('Is it a directory: ', stats.isDirectory());
    cl('Is it a file?', stats.isFile());
});

//directories
//mkdir helps to create a directory 
//readdir helps to see what's inside an existing directory

//Creating a directory
// fs.mkdir('new_folder', (err) => {
//     if (err) throw err;
//     cl('Directory created successfully!');
// });

//Reading a Directory
fs.readdir('txts', (err, files) => {
    if (err) throw err;
    cl("Files in the directory: ", files);
});

//File System Changes
//watch is a superhero power , that keeps you informed whenever files or folders change in your pc
// fs.watch('./txts/demo.txt', (eventType, filename) => {
//     cl(`File ${filename} has been ${eventType}`);
// });

//file streams 
//streams process data in chunks, minimizing memeory consumption
const readableStream = fs.createReadStream('./txts/animelist.txt', 'utf8');

readableStream.on('data', (chunk) => {
    cl('Chunk of data: ', chunk);
});

readableStream.on('end', () => {
    cl('End of File reached.');
})