import { Box, Button, IconButton, InputAdornment, Link as MuiLink, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { resetPasswordAPI } from '~/apis/index.js'
import { useNavigate } from 'react-router-dom'
import { FIELDS_REQUIRED_MESSAGE } from '~/utils/validators.js'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert.jsx'
import { useState } from 'react'
import VisibilityOff from '@mui/icons-material/VisibilityOff.js'
import Visibility from '@mui/icons-material/Visibility.js'

export const EnterPassword = (props) => {
  const { register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [reEnterPasswordVisible, setReEnterPasswordVisible] = useState(false)

  const navigate = useNavigate()

  const submit = (data) => {
    const { token, newPassword, reEnterPassword } = data

    if (newPassword !== reEnterPassword) {
      setError('reEnterPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      })
      return
    }

    toast.promise(
      resetPasswordAPI({ token, newPassword }),
      { pending: 'Resetting password...' }
    ).then(res => {
      if (!res.error) {
        toast.success('Reset password successfully!', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce
        })

        navigate(`/login?pre=${props.email}`)
      }
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <Typography sx={{ mb: 1, p: 1, color: '#597151', textAlign: 'center' }}>
                We&#39;ve sent a code to
        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
          {' ' + props.email}
        </Typography>.
      </Typography>

      <Typography sx={{ fontWeight: 'bold', mb: 0.2 }}>Code
        <Typography component="span" sx={{ color: 'red' }}>*</Typography>
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter code"
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['token']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        {...register('token', {
          required: FIELDS_REQUIRED_MESSAGE
        })}
      />
      <FieldErrorAlert errors={errors} fieldName={'token'} />

      <Typography sx={{ fontWeight: 'bold', mb: 0.2 }}>Password
        <Typography component="span" sx={{ color: 'red' }}>*</Typography>
      </Typography>
      <TextField
        fullWidth
        type={passwordVisible ? 'text' : 'password'}
        placeholder="Enter password"
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['newPassword']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        {...register('newPassword', {
          required: FIELDS_REQUIRED_MESSAGE
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <FieldErrorAlert errors={errors} fieldName={'newPassword'} />

      <Typography sx={{ fontWeight: 'bold', mb: 0.2 }}>Re-enter password
        <Typography component="span" sx={{ color: 'red' }}>*</Typography>
      </Typography>
      <TextField
        fullWidth
        type={reEnterPasswordVisible ? 'text' : 'password'}
        placeholder="Re-enter password"
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['reEnterPassword']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle re-enter password visibility"
                onClick={() => setReEnterPasswordVisible(!reEnterPasswordVisible)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {reEnterPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...register('reEnterPassword', {
          required: FIELDS_REQUIRED_MESSAGE
        })}
      />
      <FieldErrorAlert errors={errors} fieldName={'reEnterPassword'} />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 1.5, mb: 1.5, bgcolor: (theme) => theme.palette.primary.main, '&:hover': { bgcolor: (theme) => theme.palette.primary.dark } }}
      >
            Reset password
      </Button>

      <Box sx={{ mt: 1.5, textAlign: 'center' }}>
        <MuiLink component={Button} onClick={props.back} variant="body2">
                Haven&#39;t received email?
        </MuiLink>
      </Box>

    </Box>
  )
}