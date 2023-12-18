import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import firebaseConfig from './authentication/firebaaseConfig.jsx';
import store from './store.jsx';
import { Provider } from 'react-redux';
import Registration from './pages/Registration/Registration.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';



const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>     
  </React.StrictMode>,
)
