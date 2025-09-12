import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Map,
  Calendar,
  Heart,
  Pill,
  Shield,
  AlertTriangle,
  MessageCircle,
  User,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Map, label: "Find Nurses", path: "/map" },
    { icon: Calendar, label: "Book Service", path: "/booking" }, // ✅ booking route
    { icon: Heart, label: "Health Records", path: "/health-records" },
    { icon: Pill, label: "Medicines", path: "/medicine" },
    { icon: Shield, label: "First Aid Kit", path: "/first-aid" },
    { icon: AlertTriangle, label: "Emergency", path: "/emergency" },
    { icon: MessageCircle, label: "AI Assistant", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg z-40 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
