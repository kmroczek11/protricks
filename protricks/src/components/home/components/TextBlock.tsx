import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

interface TextBlockProps {
    texts: {
        title: string;
        content: string;
    },
    variant: string
}

const TextBlock: React.FC<TextBlockProps> = (props) => {
    const { texts, variant } = props;
    const { title, content } = texts;

    return (
        <Container>
            <Typography
                variant="h1"
                color={`${variant}.contrastText`}
                align="center"
                sx={{ p: 2 }}
                gutterBottom
            >
                {title}
            </Typography>
            <Typography
                variant="h2"
                color={`${variant}.contrastText`}
                align="center"
                whiteSpace="pre-line"
                gutterBottom
            >
                {content}
            </Typography>
        </Container>
    );
}

export default TextBlock;