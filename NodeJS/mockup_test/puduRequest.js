const axios = require('axios');

const requestData = {
    deviceName: "Shenzhen Store",
    deviceId: "",         // Device ID, apply from Pudu platform
    deviceSecret: "",     // Device Secret, apply from Pudu platform
    region: "cn-shanghai"
};

// Point to the local mock server
const apiUrl = 'http://localhost:3000/your-path';

async function makeRequest() {
    try {
        const response = await axios.post(apiUrl, requestData);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error making the request:', error);
    }
}

makeRequest();
