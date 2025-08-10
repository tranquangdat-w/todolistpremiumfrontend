import { Box } from '@mui/material'
import { useState } from 'react'
import { EnterEmail } from '~/pages/Auth/PasswordReset/EnterEmail.jsx'
import { EnterPassword } from '~/pages/Auth/PasswordReset/EnterPassword.jsx'

export const PasswordReset = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')
  const sentEmail = (_email) => {
    setEmailSent(true)
    setEmail(_email)
  }
  const back = () => {
    setEmail('')
    setEmailSent(false)
  }

  return (
    <Box sx={{ mt: 1 }}>
      {!emailSent ? <EnterEmail cb={sentEmail}/> : <EnterPassword back={back} email={email}/>}
    </Box>
  )
}