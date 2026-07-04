import {
  Home,
  Presentation,
  Box,
  BarChart3,
  Users,
  Images,
  ClipboardList,
  Search,
  Plus,
} from "lucide-react";
import { RobotIcon } from "../components/ds/RobotIcon.jsx";

// Primary nav — reflects the prototype's pages, icons matched to the design.
export const primaryNav = [
  { label: "Portal", to: "/", icon: Home, ready: true },
  { label: "Showroom", to: "/showroom", icon: Presentation, ready: true },
  { label: "Reorder", to: "/reorder", icon: Box, ready: true },
  { label: "Insights", to: "/insights", icon: BarChart3 },
  { label: "Customers", to: "/customers", icon: Users, ready: true },
  { label: "Content", to: "/content", icon: Images },
  { label: "Orders", to: "/orders", icon: ClipboardList, ready: true },
];

export const utilityNav = [{ label: "Search", to: "/search", icon: Search }];

// Ask AI toggles the assistant drawer rather than navigating.
export const askAi = { label: "Ask AI", icon: RobotIcon };
export const createAction = {
  label: "Create",
  icon: Plus,
  items: ["New Presentation", "New Order", "New Selection"],
};
