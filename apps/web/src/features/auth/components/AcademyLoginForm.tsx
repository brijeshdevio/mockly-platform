import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAcademyLoginFacade } from "../hooks/useAcademyLogin";

export function AcademyLoginForm() {
  const { handleSubmit, submit, register, errors, isPending } =
    useAcademyLoginFacade();

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4">
      {/* Phone */}
      <Field>
        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter 10-digit phone number"
          {...register("phone")}
        />
        {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
      </Field>

      {/* Password */}
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          {...register("password")}
        />
        {errors.password && <FieldError>{errors.password.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
