import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { FormProvider } from "./context/FormContext";
import Layout from "./components/Layout";
import PersonalInfo from "./components/steps/PersonalInfo";
import ContactDetails from "./components/steps/ContactDetails";
import LoanRequest from "./components/steps/LoanRequest";
import FinancialInfo from "./components/steps/FinancialInfo";
import Finalization from "./components/steps/Finalization";
import Success from "./components/Success";

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/personal-info" replace />} />
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="contact-details" element={<ContactDetails />} />
          <Route path="loan-request" element={<LoanRequest />} />
          <Route path="financial-info" element={<FinancialInfo />} />
          <Route path="finalization" element={<Finalization />} />
          <Route path="success" element={<Success />} />
        </Route>
      </Routes>
      <Toaster />
    </FormProvider>
  );
}

export default App;
