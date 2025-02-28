import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StepIndicator from "./StepIndicator";

const Layout = () => {
  const location = useLocation();

  // Map routes to step numbers
  const getStepFromPath = (path: string): number => {
    const routes: Record<string, number> = {
      "/personal-info": 1,
      "/contact-details": 2,
      "/loan-request": 3,
      "/financial-info": 4,
      "/finalization": 5,
      "/success": 6,
    };
    return routes[path] || 1;
  };

  const currentStepNumber = getStepFromPath(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Loan Application
        </h1>

        {location.pathname !== "/success" && (
          <StepIndicator currentStep={currentStepNumber} />
        )}

        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
