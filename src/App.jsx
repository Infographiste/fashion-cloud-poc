import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell.jsx";
import Portal from "./pages/Portal.jsx";
import Reorder from "./pages/Reorder.jsx";
import Showroom from "./pages/Showroom.jsx";
import Customers from "./pages/Customers.jsx";
import Orders from "./pages/Orders.jsx";
import Placeholder from "./pages/Placeholder.jsx";

export default function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/reorder" element={<Reorder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/insights" element={<Placeholder title="Insights" />} />
          <Route path="/content" element={<Placeholder title="Content" />} />
          <Route path="/search" element={<Placeholder title="Search" />} />
          <Route path="*" element={<Placeholder title="Not found" />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}
