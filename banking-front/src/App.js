import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute, SessionProvider } from './utils/Session';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import SignupScreen from './screens/SignupScreen';
import { DataProvider } from './utils/Data';
import AddAccountScreen from './screens/AddAccountScreen';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute inverse redirect="/dashboard">
      <LoginScreen />
    </ProtectedRoute>,
  },
  {
    path: "/signup",
    element: <ProtectedRoute inverse redirect="/dashboard">
      <SignupScreen />
    </ProtectedRoute>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute>
      <DashboardScreen />
    </ProtectedRoute>,
  },
  {
    path: "/add-account",
    element: <ProtectedRoute>
      <AddAccountScreen />
    </ProtectedRoute>
  }
]);

function App() {



  return (
    <div className="App">
      <SessionProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </SessionProvider>
    </div>
  );
}

export default App;
