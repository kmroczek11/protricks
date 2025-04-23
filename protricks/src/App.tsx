import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { } from "@mui/x-date-pickers/themeAugmentation";
import { CookiesProvider } from 'react-cookie';
import TokensProvider from "./components/auth/providers/TokensProvider";
import AuthProvider from "./components/auth/providers/AuthProvider";
import ClientProvider from "./components/auth/providers/ClientProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      dark: "#d3d3d3",
      contrastText: "#6d67e4",
    },
    secondary: {
      main: "#6d67e4",
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
  fontSize: 50,
  fontWeight: 600,

  [theme.breakpoints.down("sm")]: {
    fontSize: 30,
  },
};

theme.typography.h2 = {
  fontSize: 30,
  fontWeight: 200,

  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <TokensProvider>
            <AuthProvider>
              <ClientProvider>
                {element}
              </ClientProvider>
            </AuthProvider>
          </TokensProvider>
        </CookiesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
