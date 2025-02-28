import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { FormProvider } from "./context/FormContext";
import Layout from "./components/Layout";
import PersonalInfo from "./components/steps/PersonalInfo";
import ContactDetails from "./components/steps/ContactDetails";
import LoanRequest from "./components/steps/LoanRequest";

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/personal-info" replace />} />
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="contact-details" element={<ContactDetails />} />
          <Route path="loan-request" element={<LoanRequest />} />
          <Route path="financial-info" element={<></>} />
          <Route path="finalization" element={<></>} />
          <Route path="success" element={<></>} />
        </Route>
      </Routes>
      <Toaster />
    </FormProvider>
  );
}

export default App;
