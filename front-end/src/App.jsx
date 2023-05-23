import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_method/PaymentMethodList'
import PaymentMethodForm from './pages/payment_method/PaymentMethodForm'
import ChannelList from './pages/channel/ChannelList'
import ChannelForm from './pages/channel/ChannelForm'
import CarrierList from './pages/carrier/CarrierList'
import CarrierForm from './pages/carrier/CarrierForm'
import ShipmentPriorityList from './pages/shipment_priority/ShipmentPriorityList'
import ShipmentPriorityForm from './pages/shipment_priority/ShipmentPriorityForm'
import OrderStatusList from './pages/order_status/OrderStatusList'
import OrderStatusForm from './pages/order_status/OrderStatusForm'
import TagList from './pages/tag/TagList'
import TagForm from './pages/tag/TagForm'
import UserList from './pages/user/UserList'
import UserForm from './pages/user/UserForm'

function AuthGuard({children}) {
  // Estaremos autenticados se tivermos um token gravado no localStorage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" replace />
}

function App() {

  return (
    <BrowserRouter>
      <HeaderBar />
      <Box sx={{ m: '25px auto', p: '25px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={ <AuthGuard> <Home /> </AuthGuard> } />
          
          <Route path="/payment_method" element={ 
          <AuthGuard> <PaymentMethodList /> </AuthGuard> } />

          <Route path="/payment_method/new" element={ 
          <AuthGuard> <PaymentMethodForm /> </AuthGuard> } />

          <Route path="/channel" element={ 
          <AuthGuard> <ChannelList /> </AuthGuard> } />

          <Route path="/channel/new" element={ 
          <AuthGuard> <ChannelForm /> </AuthGuard> } />

          <Route path="/carrier" element={ 
          <AuthGuard> <CarrierList /> </AuthGuard> } />

          <Route path="/carrier/new" element={ 
          <AuthGuard> <CarrierForm /> </AuthGuard> } />

          <Route path="/shipment_priority" element={ 
          <AuthGuard> <ShipmentPriorityList /> </AuthGuard> } />

          <Route path="/shipment_priority/new" element={ 
          <AuthGuard> <ShipmentPriorityForm /> </AuthGuard> } />

          <Route path="/order_status" element={ 
          <AuthGuard> <OrderStatusList /> </AuthGuard> } />

          <Route path="/order_status/new" element={ 
          <AuthGuard> <OrderStatusForm /> </AuthGuard> } />

          <Route path="/tag" element={ 
          <AuthGuard> <TagList /> </AuthGuard> } />

          <Route path="/tag/new" element={ 
          <AuthGuard> <TagForm /> </AuthGuard> } />

          <Route path="/user" element={ 
          <AuthGuard> <UserList /> </AuthGuard> } />

          <Route path="/user/new" element={ 
          <AuthGuard> <UserForm /> </AuthGuard> } />

          <Route path="/payment_method/:id" element={ 
          <AuthGuard> <PaymentMethodForm /> </AuthGuard> } />

        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App