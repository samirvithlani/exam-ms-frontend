import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRouter from './components/Routers/Routers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <AppContext.Provider value={{ count, setCount, data, setdata }}> */}
        <MainRouter/>
      {/* </AppContext.Provider>  */}
    </>
  )
}

export default App
