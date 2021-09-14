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

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);
  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
});

app.get("/statements/:cpf", (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'Customer does not exists' });
  }

  return response.json(customer.statement);
});

app.listen(3333, () => {
  console.log('Server started on port 3333, 🚀');
});