import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setIsConfirm, setIsShow } from "../features/auth/sureSlice";

export default function Sure({ onOpen, message }) {
  const sure = useSelector((state) => state.sure.sure);
  const dispatch = useDispatch();
  const { isShow } = sure;
  useEffect(() => {
    if (isShow && onOpen) {
      onOpen(); // Trigger callback when it appears
    }
  }, []);

  const onClose = () => {
    dispatch(setIsShow(false));
  };
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a1a1a] p-6 rounded-xl shadow-xl text-white w-[90%] max-w-sm relative"
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-400 transition"
            >
              <X size={20} />
            </button>

            {/* Message */}
            <p className="text-center text-lg mb-6">{message}</p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(setIsConfirm(true));
                  dispatch(setIsShow(false));
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
