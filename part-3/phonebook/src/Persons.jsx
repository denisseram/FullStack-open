const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id, person.name)}>delete</button>
    </div>
  )
}

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <div>
      {personsToShow.map(person => <Person key={person.name} person={person} onDelete={onDelete} />)}
    </div>
  )
}

export default Persons
