import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePAge'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import VaultPage from './pages/Vault'
import DemoPage from './pages/Demo'
import OAuthSuccess from './pages/Oauth-success'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/vault' element={<VaultPage />} />
      <Route path='/demo' element={<DemoPage />} />
      <Route path='/oauth-success' element={<OAuthSuccess />} />
    </Routes>
  )
}
