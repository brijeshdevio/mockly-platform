import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAcademySignupFacade } from "../hooks/useAcademySignup";

export function AcademySignupForm() {
  const { handleSubmit, submit, register, errors, isPending } =
    useAcademySignupFacade();

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4">
      {/* Academy Name */}
      <Field>
        <FieldLabel htmlFor="academy-name">Academy Name</FieldLabel>
        <Input
          id="academy-name"
          type="text"
          placeholder="Enter academy name"
          {...register("academyName")}
        />
        {errors.academyName && (
          <FieldError>{errors.academyName.message}</FieldError>
        )}
      </Field>

      {/* Owner Name */}
      <Field>
        <FieldLabel htmlFor="owner-name">Owner Name</FieldLabel>
        <Input
          id="owner-name"
          type="text"
          placeholder="Enter owner name"
          {...register("ownerName")}
        />
        {errors.ownerName && (
          <FieldError>{errors.ownerName.message}</FieldError>
        )}
      </Field>

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
          placeholder="Enter password (min 8 characters)"
          {...register("password")}
        />
        {errors.password && <FieldError>{errors.password.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full">
        {isPending ? "Creating account..." : "Create Academy"}
      </Button>
    </form>
  );
}
