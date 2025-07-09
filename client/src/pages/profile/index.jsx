import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiClient } from "../../lib/apiClient";
import { setNotif } from "../../features/auth/notifySlice";
import {
  REMOVE_PROFILE_PIC,
  UPDATE_PROFILE_ROUTE,
  UPLOAD_PROFILE_PIC,
} from "../../utils/constants";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Loader from "../../components/Loader";
import { setIsConfirm, setIsShow } from "../../features/auth/sureSlice";

export default function ProfilePage() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const sure = useSelector((state)=> state.sure.sure);
  const { isConfirm} = sure;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(userInfo.image);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
    }
  }, [userInfo]);

  const validate = () => {
    if (!firstName.length && !lastName.length) {
      dispatch(
        setNotif({
          message: "Please fill the details",
          type: "error",
        })
      );
      return false;
    } else if (!firstName.length) {
      dispatch(setNotif({ message: "First Name is required ", type: "error" }));
      return false;
    } else if (!lastName.length) {
      dispatch(setNotif({ message: "Last Name is required ", type: "error" }));
      return false;
    }
    return true;
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, id: userInfo.id },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          // console.log(response.data.user);
          dispatch(setUser({ ...response.data.user }));
          navigate("/chat");
          dispatch(
            setNotif({
              message: "Profile updated successfully!",
              type: "success",
            })
          );
        }
      }
    } catch (err) {
      dispatch("Profile setup failed. Please try again");
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      dispatch(
        setNotif({ message: "Please setup the profile first", type: "error" })
      );
    }
  };

  const handlePlus = ()=>{
    inputRef.current.click();
  }

  const handleRemoveProfilePic = async () =>{
    if(userInfo.image){
      setLoading(true);
      const response = await apiClient.delete(
        REMOVE_PROFILE_PIC,
        {withCredentials: true}
      );
      if(response.status === 200){
        dispatch(setUser({...userInfo,image: null}));
        setImage(userInfo.image);
        setLoading(false);
        dispatch(setNotif({message: "Profile photo removed", type: "success"}));
        console.log(response.data);
      }
    }
  }

  
  useEffect(() => {
    if(isConfirm){
       handleRemoveProfilePic();
       dispatch(setIsConfirm(null));
      
    }
   
  }, [isConfirm])
  
  

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);
      setLoading(true);
      const response = await apiClient.post(UPLOAD_PROFILE_PIC, formData, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.status === 200 && response.data.user.image) {
        setImage(response.data.user.image);

        dispatch(setUser({ ...userInfo, image: response.data.user.image }));
        setLoading(false);
        dispatch(
          setNotif({ message: "Profile image uploaded!", type: "success" })
        );
      }
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center p-4">
        {loading && <Loader />}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl relative"
        >
          <div className="absolute top-6 left-6 cursor-pointer">
            <ArrowLeft
              size={28}
              onClick={handleNavigate}
              className="text-white hover:text-purple-400 transition-colors"
            />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center mb-6 relative"
          >
            <label
              htmlFor="profilePic"
              className={`relative group cursor-pointer w-32 h-32 rounded-full bg-[#111827] flex items-center justify-center text-4xl font-bold ${
                userInfo.image ? "" : "text-blue-400 border-4 border-blue-400"
              } transition-all duration-300`}
            >
              {userInfo.image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>
                  {userInfo.firstName
                    ? userInfo.firstName.charAt(0).toUpperCase()
                    : userInfo.email.charAt(0).toUpperCase()}
                </span>
              )}

              {/* + Icon on Hover */}
              <div className="absolute inset-0 bg-black/60 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Plus className="text-white w-6 h-6" />
              </div>

              {/* Hidden file input */}
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicUpload}
                name="profilePic"
                ref={inputRef}
              />
            </label>

            {/* Two small icons below like thought bubbles */}
            <div className="flex gap-2 items-center absolute bottom-[-3px] right-[80px]">
              {/* Add/change icon bubble */}

              <div className="relative group/add bg-purple-600 p-2 rounded-full hover:bg-purple-700 cursor-pointer" onClick={handlePlus}>
                <Plus className="text-white w-4 h-4" />
                <span className="absolute left-full ml-2 bottom-1/2 -translate-y-1/2 text-xs text-white bg-gray-800 px-2 py-0.5 rounded opacity-0 group-hover/add:opacity-100 transition">
                  Add / Change Image
                </span>
              </div>
              {/* Delete icon bubble */}
              <div className="relative group/delete bg-red-500 p-2 rounded-full hover:bg-red-400 cursor-pointer" onClick={()=>{dispatch(setIsShow(true));}}>
                <Trash2 className="text-white w-4 h-4" />
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs text-white bg-gray-800 px-2 py-0.5 rounded opacity-0 group-hover/delete:opacity-100 transition">
                  Remove Image
                </span>
              </div>

            </div>
          </motion.div>

          <form onSubmit={handleSaveChanges} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="email"
                value={userInfo.email}
                disabled
                className="w-full p-3 rounded-lg bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-not-allowed"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all text-white p-3 rounded-lg font-semibold shadow-lg"
            >
              Save Changes
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
