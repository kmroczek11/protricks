import React from "react";
import Hero from "./components/Hero";
import TextBlock from "./components/TextBlock";
import IconCards from "./components/IconCards";
import GroupsIcon from "@mui/icons-material/Groups";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PreviewIcon from "@mui/icons-material/Preview";
import CheckIcon from "@mui/icons-material/Check";
import Container from "@mui/material/Container";
import { CustomList, PhotoCards } from "../lib";
import Box from "@mui/material/Box";

const txt1 = {
  title: "Czym jest akrobatyka?",
  content: `Akrobatyka to ewolucje cielesne
    o dużym stopniu trudności,
    wykraczające poza przeciętne ludzkie umiejętności`,
};

const data1 = [
  {
    id: 1,
    imgSrc: "/static/images/home/cards/1.png",
  },
  { id: 2, imgSrc: "/static/images/home/cards/2.png" },
  { id: 3, imgSrc: "/static/images/home/cards/3.png" },
];

const txt2 = {
  title: `Wierzymy, że jest ona wyjątkowym sportem
    kształtującym nie tylko ciało ale i umysł, pozwala
    przełamywać granice, pokonywać strach a to
    kształtuje charakter, nie tylko w sporcie ale i w życiu.`,
  content: `Naszą misją jest pokazanie piękna akrobatyki
    i zainspirowanie nią jak największego grona osób w Polsce.`,
};

const data2 = [
  {
    Icon: GroupsIcon,
    name: "Zajęcia",
    content: "Zapraszamy do zapisania się na zajęcia.",
    path: "/zajecia",
  },
  {
    Icon: EventAvailableIcon,
    name: "Zloty",
    content: "Sprawdź najbliższe zloty w Twojej okolicy.",
    path: "/zloty",
  },
  {
    Icon: PreviewIcon,
    name: "Pokazy",
    content: "Organizujemy pokazy akrobatyczne.",
    path: "/pokazy",
  },
];

const txt3 = [
  {
    name: "Prowadzimy zajęcia z akrobatyki dla dzieci i młodzieży",
  },
  { name: "Organizujemy ogólnopolskie zloty akrobatyczne " },
  { name: "Występujemy w pokazach, na scenie i na ulicy" },
];

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Hero />
      <Container sx={{ backgroundColor: "primary", py: 15 }}>
        <TextBlock texts={txt1} variant="primary" />
      </Container>
      <Box sx={{ backgroundColor: "secondary.main", py: 10 }}>
        <Container>
          <PhotoCards
            items={data1}
            sxRoot={{
              position: "relative",
              top: "-120px",
              filter: "grayscale(80%)",
            }}
          />
        </Container>
        <TextBlock texts={txt2} variant="secondary" />
      </Box>
      <Container sx={{ backgroundColor: "primary", py: 15 }}>
        <IconCards data={data2} />
      </Container>
      <Container
        maxWidth={false}
        sx={{
          backgroundImage: "linear-gradient(#434343 0%, black 100%)",
          py: 15,
        }}
      >
        <Container>
          <CustomList
            title="CO ROBIMY?"
            items={txt3}
            variant="secondary"
            sxBackground={{
              background: "transparent",
            }}
            ListIcon={CheckIcon}
            size="lg"
            center
          />
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Home;
