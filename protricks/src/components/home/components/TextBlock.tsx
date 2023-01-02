import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";

interface TextBlockProps {
  texts: {
    title: string;
    content: string;
  };
  variant: string;
  align?: "right" | "left" | "inherit" | "center" | "justify" | undefined;
}

const TextBlock: React.FC<TextBlockProps> = (props) => {
  const { texts, variant, align } = props;
  const { title, content } = texts;

  return (
    <Container>
      <Typography
        variant="h1"
        color={`${variant}.contrastText`}
        align={align}
        sx={{ p: 2 }}
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        color={`${variant}.contrastText`}
        align={align}
        whiteSpace="pre-line"
        gutterBottom
      >
        {content}
      </Typography>
    </Container>
  );
};

export default TextBlock;
