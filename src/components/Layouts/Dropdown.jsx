import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Avatar, Divider, IconButton, ListItemIcon, Tooltip } from '@mui/material'
import { useState } from 'react'
import { Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice.js'
import { toast } from 'react-toastify'


export const Dropdown = () => {

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const nav = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || 'https://via.placeholder.com/150')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const dispatch = useDispatch()

  const logout = () => {
    toast.promise(
      dispatch(logoutUserAPI()),
      { pending: 'Logging out...' }
    ).then(res => {
      if (!res.error) nav('/login')
    })
  }


  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar src={avatarUrl}
            sx={{ width: 32, height: 32 }}>
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'primary',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => nav('/profile')}>
          <Avatar src={avatarUrl}
            sx={{
              marginRight: '10px'
            }}
          />{currentUser?.name || 'User'}
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}