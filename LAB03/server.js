import express from 'express';
// 1️⃣ Define your calculate function here
function calculate(method, x, y) {
    switch (method) {
        case "add":
            return `${x} + ${y} = ${x + y}`;
        case "subtract":
            return `${x} - ${y} = ${x - y}`;
        case "multiply":
            return `${x} * ${y} = ${x * y}`;
        case "divide":
            if (y === 0)
                return `Error: Division by zero`;
            return `${x} / ${y} = ${x / y}`;
        default:
            return `Error: Unknown method '${method}'`;
    }
}
// 2️⃣ Set up Express
const app = express();
const port = 3000;
// 3️⃣ Express route that uses the calculate function
app.get('/lab2', (req, res) => {
    const method = req.query.method;
    const x = Number(req.query.x);
    const y = Number(req.query.y);
    const result = calculate(method, x, y);
    res.send(result);
});
// 4️⃣ Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map