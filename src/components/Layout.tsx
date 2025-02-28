import { Outlet, useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import { useFormContext } from "../context/FormContext";
import { getPathByStep } from "../lib/utils";
import { useEffect } from "react";
const Layout = () => {
  const { currentStep } = useFormContext();

  const navigate = useNavigate();

  useEffect(() => {
    navigate(getPathByStep(currentStep));
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Loan Application
        </h1>

        {currentStep !== 6 && <StepIndicator currentStep={currentStep} />}

        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
