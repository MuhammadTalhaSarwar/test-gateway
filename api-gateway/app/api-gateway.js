const express = require("express");
const consul = require("consul");
const app = express();

const consulUrl = process.env.CONSUL_URL;
const service1 = consul.createClient({ consul: consulUrl, service: "service1" });
const service2 = consul.createClient({ consul: consulUrl, service: "service2" });

app.get("/service1", (req, res) => {
  service1.getService((err, service) => {
    if (err) {
      res.status(500).send("Error while fetching service1");
    } else {
      const { address, port } = service;
      res.redirect(`http://${address}:${port}`);
    }
  });
});

app.get("/service2", (req, res) => {
  service2.getService((err, service) => {
    if (err) {
      res.status(500).send("Error while fetching service2");
    } else {
      const { address, port } = service;
      res.redirect(`http://${address}:${port}`);
    }
  });
});

app.listen(80, () => {
  console.log("API Gateway listening on port 80!");
});