import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import userService from "../services/user-service";
import useAuthContext from "./useAuthContext";
import { useState } from "react";
import { profileSchema } from "../types/auth";

type ProfileFormValues = z.infer<typeof profileSchema>;

const useProfile = () => {
  const { user, logout, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (profileData: ProfileFormValues) => {
    setMessage("");
    setError("");
    if (!user) return;

    const updateUser = async () => {
      try {
        const { data, message } = await userService.update({
          id: user.id,
          ...profileData,
        });
        setIsLoading(true);
        setMessage(message);
        setUser({ ...user, ...data });
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error.response?.data.message || error.message);
          if (error.response?.status === 401) {
            logout();
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    updateUser();
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    formErrors,
    message,
    error,
    user,
  };
};

export default useProfile;
