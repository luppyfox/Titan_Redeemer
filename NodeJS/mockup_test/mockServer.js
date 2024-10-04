const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint that matches the API you're testing against
app.post('/your-path', (req, res) => {
    console.log('Received request:', req.body);

    // Mock response
    const mockResponse = {
        code: 0,
        msg: "",
        data: {
            success: true
        }
    };

    res.json(mockResponse);
});

app.listen(port, () => {
    console.log(`Mock server is running on http://localhost:${port}`);
});
