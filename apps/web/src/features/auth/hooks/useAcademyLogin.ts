import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { authService } from "../auth.service";
import {
  AcademyLoginSchema,
  type AcademyLogin,
} from "../schemas/academyLogin.schema";

const useAcademyLogin = () => {
  return useMutation({
    mutationKey: ["academy", "login"],
    mutationFn: authService.academyLogin,
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useAcademyLoginFacade = () => {
  const { mutate, isPending, isSuccess } = useAcademyLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AcademyLogin>({
    resolver: zodResolver(AcademyLoginSchema),
  });

  return {
    submit: (data: AcademyLogin) => mutate(data),
    register,
    handleSubmit,
    errors,
    getValues,
    isPending,
    isSuccess,
  };
};
