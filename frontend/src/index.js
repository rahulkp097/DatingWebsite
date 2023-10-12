import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import HomeScreen from './components/user/Home.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.js';
import './index.css';


import UserHomeScreen from './screens/user/UserHomeScreen.jsx';
import UserLoginScreen from './screens/user/UserLoginScreen.jsx';
import UserProfileScreen from './screens/user/UserProfileScreen.jsx';
import UserRegisterScreen from './screens/user/UserRegisterScreen.jsx';
import AdminLoginScreen from './screens/admin/AdminLoginScreen.jsx';
import AdminHomeScreen from './screens/admin/AdminHomeScreen.jsx';
import AdminUserScreen from './screens/admin/AdminUserScreen.jsx';
import AdminSubscripctionsScreen from './screens/admin/AdminSubscripctionsScreen.jsx';
import AdminTokenScreen from './screens/admin/AdminTokenScreen.jsx';


const routes = (
  <Routes>
  <Route path="/" element={<App />}>
    <Route index={true} path='/' element={<UserHomeScreen />} />
    <Route path='/login' element={<UserLoginScreen />} />
    <Route path='/register' element={<UserRegisterScreen />} />
    <Route path='/profile' element={<UserProfileScreen />} />
  



    {/* admin route */}
    <Route path='/admin/' element={<AdminLoginScreen />}/>
  <Route path='/adminhome' element={<AdminHomeScreen />} />
  <Route path='/admin/users' element={<AdminUserScreen />} />
  <Route path='admin/subscriptions' element={<AdminSubscripctionsScreen />} />
  <Route path='/admin/token' element={<AdminTokenScreen />} />
</Route>
</Routes>
);
const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);
