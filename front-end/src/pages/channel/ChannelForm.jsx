import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate, useParams } from 'react-router-dom'
import Channel from '../../models/Channel'
import getValidationMessages from '../../utils/getValidationMessages'

export default function ChannelForm() {
  const API_PATH = '/channels'

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    channel: {
      description: '',
      commission_fee: ''
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
    channel,
    errors,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const channelCopy = {...channel}
    channelCopy[event.target.name] = event.target.value
    setState({...state, channel: channelCopy})
  }

  function handleFormSubmit(event) {
    event.preventDefault()    // Evita que a página seja recarregada

    // Envia os dados para o back-end
    sendData()
  }

  React.useEffect(() => {
    //Se houver parâmetro id na rota, devemos carregar um registro existente para edição
    if(params.id) fetchData()
  }, [])

  async function fetchData() {
    setState({...state, showWaiting: true, errors:{}})
    try {
      const result = await myfetch.get(`${API_PATH}/${params.id}`)
      setState({
        ...state,
        channel: result,
        showWaiting: false
      })
    }
    catch(error){
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


  async function sendData() {
    setState({...state, showWaiting: true, errors: {}})
    try {

      //Chama a validação da biblioteca Joi
      await Channel.validateAsync(channel)

      //Registro ja existe: chama PUT pra atualizar
      if(params.id) await myfetch.put(`${API_PATH}/${params.id}`, channel)

      //Registro nao existe, chama POST para criar
      else await myfetch.post(API_PATH, channel)

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
    if(notif.severity === 'success') navigate("/channel")

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
      
      <PageTitle title={params.id ? "Editar canal de venda" : "Cadastrar novo canal de venda"} />

      <form onSubmit={handleFormSubmit}>
        <TextField 
          label="Descrição" 
          variant="filled"
          fullWidth
          required
          name="description"  // Nome do campo na tabela
          value={channel.description}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.description}
          helperText={errors?.description}
        />

        <TextField 
          label="Taxa de commissão" 
          variant="filled"
          type="number"
          fullWidth
          required
          name="commission_fee"  // Nome do campo na tabela
          value={channel.commission_fee}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.commission_fee}
          helperText={errors?.commission_fee}
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