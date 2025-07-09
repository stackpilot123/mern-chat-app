import { Outlet } from "react-router-dom";
import Notification from "../src/components/Notification";
import { useSelector, useDispatch } from "react-redux";
import { setNotif } from "./features/auth/notifySlice";
import { useEffect, useState } from "react";
import { apiClient } from "../src/lib/apiClient";
import { GET_USER_INFO } from "./utils/constants";
import { setUser } from "./features/auth/authSlice";
import Sure from "./components/Sure";
import { Loader } from "lucide-react";

function App() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const notif = useSelector((state) => state.notification.notify);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.user.id) {
          dispatch(setUser(response.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (err) {
        console.log(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {notif.message && (
        <Notification
          message={notif.message}
          type={notif.type}
          onClose={() => dispatch(setNotif({ message: "", type: "error" }))}
        />
      )}
      <Sure
        // isSure={true}
        message="Are you sure you want to delete this?"
        // onClose={() => setIsSure(false)}
        onOpen={() => console.log("Dialog opened")}
      />
      <Outlet />
    </>
  );
}

export default App;
