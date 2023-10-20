import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminlogoutMutation } from '../../slices/adminApiSlice';
import { logoutAdmin } from '../../slices/adminAuthSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [adminLogoutApi]=useAdminlogoutMutation()

const logoutHandler = async () => {
  try {
    let res=await adminLogoutApi().unwrap();
    dispatch(logoutAdmin());
    navigate('/admin');
    if(res){
      toast.success("Logout Successfully")
    }else{
      toast.error("Logout Failed")
    }
    
  } catch (error) {
    console.log(error);
  }
}
  return (
    <header className="bg-neutral text-white p-4">
      <nav className="flex justify-center space-x-4">
        <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/admin/users" className="hover:underline">Users</Link>
        <Link to="/admin/subscriptions" className="hover:underline">Subscriptions</Link>
        <Link to="/admin/token" className="hover:underline">Token</Link>
        <Link onClick={logoutHandler} className=" hover:underline">LogOut</Link>

      </nav>
    </header>
  );
}

export default AdminHeader;
