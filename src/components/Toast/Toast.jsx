import React from "react";
import { useShop } from "../../context/ShopContext";
import "./Toast.css";

const Toast = () => {
  const { toast } = useShop();
  if (!toast) return null;
  return (
    <div className={`nexora-toast nexora-toast--${toast.type}`} role="status">
      <span className="nexora-toast__icon">
        {toast.type === "success" && "\u2713"}
        {toast.type === "error" && "!"}
        {toast.type === "info" && "i"}
      </span>
      <span className="nexora-toast__msg">{toast.message}</span>
    </div>
  );
};

export default Toast;
