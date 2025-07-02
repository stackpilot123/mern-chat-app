import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const icons = {
  error: <XCircle className="w-5 h-5 text-purple-200" />,
  success: <CheckCircle className="w-5 h-5 text-emerald-200" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-200" />
};

const bgColor = {
  error: "bg-purple-700/90",
  success: "bg-emerald-700/90",
  warning: "bg-amber-600/90"
};

export default function Notification({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm ${bgColor[type]} text-gray-100`}
        >
          {icons[type]}
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
