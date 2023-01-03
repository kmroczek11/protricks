import React from "react";
import Container from "@mui/material/Container";
import { ColorButton, CustomList } from "../../lib";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CustomExercisesList from "./CustomExercisesList";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { exercisesPlanMessages, choosingGroupMessages } from '../../../translations/pl/infoMessages'
import Box from "@mui/material/Box";

const About: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ pt: 15 }}>
      <Container
        sx={{
          pb: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ColorButton
          color="secondary"
          variant="contained"
          sx={{ width: 250, height: 50, fontSize: 20 }}
          onClick={() => navigate("/zajecia/zarejestruj")}
        >
          Zapisz się
        </ColorButton>
      </Container>
      <Typography variant="h1" align="center" textTransform="uppercase">
        Jak wyglądają nasze zajęcia?
      </Typography>
      <Typography
        variant="h2"
        align="center"
        px={smScreen ? undefined : 10}
        py={3}
        textTransform="uppercase"
      >
        Na zajęciach stawiamy na bezpieczeństwo uczestników, rozwijanie u nich
        pasji, budowaniu relacji oraz kształtowaniu zdrowych nawyków ruchowych.
      </Typography>
      <Container>
        <CustomExercisesList
          title="Nasze zajęcia składają się z 3 głównych części"
          items={exercisesPlanMessages}
          variant="primary"
          size="lg"
          center
        />
      </Container>
      <Box sx={{
        backgroundColor: "secondary.main",
        py: 10,
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <CustomList
          title="Jak wybrać odpowiednią grupę?"
          items={choosingGroupMessages}
          headColor="primary.main"
          contentColor="primary.main"
          sxBackground={{ backgroundColor: 'secondary.main' }}
          size="lg"
          center
        />
        <ColorButton
          color="primary"
          variant="contained"
          sx={{ width: 250, height: 50, fontSize: 20 }}
          onClick={() => navigate("/zajecia/zarejestruj")}
        >
          Zapisz się
        </ColorButton>
      </Box>
    </Box>
  );
};

export default About;
