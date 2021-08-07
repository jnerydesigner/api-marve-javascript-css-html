const express = require('express');
const http = require('http')
const path = require('path');

const PORT = 3000;

// const handler = (request, response) => {
//   response.end('Hey you')
// }

// http.createServer(handler).listen(PORT, () => console.log("server is running ..."))


const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || PORT, () => console.log("Server running..."+PORT));

