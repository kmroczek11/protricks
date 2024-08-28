import React from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import MultistepForm from "../home/components/registration/MultistepForm";

const Exercises: React.FC = () => {
  return (
    <React.Fragment>
      <Hero />
      <About />
    </React.Fragment>
  );
};

export default Exercises;
