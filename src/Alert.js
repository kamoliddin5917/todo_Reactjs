import React, { useEffect } from "react";

const Alert = ({ type, msg, showAlert, lists }) => {
  useEffect(() => {
    const alert = setTimeout(() => {
      showAlert();
    }, 2500);
    return () => clearTimeout(alert);
  }, [lists, showAlert]);
  return <div className={`alert alert-${type}`}>{msg}</div>;
};

export default Alert;
