import { Routes, Route, Navigate } from 'react-router-dom'
import { NotFound } from '~/pages/NotFound/NotFound'
import { Auth } from './pages/Auth/Auth'
import { AccountVerification } from '~/pages/Auth/AccountVerification'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from './pages/Auth/ProtectedRoute'
import Home from './pages/Home/Home'
import { PasswordReset } from '~/pages/Auth/PasswordReset/PasswordReset.jsx'
import Board from './pages/Board/Board'

const App = () => {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      {/* <Route path='/' element={<Navigate to='/' replace={true} />} /> */}

      {/* Protected Row */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path='/' element={<Home />} />
        <Route path='/boards/:boardId' element={<Board />} />
      </Route>

      {/*Auth*/}
      <Route path='/login' element={<Auth />} />
      <Route path='/reset' element={<Auth />} />
      <Route path='/reset' element={<PasswordReset />} />
      <Route path='/users/verification' element={<AccountVerification />} />

      {/* 404 Not found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App

