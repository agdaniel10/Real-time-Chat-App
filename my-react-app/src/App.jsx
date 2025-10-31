import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from './Pages/chatPage'
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/chatpage' element={<ChatPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
