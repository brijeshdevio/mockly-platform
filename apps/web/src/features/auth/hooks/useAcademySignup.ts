import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { authService } from "../auth.service";
import {
  AcademySignupSchema,
  type AcademySignup,
} from "../schemas/academySignup.schema";

const useAcademySignup = () => {
  return useMutation({
    mutationKey: ["academy", "signup"],
    mutationFn: authService.academySignup,
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useAcademySignupFacade = () => {
  const { mutate, isPending, isSuccess } = useAcademySignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AcademySignup>({
    resolver: zodResolver(AcademySignupSchema),
  });

  return {
    submit: (data: AcademySignup) => mutate(data),
    register,
    handleSubmit,
    errors,
    getValues,
    isPending,
    isSuccess,
  };
};
