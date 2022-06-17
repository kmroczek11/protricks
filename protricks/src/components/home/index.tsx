import React from "react";
import Hero from "./components/Hero";
import TextBlock from "./components/TextBlock";
import IconCards from "./components/IconCards";
import GroupsIcon from "@mui/icons-material/Groups";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PreviewIcon from "@mui/icons-material/Preview";
import Container from "@mui/material/Container";
import { ImageBlock, PhotoCards } from "../lib";
import Box from "@mui/material/Box";
const imgUrl = "/static/images/home/team.png";

const txt1 = {
  title: "Czym jest akrobatyka?",
  content: `Akrobatyka to ewolucje cielesne
    o dużym stopniu trudności,
    wykraczające poza przeciętne ludzkie umiejętności`,
};

const data1 = [
  { id: 1, name: "Freerunning", imgSrc: "/static/images/home/cards/1.jpg" },
  { id: 2, name: "Tumbling", imgSrc: "/static/images/home/cards/1.jpg" },
  { id: 3, name: "Tricking", imgSrc: "/static/images/home/cards/1.jpg" },
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

const txt3 = {
  title: `Co robimy?`,
  content: `Prowadzimy zajęcia dla dzieci i młodzieży z akrobatyki
    Organizujemy ogólnopolskie zloty akrobatyczne
    Występujemy w pokazach, na scenie i na ulicy.`,
};

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
            sxRoot={{ position: "relative", top: "-100px" }}
          />
        </Container>
        <TextBlock texts={txt2} variant="secondary" />
      </Box>
      <Container sx={{ backgroundColor: "primary", py: 15 }}>
        <IconCards data={data2} />
      </Container>
      <ImageBlock
        sxBackground={{
          backgroundImage: `linear-gradient(90deg, #000 45%,rgba(6,6,7,0) 75%),url(${imgUrl})`,
          backgroundColor: "primary",
          backgroundPosition: "center",
        }}
      >
        <TextBlock texts={txt3} variant="secondary" />
      </ImageBlock>
    </React.Fragment>
  );
};

export default Home;
