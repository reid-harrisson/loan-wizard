import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";

const Success = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  const handleStartNew = () => {
    // Clear localStorage
    localStorage.removeItem("loanWizardData");
    // Reload the page to start fresh
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
      <div className="rounded-full bg-green-100 p-3">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold">
        Application Submitted Successfully!
      </h1>

      <p className="text-gray-600 max-w-md">
        Thank you, {formData.firstName}! Your loan application has been
        submitted successfully. We will review your application and get back to
        you soon.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
        <p className="text-sm text-gray-500">Application Reference</p>
        <p className="font-mono text-lg">{formData.uuid || "N/A"}</p>
      </div>

      <div className="flex space-x-4 mt-8">
        <Button variant="outline" onClick={() => navigate("/finalization")}>
          View Application
        </Button>
        <Button onClick={handleStartNew}>Start New Application</Button>
      </div>
    </div>
  );
};

export default Success;
