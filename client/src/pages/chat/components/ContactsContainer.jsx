import React, { useState } from "react";
import { X, Menu, LogOut, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ContactsContainer = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () =>{
    console.log("clicked")
  }
  const contacts = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Mike Johnson" },
    { name: "Emma Brown" },
  ];

  return (
    <>
      {/* Toggle Button - Mobile only */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 p-2 rounded text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-[75vw] max-w-[300px] bg-[#0f1117] text-gray-300 px-4 py-6 shadow-lg border-r border-gray-800 transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-[20vw] md:min-w-[200px] flex flex-col justify-between`}
      >
        {/* Top Section */}
        <div>
          {/* Close Icon for Mobile */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h1 className="text-lg font-bold text-white">Syncronus</h1>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <X />
            </button>
          </div>

          {/* Header (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-sm">
              <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
            </div>
            <h1 className="text-lg font-bold text-white">Syncronus</h1>
          </div>

          {/* Sections */}
          <div className="uppercase text-sm tracking-widest text-gray-400">
            Direct
          </div>
          <div className="text-sm bg-gray-700/30 text-white px-2 py-1 rounded w-fit mb-4">
            Messages
          </div>

          <div className="uppercase text-sm tracking-widest text-gray-400">
            Contacts
          </div>
          <ul className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-300px)] scrollbar-thin scrollbar-thumb-gray-700">
            {contacts.map((contact, index) => (
              <li
                key={index}
                className="px-3 py-2 rounded hover:bg-[#20222b] transition-all cursor-pointer"
              >
                {contact.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Footer */}
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex items-center justify-between gap-3">
            {/* Profile Pic + Name */}
            <div className="flex items-center gap-3">
              {userInfo.image ? (
                <img
                  src={userInfo.image} // Use a fallback if no profilePic
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) :
                <div className="w-12 h-12 p-1 rounde-full flex items-center justify-center text-blue-300 text-xl border-blue-300 border rounded-full">{userInfo.firstName.charAt(0).toUpperCase()}</div>}

              <div className="flex">
                <span className="text-sm font-medium">{userInfo.username}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div
                className="text-xs text-gray-400 group relative"
                onClick={() => navigate("/profile")}
              >
                <Pencil
                  size={16}
                  className="cursor-pointer hover:text-purple-400"
                />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                  Edit Profile
                </span>
              </div>
              {/* Logout */}
              <button className="hover:text-red-500 transition" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsContainer;
