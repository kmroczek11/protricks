import React from "react";
import Container from "@mui/material/Container";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import { ColorButton } from "../../lib";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CustomExercisesList from "./CustomExercisesList";

const txt = [
  {
    title: "Rozgrzewka",
    text: `Podopiecznych od początku uczymy,
    Jak ważna ona jest do podniesienia efektywności
    Treningowej i uniknięcia kontuzji.
    Każda nasza rozgrzewka oparta jest o protokół R.A.M.P.
    Dlatego jest tak bardzo skuteczna.`,
    titleColor: "error.main",
    ElementIcon: LooksOneOutlinedIcon,
  },
  {
    title: "Część akrobatyczna",
    text: `Czyli to, co wszyscy lubimy najbardziej.
    Tutaj uczymy się wszystkich salt, przerzutów,
    Kształtujemy koordynację ruchową,
    Zwinność oraz walczymy ze strachem, oczywiście w
    Kontrolowanych warunkach.`,
    titleColor: "#424242",
    ElementIcon: LooksTwoOutlinedIcon,
  },
  {
    title: "Rozciąganie/Wzmacnianie/Zabawa",
    text: `Na samym końcu jednostki treningowej, w
    Zależności od decyzji trenera oraz poziomu
    Zaawansowania grupy, robimy krótkie wzmacnianie,
    Poprawiające siłę i szybkość, rozciąganie, które dba
    O odpowiednie zakresy ruchu lub zabawę ruchową,
    Która udoskonala koordynację, poprawia zwinność,
    A zarazem przynosi mnóstwo frajdy.`,
    titleColor: "#01579b",
    ElementIcon: Looks3OutlinedIcon,
  },
];

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth={false} sx={{ py: 15 }}>
      <Container
        maxWidth={false}
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
          startIcon={<KeyboardDoubleArrowDownIcon />}
          endIcon={<KeyboardDoubleArrowDownIcon />}
          onClick={() => navigate("/zajecia#zarejestruj")}
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
        px={10}
        py={3}
        textTransform="uppercase"
      >
        Na zajęciach stawiamy na bezpieczeństwo uczestników, rozwijanie u nich
        pasji, budowaniu relacji oraz kształtowaniu zdrowych nawyków ruchowych.
      </Typography>
      <Container>
        <CustomExercisesList
          title="Nasze zajęcia składają się z 3 głównych części"
          items={txt}
          variant="primary"
          size="lg"
          center
        />
      </Container>
    </Container>
  );
};

export default About;
