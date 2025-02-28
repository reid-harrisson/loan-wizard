import { CheckIcon } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Contact Details" },
    { number: 3, title: "Loan Request" },
    { number: 4, title: "Financial Info" },
    { number: 5, title: "Finalization" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.number < currentStep
                  ? "bg-primary text-primary-foreground border-primary"
                  : step.number === currentStep
                  ? "border-primary text-primary"
                  : "border-gray-300 text-gray-300"
              }`}
            >
              {step.number < currentStep ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-xs ${
                step.number <= currentStep ? "text-primary" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center justify-between mt-4">
        <div className="absolute left-0 right-0 h-0.5 bg-gray-200" />
        {steps.map((step) => (
          <div
            key={step.number}
            className={`w-1/5 h-0.5 ${
              step.number <= currentStep ? "bg-primary" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
