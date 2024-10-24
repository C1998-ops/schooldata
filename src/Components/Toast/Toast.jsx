import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconInfoCircleFilled,
  IconX,
} from "@tabler/icons-react";
import { useToast } from "../../hooks/useToast";
import { useEffect, useRef, useState } from "react";

const toastTypes = {
  success: {
    icon: <IconCircleCheckFilled className="text-green-500" />,
    iconClass: "success-icon",
    progressBarClass: "success",
  },
  warning: {
    icon: <IconAlertCircleFilled />,
    iconClass: "warning-icon",
    progressBarClass: "warning",
  },
  info: {
    icon: <IconInfoCircleFilled />,
    iconClass: "info-icon",
    progressBarClass: "info",
  },
  error: {
    icon: <IconCircleXFilled className="text-red-500" />,
    iconClass: "error-icon",
    progressBarClass: "error",
  },
};

const Toast = ({ message, type, id }) => {
  const timeRef = useRef(null);
  const toast = useToast();
  const [dismissed, setDismissed] = useState(false);
  const { icon, iconClass } = toastTypes[type];

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      handleDismiss();
    }, 2000);
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  function handleDismiss() {
    try {
      toast.remove(id);
      setDismissed(true);
    } catch (error) {
      console.error("err dismissing toast messenger", error);
    }
  }
  return (
    <div
      className={`toast ${
        dismissed ? "toast-dismissed" : ""
      } flex items-center justify-between w-full bg-white border rounded shadow-md p-2 transition-all ease-in-out`}
    >
      <span className={iconClass}>{icon}</span>
      <p className="toast-message flex-1 text-sm font-semibold text-gray-600 mx-2">
        {message}
      </p>
      <button
        className="dismiss-btn text-gray-900 hover:text-gray-700"
        onClick={handleDismiss}
      >
        <IconX
          size={18}
          color="#aeb0d7"
          className="border-none hover:ring-2 hover:rounded-full"
        />
      </button>
    </div>
  );
};

export default Toast;
