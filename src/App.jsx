import { Routes, Route, Navigate } from 'react-router-dom'
import { NotFound } from '~/pages/NotFound/NotFound'
import { Auth } from './pages/Auth/Auth'
import { AccountVerification } from '~/pages/Auth/AccountVerification'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from './pages/Auth/ProtectedRoute'

const App = () => {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={<Navigate to='/login' replace={true} />} />

      {/* Protected Row */}
      <Route element={<ProtectedRoute user={currentUser} />}>
      </Route>

      {/*Auth*/}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/users/verification' element={<AccountVerification />} />

      {/* 404 Not found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App

