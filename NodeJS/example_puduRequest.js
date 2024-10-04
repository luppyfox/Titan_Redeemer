const axios = require('axios');

// Replace these values with your actual device data
const requestData = {
    deviceName: "Ketty_test",
    deviceId: "8705509236983",         // Device ID, apply from Pudu platform
    deviceSecret: "7cf77414ac1d69e0736b730e3dd272ba",     // Device Secret, apply from Pudu platform
    region: "Chiang mai University"
};

// Replace with the actual URL of the API endpoint
const apiUrl = 'http://127.0.0.1:9051/api/add/device';

async function makeRequest() {
    try {
        const response = await axios.post(apiUrl, );//requestData);
        console.log('Response:', response.data);
    } catch (error) {   
        console.error('Error making the request:', error);
    }
}

makeRequest();
