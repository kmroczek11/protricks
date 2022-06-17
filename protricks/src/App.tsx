import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import jwt from "jwt-decode";
import User from "./context/models/user";
import { AuthProvider } from "./context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      dark: "#d3d3d3",
      contrastText: "#000",
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 12,
  },
});

theme.typography.h1 = {
  fontSize: "1.8rem",
  fontWeight: 600,

  [theme.breakpoints.up("sm")]: {
    fontSize: "2.1rem",
  },

  [theme.breakpoints.up("md")]: {
    fontSize: "3.6rem",
  },
};

theme.typography.h2 = {
  fontSize: "1.4rem",
  fontWeight: 200,

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.7rem",
  },

  [theme.breakpoints.up("md")]: {
    fontSize: "2.8rem",
  },
};

const queryClient = new QueryClient();

interface UserResponse {
  user: User;
  exp: number;
  iat: number;
}

const App: React.FC = () => {
  const element = useRoutes(routes);

  const token = localStorage.getItem("token")!;
  const user: User | null = token ? (jwt(token) as UserResponse).user : null;

  return (
    <AuthProvider userData={user}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {element}
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
