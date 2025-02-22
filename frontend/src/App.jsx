import { Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useState } from 'react'
import RefreshHandler from './RefreshHandler'

function App() {
  const [isAutheniticated, setIsAuthentication] = useState(false);
  const PrivateRoute = ({element}) =>{
    return isAutheniticated ? element :  <Navigate to="/login" />
  }
  return (
    <div className="App">
      {/* data safe karne k liy jwt token h toh show krege home page */}
      <RefreshHandler setIsAuthenticated={setIsAuthentication} />
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        </Routes>
    </div>
  )
}

export default App
