import UserContacts from "../pages/UserContacts.jsx";
import Auth from "../pages/Auth.jsx";
import Main from "../pages/Main.jsx";

export const privateRoutes = [
  {
    path: "/contacts",
    Element: UserContacts,
  },
];

export const publicRoutes = [
  {
    path: "/login",
    Element: Auth,
  },
  {
    path: "/registration",
    Element: Auth,
  },
  {
    path: "/",
    Element: Main,
  },
];
