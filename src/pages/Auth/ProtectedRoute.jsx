import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '~/components/Layouts/Navbar'

export const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }

  return <div className='overflow-hidden h-screen'>
    <Navbar />
    <div className="pt-12">
      <Outlet />
    </div>
  </div>

}
