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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const FinancialInfoSchema = z.object({
  monthlySalary: z.number().min(1, "Monthly salary is required"),
  hasAdditionalIncome: z.boolean(),
  additionalIncome: z.number(),
  hasMortgage: z.boolean(),
  mortgage: z.number(),
  hasOtherCredits: z.boolean(),
  otherCredits: z.number(),
});

type FinancialInfoFormValues = z.infer<typeof FinancialInfoSchema>;

const FinancialInfo = () => {
  const { formData, updateFormData, isLoading, initializeForm, backForm } =
    useFormContext();
  const { toast } = useToast();

  const form = useForm<FinancialInfoFormValues>({
    resolver: zodResolver(FinancialInfoSchema),
    defaultValues: {
      monthlySalary: formData.monthlySalary,
      hasAdditionalIncome: formData.hasAdditionalIncome,
      additionalIncome: formData.additionalIncome,
      hasMortgage: formData.hasMortgage,
      mortgage: formData.mortgage,
      hasOtherCredits: formData.hasOtherCredits,
      otherCredits: formData.otherCredits,
    },
  });

  const validateFinancialCapacity = (data: FinancialInfoFormValues) => {
    const { monthlySalary, additionalIncome, mortgage, otherCredits } = data;
    const { loanAmount, terms } = formData;

    const monthlyIncome =
      monthlySalary + (data.hasAdditionalIncome ? additionalIncome : 0);
    const monthlyExpenses =
      (data.hasMortgage ? mortgage : 0) +
      (data.hasOtherCredits ? otherCredits : 0);
    const availableIncome = monthlyIncome - monthlyExpenses;

    return availableIncome * terms * 0.5 > loanAmount;
  };

  const onSubmit = async (data: FinancialInfoFormValues) => {
    if (!validateFinancialCapacity(data)) {
      toast({
        title: "Financial Capacity Warning",
        description:
          "Your financial capacity may not be sufficient for this loan. Consider reducing the loan amount or starting with a new application.",
        variant: "destructive",
      });
    } else {
      await updateFormData(data);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Information</h2>
        <p className="text-gray-500">Tell us about your financial situation</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="monthlySalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Salary</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="3000"
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
            name="hasAdditionalIncome"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I have additional income</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {form.watch("hasAdditionalIncome") && (
            <FormField
              control={form.control}
              name="additionalIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Income</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="1000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="hasMortgage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I have a mortgage</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {form.watch("hasMortgage") && (
            <FormField
              control={form.control}
              name="mortgage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Mortgage Payment</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="800"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="hasOtherCredits"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I have other credits</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {form.watch("hasOtherCredits") && (
            <FormField
              control={form.control}
              name="otherCredits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Credit Payments</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="500"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={backForm}>
              Back
            </Button>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  initializeForm();
                }}
              >
                Restart
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FinancialInfo;
