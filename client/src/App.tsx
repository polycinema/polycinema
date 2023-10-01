import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './router'



const data = axios.get('http://polycinema.test/api/v1')
console.log(data);


const App = () => {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
