const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("Welcome to the Home Page!");
  } else if (req.url == "/about") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("Lear more about us on the About Page!");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server Started Succesfully");
});
