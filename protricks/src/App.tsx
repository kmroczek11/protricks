import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./components/auth";

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
        <AuthProvider>{element}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
