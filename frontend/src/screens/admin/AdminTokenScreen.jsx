import React from 'react'
import AdminTokens from '../../components/admin/AdminTokens'
import AdminSideBar from '../../components/admin/AdminSideBar'

function AdminTokenScreen() {
  return (
    <div className=" h-screen w-screen overflow-hidden flex flex-row">
    <AdminSideBar />
    
      <div className="flex-1 p-4 min-h-0 overflow-auto">
          <AdminTokens/>
      </div>
    
  </div>
  )
}

export default AdminTokenScreen