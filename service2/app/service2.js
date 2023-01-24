const express = require("express");
const consul = require("consul");
const app = express();

const consulUrl = process.env.CONSUL_URL;
consul.register({
    consul: consulUrl,
    service: 'service2',
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
        console.log('service2 registered')
    }
});

app.get("/", (req, res) => {
    res.send("Hello from Service 2!");
});

app.listen(3000, () => {
    console.log("Service 2 listening on port 3000!");
});