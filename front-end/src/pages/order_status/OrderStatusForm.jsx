import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import OrderStatus from '../../models/OrderStatus'
import getValidationMessages from '../../utils/getValidationMessages'

export default function OrderStatusForm() {
  const API_PATH = '/order_statuses'

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    order_status: {
        sequence: '',
        description: ''
    },
    errors: {},
    showWaiting: false,
    notif: {
      show: false,
      severity: 'success',
      message: ''
    }
  })
  const {
    order_status,
    errors,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const order_statusCopy = {...order_status}
    order_statusCopy[event.target.name] = event.target.value
    setState({...state, order_status: order_statusCopy})
  }

  function handleFormSubmit(event) {
    event.preventDefault()    // Evita que a página seja recarregada

    // Envia os dados para o back-end
    sendData()
  }

  async function sendData() {
    setState({...state, showWaiting: true, errors: {}})
    try {

      //Chama a validação da biblioteca Joi
      await OrderStatus.validateAsync(order_status)

      await myfetch.post(API_PATH, order_status)
      // DAR FEEDBACK POSITIVO E VOLTAR PARA A LISTAGEM
      setState({
        ...state, 
        showWaiting: false,
        notif: {
          severity: 'success',
          show: true,
          message: 'Novo item salvo com sucesso'
        }
      })
    }
    catch(error) {
      const {validationError, errorMessages } = getValidationMessages(error)

      console.error(error)

      setState({
        ...state, 
        showWaiting: false,
        errors: errorMessages,
        notif: {
          severity: 'error',
          show: true,
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  function handleNotifClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    
    //Se o item foi salvo com sucesso, retorna a pagina de listagem
    if(notif.severity === 'success') navigate("/order_status")

    setState({ ...state, notif: { ...notif, show: false } })
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Notification 
        show={notif.show} 
        severity={notif.severity} 
        onClose={handleNotifClose}
      >
        {notif.message}
      </Notification>
      
      <PageTitle title="Cadastrar novo status de pedido" />

      <form onSubmit={handleFormSubmit}>
      <TextField 
          label="Sequência" 
          variant="filled"
          type="integer"
          fullWidth
          required
          name="sequence"  // Nome do campo na tabela
          value={order_status.sequence}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.sequence}
          helperText={errors?.sequence}
        />
        <TextField 
          label="Descrição" 
          variant="filled"
          fullWidth
          required
          name="description"  // Nome do campo na tabela
          value={order_status.description}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.description}
          helperText={errors?.description}
        />

        <Fab 
          variant="extended" 
          color="secondary"
          type="submit"
        >
          <SendIcon sx={{ mr: 1 }} />
          Enviar
        </Fab>

      </form>
    </>
  )
}