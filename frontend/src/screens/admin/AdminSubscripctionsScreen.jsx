import React from 'react'
import AdminSubscriptions from '../../components/admin/AdminSubscriptions'
import AdminSideBar from '../../components/admin/AdminSideBar'

function AdminSubscripctionsScreen() {
  return (
  
      <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <AdminSideBar />
   
      <div className="flex-1 p-4 min-h-0 overflow-auto">
          <AdminSubscriptions/>
      </div>
  
  </div>
  
  )
}

export default AdminSubscripctionsScreen