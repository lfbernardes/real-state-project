import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import UserView from "./views/UsersView.jsx";
import Clients from "./views/Clients";
import ClientsView from "./views/ClientsView.jsx";
import State from "./views/State.jsx";
import StateForm from './views/StateForm'
import StateView from './views/StateView.jsx'
import ClientsForm from './views/ClientsForm'
import Schedule from './views/Schedule'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/edit/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/users/show/:id',
        element: <UserView key="userShow" />
      },
      {
        path: '/clients',
        element: <Clients />
      },
      {
        path: '/clients/new',
        element: <ClientsForm key="clientCreate" />
      },
      {
        path: '/clients/edit/:id',
        element: <ClientsForm key="clientUpdate"/>
      },
      {
        path: '/clients/show/:id',
        element: <ClientsView key="clientShow"/>
      },
      {
        path: '/states/new',
        element: <StateForm key="stateCreate" />
      },
      {
        path: '/states/edit/:id',
        element: <StateForm key="stateUpdate" />
      },
      {
        path: '/states/show/:id',
        element: <StateView key="stateShow" />
      },
      {
        path: '/states',
        element: <State />
      },
      {
        path: '/schedule',
        element: <Schedule />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
