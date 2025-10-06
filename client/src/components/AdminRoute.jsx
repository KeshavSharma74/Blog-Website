import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminRoute = ({ children }) => {
  const { user, isCheckingAuth } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log('=== AdminRoute Debug ===')
    console.log('isCheckingAuth:', isCheckingAuth)
    console.log('user:', user)
    console.log('user role:', user?.role)
    console.log('isAdmin:', user && user.role === 'admin')
    console.log('========================')
  }, [user, isCheckingAuth])

  // Wait for auth check to complete
  if (isCheckingAuth) {
    console.log('AdminRoute: Still checking auth, showing loading...')
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.log('AdminRoute: No user found, redirecting to login')
    toast.error('Please login first to access this page')
    return <Navigate to="/login" replace />
  }

  // If user is not admin, redirect to home
  if (user.role !== 'admin') {
    console.log('AdminRoute: User is not admin, role:', user.role)
    toast.error('Unauthorized: Admin access required')
    return <Navigate to="/" replace />
  }

  console.log('AdminRoute: User is admin, rendering protected content')
  // If user is admin, render the protected component
  return children
}

export default AdminRoute
