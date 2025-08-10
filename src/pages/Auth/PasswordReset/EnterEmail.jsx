import { Box, Button, Link as MuiLink, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FIELDS_REQUIRED_MESSAGE } from '~/utils/validators.js'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert.jsx'
import { toast } from 'react-toastify'
import { requestPasswordResetAPI } from '~/apis/index.js'
import { Link } from 'react-router-dom'

export const EnterEmail = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submit = (data) => {
    const { email } = data
    toast.promise(
      requestPasswordResetAPI({ email }),
      { pending: 'Sending email...' }
    ).then(res => {
      if (!res.error) {
        props.cb(email)
      }
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <Typography sx={{ mb: 1, p: 1, color: '#597151', textAlign: 'center' }}>
            Enter your email address and we&#39;ll send you instructions to reset your password.
      </Typography>

      <Typography sx={{ fontWeight: 'bold', mb: 0.2 }}>Email
        <Typography component="span" sx={{ color: 'red' }}>*</Typography>
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter email"
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['email']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        {...register('email', {
          required: FIELDS_REQUIRED_MESSAGE
        })}
      />
      <FieldErrorAlert errors={errors} fieldName={'email'} />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 1.5, mb: 1.5, bgcolor: (theme) => theme.palette.primary.main, '&:hover': { bgcolor: (theme) => theme.palette.primary.dark } }}
      >
        Send email
      </Button>

      <Box sx={{ mt: 1.5, textAlign: 'center' }}>
        <MuiLink component={Link} to="/login" variant="body2">
                Back to login page
        </MuiLink>
      </Box>
    </Box>
  )
}