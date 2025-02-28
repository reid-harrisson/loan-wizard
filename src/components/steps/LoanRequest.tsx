import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "../../context/FormContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

const LoanRequestSchema = z
  .object({
    loanAmount: z
      .number()
      .min(10000, "Loan amount must be at least 10,000")
      .max(70000, "Loan amount cannot exceed 70,000"),
    upfrontPayment: z.number().min(0, "Upfront payment cannot be negative"),
    terms: z
      .number()
      .min(10, "Term must be at least 10 months")
      .max(30, "Term cannot exceed 30 months"),
  })
  .refine((data) => data.upfrontPayment < data.loanAmount, {
    message: "Upfront payment must be less than the loan amount",
    path: ["upfrontPayment"],
  });

type LoanRequestFormValues = z.infer<typeof LoanRequestSchema>;

const LoanRequest = () => {
  const { formData, updateFormData, isLoading, getAge, backForm } =
    useFormContext();

  const form = useForm<LoanRequestFormValues>({
    resolver: zodResolver(LoanRequestSchema),
    defaultValues: {
      loanAmount: formData.loanAmount,
      upfrontPayment: formData.upfrontPayment,
      terms: formData.terms,
    },
  });

  // Add custom validation for terms based on age
  const validateTerms = (terms: number) => {
    if (!formData.dateOfBirth) return true;

    const age = getAge(formData.dateOfBirth);
    return terms / 12 + age < 80;
  };

  const onSubmit = async (data: LoanRequestFormValues) => {
    if (!validateTerms(data.terms)) {
      form.setError("terms", {
        type: "manual",
        message:
          "Term is too long based on your age (terms / 12 + age must be less than 80)",
      });
      return;
    }

    await updateFormData(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Loan Request</h2>
        <p className="text-gray-500">Tell us about the loan you need</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount (€10,000 - €70,000)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={10000}
                      max={70000}
                      step={1000}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <Input
                      type="number"
                      min={10000}
                      max={70000}
                      step={1000}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="upfrontPayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upfront Payment</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={form.getValues("loanAmount") - 1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term (Months)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={10}
                      max={30}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <Input
                      type="number"
                      min={10}
                      max={30}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={backForm}>
              Back
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoanRequest;
