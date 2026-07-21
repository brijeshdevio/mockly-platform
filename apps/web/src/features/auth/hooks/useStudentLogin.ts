import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { authService } from "../auth.service";
import {
  StudentLoginSchema,
  type StudentLogin,
} from "../schemas/studentLogin.schema";

const useStudentLogin = () => {
  return useMutation({
    mutationKey: ["student", "login"],
    mutationFn: authService.studentLogin,
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useStudentLoginFacade = () => {
  const { mutate, isPending, isSuccess } = useStudentLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<StudentLogin>({
    resolver: zodResolver(StudentLoginSchema),
  });

  return {
    submit: (data: StudentLogin) => mutate(data),
    register,
    handleSubmit,
    errors,
    getValues,
    isPending,
    isSuccess,
  };
};
