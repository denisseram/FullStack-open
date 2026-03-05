const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())

app.use(express.json())
app.use(morgan('tiny'))  

const persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  // Generate random id
  const id = Math.floor(Math.random() * 1000000) + 1;
  // Create new person object with id, name, number
  const newPerson = {
    id: id.toString(),
    name: body.name,
    number: body.number
  }

  // Add to persons array (hint: persons.push() or persons.concat())
  persons.push(newPerson)

  // Return the new person as JSON
  response.json(newPerson)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personIndex = persons.findIndex(p => p.id === id)
  if (personIndex !== -1) {
    persons.splice(personIndex, 1)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
