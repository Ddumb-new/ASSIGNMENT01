import express from 'express';

// Creating an instance for express app and defining the port number
const app = express();
const port = 3000;

//Redirecting root to /lab3 with default parameters
app.get('/', (req, res) => {
  res.redirect('/lab3?method=add&x=4&y=6');
});

// Defining the /lab3 route to handle arithmetic operations
app.get('/lab3', (req, res) => {
  const method = req.query.method as string;
  const x = Number(req.query.x);
  const y = Number(req.query.y);

  // Validating query parameters
  if (!method || isNaN(x) || isNaN(y)) {
    return res.send('Error: Please provide method, x, and y as query parameters.');
  }

  let result: number;
  let operator: string;
// Performing the requested arithmetic operation
  switch (method.toLowerCase()) {
    case 'add':
      result = x + y;
      operator = '+';
      break;
    case 'subtract':
      result = x - y;
      operator = '-';
      break;
    case 'multiply':
      result = x * y;
      operator = '*';
      break;
    case 'divide':
      if (y === 0) return res.send('Error: Division by zero is not allowed.');
      result = x / y;
      operator = '/';
      break;
    default:
      return res.send(`Error: Invalid method "${method}". Use add, subtract, multiply, or divide.`);
  }
// Sending the result back to the client
  res.send(`${x} ${operator} ${y} = ${result}`);
});
// Starting the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});