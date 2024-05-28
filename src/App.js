import React, { Suspense, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import { SET_AUTH_STATUS } from './Redux/Auth/actionTypes'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const AppContent = React.lazy(() => import('./components/AppContent'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const ForgetPassword = React.lazy(()=> import("./views/pages/ForgetPassword/ForgetPassword"))
// const MainRoutes = React.lazy(() => import('./routes'))
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const isAuth = useSelector((state) => state.Auth.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('auth')
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (isColorModeSet()) {
      return
    }
    if (token) {
      dispatch(SET_AUTH_STATUS(true))
    }
    setColorMode(storedTheme)
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps
  console.log(isAuth)
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {!isAuth && <Route exact path="/" element={<Navigate to={'/login'} replace />} />}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path='/forgetPassword' name="Forgetpassword" element={<ForgetPassword/>}/>
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*"  element={<DefaultLayout />} />
          {isAuth && <Route  path="/*" element={<AppContent />} />}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
