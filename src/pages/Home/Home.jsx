import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { testAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

const Home = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }

  const handleHello = () => {
    testAPI().then((res) => console.log(res))
  }

  return (
    <Box>
      <Button
        onClick={handleLogout}
      >logout</Button>

      <Button
        onClick={handleHello}
      >hello</Button>
    </Box>
  )
}

export default Home
