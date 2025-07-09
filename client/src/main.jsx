import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth, Profile, Chat } from "./pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Navigate to="/auth" />} />

      <Route
        path="auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />

      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/auth" />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
