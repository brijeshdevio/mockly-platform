import { apiClient } from "@/lib/apiClient";
import type { AcademyLogin } from "./schemas/academyLogin.schema";
import type { AcademySignup } from "./schemas/academySignup.schema";
import type { StudentLogin } from "./schemas/studentLogin.schema";

export const authService = {
  academyLogin: (data: AcademyLogin) =>
    apiClient.post("/academy/login", data).then((r) => r.data),
  academySignup: (data: AcademySignup) =>
    apiClient.post("/academy/signup", data).then((r) => r.data),
  studentLogin: (data: StudentLogin): Promise<{ message: string }> =>
    apiClient.post("/student/login", data).then((r) => r.data),
};
