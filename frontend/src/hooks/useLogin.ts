import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
import useAuthContext from "./useAuthContext";
import { LoginData, loginSchema } from "../types/auth";
import { isAxiosError } from "axios";

const useLogin = () => {
  const { setToken } = useAuthContext();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const loginHandler = async (formData: LoginData) => {
    setError("");
    setSuccess("");
    try {
      const { token } = await authService.login(formData);
      setToken(token);
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error ?? error.message);
      }
    }
  };

  return {
    onSubmit: handleSubmit(loginHandler),
    register,
    formErrors,
    success,
    error,
  };
};

export default useLogin;
