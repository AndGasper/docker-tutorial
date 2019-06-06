#!/usr/bin/env node

const http = require('http');
const path = require('path');
const fs = require('fs');
const options = {
    host: 'localhost',
    port: '4000',
    path: '/container-name'
};
const OUTPUT_DIRECTORY = path.resolve(__dirname, 'output');
const OUTPUT_FILE_NAME = 'raw_container_output.log';
const OUTPUT_FILE = path.resolve(OUTPUT_DIRECTORY, OUTPUT_FILE_NAME);

// if I were very clever, I'd:
// wait for a specific event to write the data to the file
// not wait and initiate a bunch of requests asynchronously to see what would happen

// but alas

const request = http.get(options, function (response) {
    if (response.headers["container-id"]) {
        const containerId = response.headers["container-id"];
        writeContainerToFile(containerId);
        return response.headers["container-id"];
    }
    return "oh no";
});

function writeContainerToFile(containerId) {
    const message = `\ncontainerId: ${containerId}\n`;
    fs.open(OUTPUT_FILE, "a", (err, fileData) => {
        if (err) {
            // classic error handling => throw...
            console.log('oh no');
            return;
        }
        console.log('message', message);
        fs.writeFileSync(OUTPUT_FILE, message), {
            encoding: 'utf-8',
            mode: '0o666',
            flag: 'a'
        };
    });
}



const iterations = 1;
for (let i = 0; i < iterations; i++) {
    // something, something bad b/c opening the same file 1000 times
    // try to open the file
    // inb4 fancy async
    request;

}