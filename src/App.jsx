import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

//importo le pagine
import TaskList from './pages/TaskList'
import TaskAdd from './pages/TaskAdd'
import { GlobalProvider } from './context/GlobalContext'

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/addtask">ADD TASK</Link> |{" "}
        </nav>
        {/* Routes */}
        <Routes>
          <Route path='/' element={<TaskList />}></Route>
          <Route path='/addtask' element={<TaskAdd />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
