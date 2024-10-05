const http = require('http');

const options = {
    hostname: '192.168.1.130',  // Replace with the IP address of Computer A
    port: 3000,
    // path: '/',
    // method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(`Response from server: ${data}`);
    });
});

req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

req.end();
