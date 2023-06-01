import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_method/PaymentMethodList'
import PaymentMethodForm from './pages/payment_method/PaymentMethodForm'


function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  function AuthGuard({children}) {
    // Estaremos autenticados se tivermos um token gravado no localStorage
    if(isLoggedIn) return children
    else return <Navigate to="/login" replace />
  }

  function onLoginLogout(loggedIn) {
    setIsLoggedIn(loggedIn)
  }

  return (
    <BrowserRouter>
      <HeaderBar isLoggedIn={isLoggedIn} onLoginLogout={onLoginLogout} />
      <Box sx={{ m: '25px auto', p: '25px' }}>
        <Routes>
          
          <Route path="/login" element={
            <Login onLoginLogout={onLoginLogout} />} 
          />
          
          <Route path="/" element={ 
            <AuthGuard> <Home /> </AuthGuard> 
          } />
          
          <Route path="/payment_method" element={ 
            <AuthGuard> <PaymentMethodList /> </AuthGuard> 
          } />

          <Route path="/payment_method/new" element={ 
            <AuthGuard> <PaymentMethodForm /> </AuthGuard> 
          } />

          <Route path="/payment_method/:id" element={ 
            <AuthGuard> <PaymentMethodForm /> </AuthGuard> 
          } />

        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App