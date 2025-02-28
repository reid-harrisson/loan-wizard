import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { FormProvider } from "./context/FormContext";
import Layout from "./components/Layout";

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/personal-info" replace />} />
          <Route path="personal-info" element={<></>} />
          <Route path="contact-details" element={<></>} />
          <Route path="loan-request" element={<></>} />
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
