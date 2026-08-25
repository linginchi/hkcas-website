import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PayCancelPage } from "./pages/PayCancelPage";
import { PayRedirectPage } from "./pages/PayRedirectPage";
import { PaySuccessPage } from "./pages/PaySuccessPage";
import { StaffPayPage } from "./pages/StaffPayPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff/pay" element={<StaffPayPage />} />
        <Route path="/pay/success" element={<PaySuccessPage />} />
        <Route path="/pay/cancel" element={<PayCancelPage />} />
        <Route path="/pay/:id" element={<PayRedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
