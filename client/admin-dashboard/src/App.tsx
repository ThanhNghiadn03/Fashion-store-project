import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import NotFound from 'components/share/not.found';
import Loading from 'components/share/loading';
import LoginPage from 'pages/auth/login';
import RegisterPage from 'pages/auth/register';
import LayoutAdmin from 'components/admin/layout.admin';
import ProtectedRoute from 'components/share/protected-route.ts';
import Header from 'components/client/header.client';
import Footer from 'components/client/footer.client';
import HomePage from 'pages/home';
import 'styles/app.module.scss';
import DashboardPage from './pages/admin/dashboard';
import CompanyPage from './pages/admin/company';
import PermissionPage from './pages/admin/permission';
import ResumePage from './pages/admin/resume';
import RolePage from './pages/admin/role';
import UserPage from './pages/admin/user';
import { fetchAccount } from './redux/slice/accountSlide';
import LayoutApp from './components/share/layout.app';
import JobPage from './pages/admin/job';
import ProductPage from './pages/admin/product';

const LayoutClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className='layout-app'>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  )
}

export default function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.account.isLoading);


  useEffect(() => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount())
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LayoutApp><LayoutClient /></LayoutApp>),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },

      ],
    },

    {
      path: "/admin",
      element: (<LayoutApp><LayoutAdmin /> </LayoutApp>),
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
        },
        {
          path: "product",
          element:
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
        },
        {
          path: "listAdmin",
          element:
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
        },

        {
          path: "customer",
          element:
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
        },

        {
          path: "voucher",
          element:
            <ProtectedRoute>
              <ResumePage />
            </ProtectedRoute>
        },
        {
          path: "category",
          element:
            <ProtectedRoute>
              <PermissionPage />
            </ProtectedRoute>
        },
        {
          path: "role",
          element:
            <ProtectedRoute>
              <RolePage />
            </ProtectedRoute>
        }
      ],
    },


    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {
        // isLoading === false
        //   || window.location.pathname === '/login'
        //   || window.location.pathname === '/register'
        //   || window.location.pathname === '/'
        //   ?
        <RouterProvider router={router} />
        // :
        // <Loading />
      }
    </>
  )
}