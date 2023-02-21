import { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css'
import Home from './assets/Components/Home/Home';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Route path='/' >
        <Home />
      </Route>
    </BrowserRouter>

  )
}

export default App
