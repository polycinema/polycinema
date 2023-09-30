import axios from 'axios'
import './App.css'

interface Person {
  id: number,
  name: string,
  age: number
}

const listPerson: Person[] = [
  { id: 1, name: "Ngu", age: 20 },
  { id: 2, name: "Đần", age: 20 },
]

const port = import.meta.env.VITE_PORT || 3000

const App = () => {

  return (
    <>
      <div className='bg-yellow-400 text-left'>
        <ol>
          {listPerson.map(person => (
            <li className='list-decimal' key={person.id}>
              <div>ID: {person.id}</div>
              <div>Name: {person.name}</div>
              <div>Age: {person.age}</div>
              <hr />
            </li>
          ))}
        </ol>
      </div>

      <div className='bg-slate-500 text-left uppercase font-bold'>
        <span>App listen on port: {port}</span>
      </div>

      <div className='uppercase font-bold'>chúa tể frontend</div>
    </>
  )
}

export default App
