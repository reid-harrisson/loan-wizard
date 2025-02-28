import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "../../context/FormContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const FinalizationSchema = z.object({
  confirmed: z.boolean().refine((val) => val === true, {
    message: "You must confirm the information is correct",
  }),
});

type FinalizationFormValues = z.infer<typeof FinalizationSchema>;

const Finalization = () => {
  const { formData, updateFormData, isLoading, getAge, backForm } =
    useFormContext();

  const form = useForm<FinalizationFormValues>({
    resolver: zodResolver(FinalizationSchema),
    defaultValues: {
      confirmed: formData.confirmed,
    },
  });

  const onSubmit = async (data: FinalizationFormValues) => {
    await updateFormData(data);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review Your Application</h2>
        <p className="text-gray-500">
          Please review all information before finalizing
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">First Name</p>
                <p>{formData.firstName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Name</p>
                <p>{formData.lastName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p>{formatDate(formData.dateOfBirth)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p>
                  {formData.dateOfBirth
                    ? `${getAge(formData.dateOfBirth)} years`
                    : "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{formData.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{formData.phone || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p>€{formData.loanAmount || " Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Upfront Payment</p>
                <p>€{formData.upfrontPayment || " Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Term</p>
                <p>{formData.terms} months</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Net Loan</p>
                <p>
                  €
                  {formData.loanAmount - formData.upfrontPayment ||
                    " Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Financial Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Salary</p>
                <p>€{formData.monthlySalary || " Not provided"}</p>
              </div>
              {formData.hasAdditionalIncome && (
                <div>
                  <p className="text-sm text-gray-500">Additional Income</p>
                  <p>€{formData.additionalIncome || " Not provided"}</p>
                </div>
              )}
              {formData.hasMortgage && (
                <div>
                  <p className="text-sm text-gray-500">Mortgage</p>
                  <p>€{formData.mortgage || " Not provided"}</p>
                </div>
              )}
              {formData.hasOtherCredits && (
                <div>
                  <p className="text-sm text-gray-500">Other Credits</p>
                  <p>€{formData.otherCredits || " Not provided"}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Total Monthly Income</p>
                <p>
                  €
                  {formData.monthlySalary +
                    (formData.hasAdditionalIncome
                      ? formData.additionalIncome
                      : 0) || " Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Monthly Expenses</p>
                <p>
                  €
                  {(formData.hasMortgage ? formData.mortgage : 0) +
                    (formData.hasOtherCredits ? formData.otherCredits : 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="confirmed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I confirm that all the information provided is correct and
                    complete
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormMessage />

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={backForm}>
              Back
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Finalizing..." : "Finalize Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Finalization;
