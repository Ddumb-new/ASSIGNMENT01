// 1. Import Node's built-in http module
const http = require("http");

// 2. Create the server
const server = http.createServer((req, res) => {
  // Set response header so browser knows it's plain text
  res.writeHead(200, { "Content-Type": "text/plain" });
  // 3. End the response
  res.end();
});

// 4. Start the server on port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
