import React from "react";
import Container from "@mui/material/Container";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";
import Looks6OutlinedIcon from "@mui/icons-material/Looks6Outlined";
import { CustomList, ColorButton } from "../../lib";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useNavigate } from "react-router-dom";

const txt = [
  {
    name: "Na zajęciach stawiamy na bezpieczeństwo uczestników.",
    ElementIcon: LooksOneOutlinedIcon,
  },
  {
    name: `Pierwsza z nich to rozgrzewka.
        Naszych podopiecznych od samego początku uczymy jak
        ważna ona jest do podniesienia efektywności treningowej
        i uniknięcia kontuzji.`,
    ElementIcon: LooksTwoOutlinedIcon,
  },
  {
    name: `Każda nasza rozgrzewka oparta jest o protokół R.A.M.P.
        Dlatego jest tak bardzo skuteczna.`,
    ElementIcon: Looks3OutlinedIcon,
  },
  {
    name: `Drugi element zajęć to część akrobatyczna, czyli to co
        wszyscy lubimy najbardziej. Tutaj uczymy się wszystkich
        salt, przerzutów, kształtujemy koordynację ruchową,
        zwinność oraz walczymy z strachem, oczywiście w
        kontrolowanych warunkach.`,
    ElementIcon: Looks4OutlinedIcon,
  },
  {
    name: `Kolejna część treningu to krótkie wzmacnianie połączone
        z zabawą. Chcemy, żeby nasi podopieczni byli jak najbardziej
        sprawni oraz odporni na wszelkie kontuzję, stąd regularnie
        na każdym treningu dbamy tak o ich bezpieczeństwo.`,
    ElementIcon: Looks5OutlinedIcon,
  },
  {
    name: `Ostatnią już część ale nie mniej ważną jest rozciąganie.
        Pomimo, że nie długie, to nie zawsze każdy je lubi ale w ten
        sposób rozwijamy u podopiecznych samodyscyplinę.
        Pokazujemy, że czasami trzeba się trochę poświecić, żeby
        dojść do swojego celu. Ten element treningu jest również
        bardzo ważny w uniknięciu kontuzji. Odpowiedni zakres
        ruchu także ułatwia naukę elementów akrobatycznych oraz
        może poprawić te które już potrafimy.`,
    ElementIcon: Looks6OutlinedIcon,
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
      <CustomList
        title="JAK WYGLĄDAJĄ NASZE ZAJĘCIA?"
        items={txt}
        variant="primary"
        size="lg"
        center
      />
    </Container>
  );
};

export default About;
