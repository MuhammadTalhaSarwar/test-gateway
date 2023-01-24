const express = require("express");
const consul = require("consul");
const app = express();

const consulUrl = process.env.CONSUL_URL;
consul.register({
    consul: consulUrl,
    service: 'service1',
    port: 3000,
    check: {
        http: 'http://localhost:3000/status',
        interval: '10s',
        timeout: '1s'
    }
}, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('service1 registered')
    }
});

app.get("/", (req, res) => {
    res.send("Hello from Service 1!");
});

app.listen(3000, () => {
    console.log("Service 1 listening on port 3000!");
});