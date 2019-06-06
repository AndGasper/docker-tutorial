#!/usr/bin/env node

const http = require('http');
const path = require('path');
const fs = require('fs');
const options = {
    method: 'GET',
    host: 'localhost',
    port: '4000',
    path: '/container-name'
};
const OUTPUT_DIRECTORY = path.resolve(__dirname, 'output');
const OUTPUT_FILE_NAME = 'raw_container_output.log';
const OUTPUT_FILE = path.resolve(OUTPUT_DIRECTORY, OUTPUT_FILE_NAME);

// if I were very clever, I'd 
// understand how to treat an http request like I do a file handle

const iterations = 2;
for (let i = 0; i < iterations; i++) {
    const clientRequest = http.request(options);
    // response <http.IncomingMessage>: Emitted when a response is received to this request. This event is emitted only once
    clientRequest.on('response', responseCallback);
    clientRequest.end();
}




function responseCallback(response) {
    // there's some funny business happening here.
    // And I can't tell if it's because I attached it to the
    // response object and I'm console logging it so that counts as consuming it or what
    response.read();
    // write container id to file
    if (response.headers["container-id"]) {
        const containerId = response.headers["container-id"];
        writeContainerToFile(containerId);
        return response.headers["container-id"];
    }
    return "oh no";

}


function writeContainerToFile(containerId) {
    const message = `\ncontainerId: ${containerId}\n`;
    console.log('writeContainerToFile - message', message);
    fs.open(OUTPUT_FILE, "a+", (err, fileDescriptor) => {
        console.log('fileDescriptor', fileDescriptor);
        if (err) {
            // classic error handling => throw...
            console.log('oh no');
            return;
        }
        console.log('message', message);
        fs.writeFileSync(OUTPUT_FILE, message, {
            encoding: 'utf-8',
            // mode: '0o666', // this is the default but it has to be an int, and I've already pulled one too many threads
            flag: 'a'
        });
    });
}


// open http request handle
// open file handle for the log file
// initiate request
// write to file handle
// (at end) 
    // close the request handle
    // close the file handle


// what's the point of opening the file and writing the file synchronously?
// questionable at best. Maybe.