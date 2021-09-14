const express = require('express');
const { v4: uuidv4} = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */
app.post("/accounts", (request, response) => {
  const { cpf, name } = request.body;

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
});

app.use(express.json());

app.listen(3333, () => {
  console.log('Server started on port 3333, 🚀');
});