const express = require('express');  // Import the Express framework.
const bodyParser = require('body-parser'); // Import middleware to parse incoming request bodies.
const axios = require('axios'); // Import Axios for making HTTP requests (to communicate with the robot).

const app = express(); // Initialize the Express app.
const PORT = 9051;  // Define the port number for the server to listen on.

app.use(bodyParser.json());  // Use the body-parser middleware to automatically parse incoming JSON requests.

// Define a POST endpoint at the route /api/notify/url
app.post('/api/add/device', (req, res) => {
    // Extract the necessary fields from the incoming request body.
    const { deviceName, deviceId, deviceSecret, region } = req.body;

    // Validate required fields
    if (!deviceName || !deviceSecret || !deviceId || !region) {
        return res.status(400).send('Missing required fields: deviceName, deviceSecret, deviceId, regioin');
    }

    // Log the incoming request's JSON data for debugging.
    console.log(`Received request with data: ${JSON.stringify(req.body)}`);

    // Here we would add logic to send this data to a robot or another API.
    // Let's assume we are sending this to a robot via its own API endpoint.
    const robotApiUrl = 'http://127.0.0.1:9050/api/add/device'; // Replace this with the real robot API address.

    // Send the extracted data to the robot using an HTTP POST request.
    axios.post(robotApiUrl, {
        deviceName,
        deviceId,
        deviceSecret,
        region
    })
    .then(response => {
        // Log and respond with the result from the robot.
        console.log('Robot response:', response.data);
        res.status(200).send('Request forwarded to robot');
    })
    .catch(error => {
        // If an error occurs, log it and respond with an error message.
        console.error('Error forwarding request to robot:', error);
        res.status(500).send('Error communicating with robot');
    });
});

// Endpoint to handle sending operation commands to the robot
app.post('/api/robot/action', (req, res) => {
    const { action, robotId, deviceId } = req.body;

    // Validate required fields
    if (!action || !robotId || !deviceId) {
        return res.status(400).send('Missing required fields: action, robotId, deviceId');
    }

    console.log(`Sending action command to robot: ${JSON.stringify(req.body)}`);

    // Replace this with the actual URL for sending the command to the robot
    const robotActionUrl = 'http://127.0.0.1:9050/api/robot/action';

    // Send the action command to the robot
    axios.post(robotActionUrl, {
        action,
        robotId,
        deviceId
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
    const { device_id, robot_id } = req.query;

    // Validate required query parameters
    if (!device_id || !robot_id) {
        return res.status(400).send('Missing required query parameters: device_id, robot_id');
    }

    console.log(`Requesting status for robot: device_id=${device_id}, robot_id=${robot_id}`);

    // Replace this with the actual URL for getting the robot's status
    const robotStatusUrl = `http://127.0.0.1:9050/api/robot/status?device_id=${device_id}&robot_id=${robot_id}`;

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
