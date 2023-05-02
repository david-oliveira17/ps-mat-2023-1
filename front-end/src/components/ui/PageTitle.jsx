import React from 'react'
import { Typography } from '@mui/material'

export default function PageTitle({title}){
    return(
        <Typography variant="h3" component="h1" sx={{ textAlign: 'center', mb: '30px' }}>
        {title}
      </Typography>

    )
}