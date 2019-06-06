#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FILE_TO_READ = path.resolve(__dirname, 'output', 'raw_container_output.log');
const COUNT_STATS_FILE = path.resolve(__dirname, 'output', 'container_count_output.log');

const containers = {};
fs.readFile(FILE_TO_READ, { encoding: 'utf-8' }, function(error, data) {
    // if no error, do stuff
    if (!error) {
        const explodedAtDelimiter = data.split('\n');
        // shocked tom meme
        const emptyStringFiltered = explodedAtDelimiter.filter( entry => (entry !== '') );
        emptyStringFiltered.map(logEntry => {
            const containerId = logEntry.split(' ')[1]; // ["containerId", "hash?"]
            // if the container isn't listed then list it and increment the value
            if (!containers[containerId]) {
                containers[containerId] = 0;
                containers[containerId]++;
            } else {
                // else the container is listed and increment the occurences
                containers[containerId]++;
            }
        });
        containers.timestamp = new Date();
        fs.writeFileSync(COUNT_STATS_FILE, `${JSON.stringify(containers)},`, {
            encoding: 'utf-8',
            flag: 'a'
        });
    }
});


// separate at delimiter then do logic