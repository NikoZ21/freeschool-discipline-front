import React, { useState } from "react";
import "./Registration.css";
import CustomInput from "../components/CustomInput";
import { gradient, button, shadow, status, primary } from "../theme/colors";

export default function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "მომხმარებლის სახელი აუცილებელია";
    } else if (formData.username.length < 3) {
      newErrors.username = "მომხმარებლის სახელი უნდა იყოს მინიმუმ 3 სიმბოლო";
    }

    if (!formData.password.trim()) {
      newErrors.password = "პაროლი აუცილებელია";
    } else if (formData.password.length < 6) {
      newErrors.password = "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "პაროლის დადასტურება აუცილებელია";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "პაროლები არ ემთხვევა";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitMessage("მომხმარებელი წარმატებით დარეგისტრირდა!");
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch {
      setSubmitMessage("შეცდომა რეგისტრაციისას. გთხოვთ სცადოთ თავიდან.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="container">
        <div className="registration-section">
          <h2 className="section-title">ახალი მომხმარებლის რეგისტრაცია</h2>

          <div className="form-container">
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  მომხმარებლის სახელი
                </label>
                <CustomInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="შეიყვანეთ მომხმარებლის სახელი"
                  value={formData.username}
                  onChange={handleInputChange}
                  errorMessage={errors.username}
                  showError={!!errors.username}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  პაროლი
                </label>
                <CustomInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="შეიყვანეთ პაროლი"
                  value={formData.password}
                  onChange={handleInputChange}
                  errorMessage={errors.password}
                  showError={!!errors.password}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  პაროლის დადასტურება
                </label>
                <CustomInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="დაადასტურეთ პაროლი"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  errorMessage={errors.confirmPassword}
                  showError={!!errors.confirmPassword}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className={`submit-button ${
                    isSubmitting ? "submitting" : ""
                  }`}
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting
                      ? button.disabledBg
                      : gradient.buttonPrimary,
                    color: button.primaryText,
                    boxShadow: isSubmitting ? "none" : shadow.button,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background =
                        gradient.buttonPrimaryHover;
                      e.currentTarget.style.boxShadow = shadow.buttonHover;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = gradient.buttonPrimary;
                      e.currentTarget.style.boxShadow = shadow.button;
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                  onFocus={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${primary.blueFocus}`;
                    }
                  }}
                  onBlur={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.boxShadow = shadow.button;
                    }
                  }}
                >
                  {isSubmitting
                    ? "რეგისტრაცია მიმდინარეობს..."
                    : "მომხმარებლის რეგისტრაცია"}
                </button>
              </div>

              {submitMessage && (
                <div
                  className="submit-message"
                  style={{
                    background: submitMessage.includes("წარმატებით")
                      ? status.successBg
                      : status.errorBg,
                    color: submitMessage.includes("წარმატებით")
                      ? status.successDark
                      : status.errorDark,
                    border: `1px solid ${
                      submitMessage.includes("წარმატებით")
                        ? status.successBorder
                        : status.errorBorder
                    }`,
                  }}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
