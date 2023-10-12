import React from 'react'
import AdminUserlist from '../../components/admin/AdminUserlist'
import Footer from '../../components/user/Footer'
import AdminHeader from '../../components/admin/AdminHeader'

function AdminUserScreen() {
  return (
    <>
    <AdminHeader/>
    <AdminUserlist/>
    <Footer/>
    </>
  )
}

export default AdminUserScreen