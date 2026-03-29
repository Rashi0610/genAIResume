import { useState } from 'react'
import {RouterProvider} from "react-router"
import router from './app.routes.jsx'
import './style.scss'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App;
