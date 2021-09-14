const express = require('express');
const { v4: uuidv4} = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

// Midleware

function verifyIfExistsAccountByCPF(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found.' });
  }

  request.customer = customer;

  return next();
}

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

app.get("/statement", verifyIfExistsAccountByCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.listen(3333, () => {
  console.log('Server started on port 3333, 🚀');
});