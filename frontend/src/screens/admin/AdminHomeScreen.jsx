import React from 'react'
import AdminDashboard from '../../components/admin/AdminDashboard'
import AdminSideBar from '../../components/admin/AdminSideBar'


function AdminHomeScreen() {
  return (
  
      <div className="h-screen w-screen overflow-hidden flex flex-row">
    <AdminSideBar />
 
      <div className="flex-1 p-4 min-h-0 overflow-auto">
          <AdminDashboard/>
      </div>
    
  </div>

   
  )
}

export default AdminHomeScreen