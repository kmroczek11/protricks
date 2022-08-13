import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RAMPList from "./RAMPList";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";
import Looks6OutlinedIcon from "@mui/icons-material/Looks6Outlined";

const txt = [
  {
    name: "Na zajęciach stawiamy na bezpieczeństwo uczestników.",
    Icon: LooksOneOutlinedIcon,
  },
  {
    name: `Pierwsza z nich to rozgrzewka.
        Naszych podopiecznych od samego początku uczymy jak
        ważna ona jest do podniesienia efektywności treningowej
        i uniknięcia kontuzji.`,
    Icon: LooksTwoOutlinedIcon,
  },
  {
    name: `Każda nasza rozgrzewka oparta jest o protokół R.A.M.P.
        Dlatego jest tak bardzo skuteczna.`,
    Icon: Looks3OutlinedIcon,
  },
  {
    name: `Drugi element zajęć to część akrobatyczna, czyli to co
        wszyscy lubimy najbardziej. Tutaj uczymy się wszystkich
        salt, przerzutów, kształtujemy koordynację ruchową,
        zwinność oraz walczymy z strachem, oczywiście w
        kontrolowanych warunkach.`,
    Icon: Looks4OutlinedIcon,
  },
  {
    name: `Kolejna część treningu to krótkie wzmacnianie połączone
        z zabawą. Chcemy, żeby nasi podopieczni byli jak najbardziej
        sprawni oraz odporni na wszelkie kontuzję, stąd regularnie
        na każdym treningu dbamy tak o ich bezpieczeństwo.`,
    Icon: Looks5OutlinedIcon,
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
    Icon: Looks6OutlinedIcon,
  },
];

const About: React.FC = () => {
  return (
    <Container sx={{ backgroundColor: "primary", px: 0, py: 15 }}>
      <Typography
        variant="h1"
        color={`primary.contrastText`}
        align="center"
        sx={{ p: { xs: 0, md: 2 } }}
        gutterBottom
      >
        Jak wyglądają nasze zajęcia?
      </Typography>
      <RAMPList items={txt} variant="primary" />
    </Container>
  );
};

export default About;
