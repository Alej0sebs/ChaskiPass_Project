import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import BusRegistration from './pages/Registration/bus.registration';
import RoutesRegistration from './pages/Processes/routes.processes';
import TerminalsRegistration from './pages/Registration/terminals.registration';
import TypebusRegistration from './pages/Registration/typebus.registration';
import TicketsalesRegistration from './pages/Processes/ticketsales.processes';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  //user authenticated?
  const { authUser } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Condición para determinar si aplicar o no DefaultLayout
  const isAuthRoute = pathname === '/auth/signin';

  return loading ? (
    <Loader />
  ) : (
    <>
      {isAuthRoute ? (
        <>
          <Routes>
            <Route
              path="/auth/signin"
              element={
                authUser ? <Navigate to='/' /> :
                  <>
                    <PageTitle title="Signin | ChaskiPass" />
                    <SignIn />
                  </>
              }
            />
          </Routes>
          <Toaster />
        </>
      ) : (
        <DefaultLayout>
          <Routes>
            <Route
              path='/'
              element={
                authUser ? <>
                  <PageTitle title="eCommerce Dashboard | ChaskiPass" />
                  <ECommerce />
                </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar | ChaskiPass" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                authUser ?
                  <>
                    <PageTitle title="Profile | ChaskiPass" />
                    <Profile />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                authUser ?
                  <>
                    <PageTitle title="Form Elements | ChaskiPass" />
                    <FormElements />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                authUser ?
                  <>
                    <PageTitle title="Form Layout | ChaskiPass" />
                    <FormLayout />
                  </> :
                  <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/tables"
              element={
                authUser ?
                  <>
                    <PageTitle title="Tables | ChaskiPass" />
                    <Tables />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/settings"
              element={
                authUser ?
                  <>
                    <PageTitle title="Settings | ChaskiPass" />
                    <Settings />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/chart"
              element={
                authUser ?
                  <>
                    <PageTitle title="Basic Chart | ChaskiPass" />
                    <Chart />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/ui/alerts"
              element={
                authUser ?
                  <>
                    <PageTitle title="Alerts | ChaskiPass" />
                    <Alerts />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/ui/buttons"
              element={
                authUser ?
                  <>
                    <PageTitle title="Buttons | ChaskiPass" />
                    <Buttons />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/auth/signup"
              element={
                authUser ?
                  <>
                    <PageTitle title="Signin | ChaskiPass" />
                    <SignUp />
                  </> :
                  <Navigate to='/auth/signin' />
              }
            />
            {/* Added by me  */}
            <Route
              path="/register/bus"
              element={
                authUser ?
                  <>
                    <PageTitle title="Bus | ChaskiPass" />
                    <BusRegistration />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/processes/routes"
              element={
                authUser ?
                  <>
                    <PageTitle title="Routes | ChaskiPass" />
                    <RoutesRegistration />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/register/terminals"
              element={
                authUser ?
                  <>
                    <PageTitle title="Terminals| ChaskiPass" />
                    <TerminalsRegistration />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/register/typebus"
              element={
                authUser ?
                  <>
                    <PageTitle title="Typebus| ChaskiPass" />
                    <TypebusRegistration />
                  </> : <Navigate to='/auth/signin' />
              }
            />
            <Route
              path="/processes/ticketsales"
              element={
                authUser ?
                  <>
                    <PageTitle title="Ticketsales| ChaskiPass" />
                    <TicketsalesRegistration />
                  </> : <Navigate to='/auth/signin' />
              }
            />
          </Routes>
          <Toaster />
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
