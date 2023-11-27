import React from 'react'
import AdminUserlist from '../../components/admin/AdminUserlist'
import AdminSideBar from '../../components/admin/AdminSideBar'

function AdminUserScreen() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row">
    <AdminSideBar />
  
      <div className="flex-1 p-4 min-h-0 overflow-auto">
          <AdminUserlist/>
      
    </div>
  </div>
  )
}

export default AdminUserScreen