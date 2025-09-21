import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../types/auth";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../services/auth-service";
import { isAxiosError } from "axios";

const useRegister = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const registerHandler = async (formData: RegisterData) => {
    setError("");
    setSuccess("");
    try {
      const { message } = await authService.register(formData);
      setSuccess(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error ?? error.message);
      }
    }
  };

  return {
    onSubmit: handleSubmit(registerHandler),
    register,
    formErrors,
    success,
    error,
  };
};

export default useRegister;
