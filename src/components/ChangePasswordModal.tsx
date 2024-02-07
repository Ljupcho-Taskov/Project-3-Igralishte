import React, { useState } from "react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveChanges: (oldPassword: string, newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSaveChanges,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    let errorMessage = "";

    if (newPassword.length < minLength || !hasUpperCase || !hasNumber) {
      errorMessage =
        "Password must be at least 8 characters, must contain at least one uppercase letter and must contain at least one number";
    }

    setPasswordError(errorMessage);
    return !errorMessage;
  };

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOldPasswordError("");
    setConfirmPasswordError("");

    const registrationDataString = localStorage.getItem("registrationData");

    if (!registrationDataString) {
      console.error("Registration data not found in local storage");
      return;
    }

    const registrationData = JSON.parse(registrationDataString);
    const correctOldPassword = registrationData && registrationData.password;

    if (oldPassword !== correctOldPassword) {
      setOldPasswordError("Wrong old password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Password doesn't match");
      return;
    }

    if (!validatePassword()) {
      return;
    }

    onSaveChanges(oldPassword, newPassword);
    onClose();
  };

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="order-modal">
        <div className="order-modal-content">
          <div className="sparksForm"></div>
          <form className="d-flex flex-column" onSubmit={handleSaveChanges}>
            <label htmlFor="oldPass">Стара Лозинка</label>
            <div className="password-input-container">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPass"
                name="oldPass"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility("oldPassword")}
              >
                {showOldPassword ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </span>
            </div>
            {oldPasswordError && (
              <p className="error-message">{oldPasswordError}</p>
            )}

            <label htmlFor="newPass">Нова Лозинка</label>
            <div className="password-input-container">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPass"
                name="newPass"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showNewPassword ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </span>
            </div>
            {passwordError && <p className="text-danger">{passwordError}</p>}

            <label htmlFor="confirmPass">Потврди Лозинка</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPass"
                name="confirmPass"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showConfirmPassword ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </span>
            </div>
            {confirmPasswordError && (
              <p className="error-message">{confirmPasswordError}</p>
            )}
            <button className="continue-button" type="submit">
              Зачувај
            </button>
          </form>

          <button onClick={onClose} className="cancel-order-button">
            Откажи
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
