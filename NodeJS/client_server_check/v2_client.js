const axios = require('axios');

// Point to the local mock server
const apiUrl = 'http://192.168.1.130:3000/api/add/device';

async function makeRequest() {
    try {
        const response = await axios.post(apiUrl, ());
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error making the request:', error);
    }
}

makeRequest();
