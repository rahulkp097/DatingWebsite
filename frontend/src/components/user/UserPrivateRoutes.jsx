import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/userApiSlice";

const UserPrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall, { isLoading }] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      dispatch(logout());
      const res = await logoutApiCall().unwrap();
      navigate("/login");
      if (res) {
        toast.warning("your Account has been bloked by admin")
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);
  if(userInfo?.isActive==false) {
    logoutHandler()
  }
  return userInfo?.isActive ? <Outlet /> : <Navigate to="/login" replace />;
};
export default UserPrivateRoute;
