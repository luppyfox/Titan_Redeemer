const express = require('express');  // Import the Express framework.
const bodyParser = require('body-parser'); // Import middleware to parse incoming request bodies.
const axios = require('axios'); // Import Axios for making HTTP requests (to communicate with the robot).

const app = express(); // Initialize the Express app.
const PORT = 9051;  // Define the port number for the server to listen on.

app.use(bodyParser.json());  // Use the body-parser middleware to automatically parse incoming JSON requests.

// Global variables to store device information
let deviceInfo = {
    deviceName: "Ketty_test",
    deviceId: "8705509236983",
    deviceSecret: "7cf77414ac1d69e0736b730e3dd272ba",
    region: "Chiang mai University",
    robotId: "12345"
};

// // Endpoint to update the device info globally (optional)
// app.post('/api/update/device', (req, res) => {
//     const { deviceName, deviceId, deviceSecret, region, robotId } = req.body;

//     // If any fields are missing, return a 400 error
//     if (!deviceName || !deviceId || !deviceSecret || !region || !robotId) {
//         return res.status(400).send('Missing required fields: deviceName, deviceId, deviceSecret, region, robotId');
//     }

//     // Update the global device information
//     deviceInfo = { deviceName, deviceId, deviceSecret, region, robotId };
//     console.log(`Updated device info: ${JSON.stringify(deviceInfo)}`);
//     res.status(200).send('Device info updated');
// });

// Endpoint to handle sending device information to the robot
app.post('/api/add/device', (req, res) => {
    // Use the global device info without requiring the user to provide it in the request
    console.log(`Using device info: ${JSON.stringify(deviceInfo)}`);

    // Send the data to the robot API
    const robotApiUrl = 'http://127.0.0.1:9050/api/add/device'; // Replace with the real robot API address.

    axios.post(robotApiUrl, {
        deviceName: deviceInfo.deviceName,
        deviceId: deviceInfo.deviceId,
        deviceSecret: deviceInfo.deviceSecret,
        region: deviceInfo.region
    })
        .then(response => {
            console.log('Robot response:', response.data);
            res.status(200).send('Request forwarded to robot');
        })
        .catch(error => {
            console.error('Error forwarding request to robot:', error);
            res.status(500).send('Error communicating with robot');
        });
});

// Endpoint to handle sending operation commands to the robot
app.post('/api/robot/action', (req, res) => {
    const { action } = req.body;

    // Validate the required action field
    if (!action) {
        return res.status(400).send('Missing required field: action');
    }

    console.log(`Sending action command to robot with device info: ${JSON.stringify(deviceInfo)}`);

    // Send the action command to the robot using the global deviceInfo
    const robotActionUrl = 'http://127.0.0.1:9050/api/robot/action';

    axios.post(robotActionUrl, {
        action,
        robotId: deviceInfo.robotId, // Use the global robotId
        deviceId: deviceInfo.deviceId // Use the global deviceId
    })
        .then(response => {
            console.log('Robot action response:', response.data);
            res.status(200).send('Action command sent to robot');
        })
        .catch(error => {
            console.error('Error sending action command to robot:', error);
            res.status(500).send('Error communicating with robot');
        });
});

// Endpoint to obtain the status of the robot
app.get('/api/robot/status', (req, res) => {
    console.log(`Requesting status for robot with device info: ${JSON.stringify(deviceInfo)}`);

    // Replace this with the actual URL for getting the robot's status
    const robotStatusUrl = `http://127.0.0.1:9050/api/robot/status?device_id=${deviceInfo.deviceId}&robot_id=${deviceInfo.robotId}`;

    // Send GET request to the robot to obtain its status
    axios.get(robotStatusUrl)
        .then(response => {
            console.log('Robot status response:', response.data);
            res.status(200).json(response.data); // Forward the robot's status back to the client
        })
        .catch(error => {
            console.error('Error obtaining robot status:', error);
            res.status(500).send('Error communicating with robot');
        });
});

// Start the server and listen on the defined port.
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
