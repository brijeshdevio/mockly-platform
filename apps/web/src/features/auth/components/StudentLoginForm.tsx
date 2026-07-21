import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStudentLoginFacade } from "../hooks/useStudentLogin";

export function StudentLoginForm() {
  const { handleSubmit, submit, register, errors, isPending } =
    useStudentLoginFacade();

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4">
      {/* Academy Code */}
      <Field>
        <FieldLabel htmlFor="academy-code">Academy Code</FieldLabel>
        <Input
          id="academy-code"
          type="text"
          placeholder="Enter academy code"
          {...register("academyCode")}
        />
        {errors.academyCode && (
          <FieldError>{errors.academyCode.message}</FieldError>
        )}
      </Field>

      {/* Student Code */}
      <Field>
        <FieldLabel htmlFor="student-code">Student Code</FieldLabel>
        <Input
          id="student-code"
          type="text"
          placeholder="Enter student code"
          {...register("studentCode")}
        />
        {errors.studentCode && (
          <FieldError>{errors.studentCode.message}</FieldError>
        )}
      </Field>

      {/* Phone Number */}
      <Field>
        <FieldLabel htmlFor="phone-number">Phone Number</FieldLabel>
        <Input
          id="phone-number"
          type="tel"
          placeholder="Enter phone number"
          {...register("phone")}
        />
        {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
