import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Define the form data structure
export interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: string;

  // Contact Details
  email: string;
  phone: string;

  // Loan Request
  loanAmount: number;
  upfrontPayment: number;
  terms: number;

  // Financial Info
  monthlySalary: number;
  hasAdditionalIncome: boolean;
  additionalIncome: number;
  hasMortgage: boolean;
  mortgage: number;
  hasOtherCredits: boolean;
  otherCredits: number;

  // Finalization
  confirmed: boolean;

  // API data
  uuid?: string;
}

// Initial form data
const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  loanAmount: 10000,
  upfrontPayment: 0,
  terms: 10,
  monthlySalary: 0,
  hasAdditionalIncome: false,
  additionalIncome: 0,
  hasMortgage: false,
  mortgage: 0,
  hasOtherCredits: false,
  otherCredits: 0,
  confirmed: false,
};

// Define the context type
interface FormContextType {
  formData: FormData;
  updateFormData: (step: string, data: Partial<FormData>) => Promise<void>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLoading: boolean;
  getAge: (dateOfBirth: string) => number;
}

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    // Try to load from localStorage on initial render
    const savedData = localStorage.getItem("loanWizardData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("loanWizardData", JSON.stringify(formData));
  }, [formData]);

  // Calculate age from date of birth
  const getAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Update form data and submit to API
  const updateFormData = async (
    step: string,
    data: Partial<FormData>
  ): Promise<void> => {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const updatedData = { ...formData, ...data };

      // If we have a UUID, update the entity, otherwise create a new one
      if (formData.uuid) {
        const response = await fetch(`${baseUrl}/entities/${formData.uuid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Failed to update data");
        }

        const result = await response.json();
        setFormData(result.entity);
      } else {
        const response = await fetch(`${baseUrl}/entities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        const result = await response.json();
        setFormData(result.entity);
      }

      toast({
        title: "Success",
        description: "Your information has been saved",
        variant: "default",
      });

      // Navigate to the next step based on the current step
      const nextRoutes: Record<string, string> = {
        "personal-info": "/contact-details",
        "contact-details": "/loan-request",
        "loan-request": "/financial-info",
        "financial-info": "/finalization",
        finalization: "/success",
      };

      if (nextRoutes[step]) {
        navigate(nextRoutes[step]);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast({
        title: "Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        isLoading,
        getAge,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
