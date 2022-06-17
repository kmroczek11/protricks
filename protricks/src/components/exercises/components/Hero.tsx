import React from 'react';
import Typography from '@mui/material/Typography';
import { ImageBlock } from '../../lib';
const imgUrl = '/static/images/exercises/hero.jpeg';

const Hero: React.FC = () => {
    return (
        <ImageBlock
                sxBackground={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundColor: 'primary',
                    backgroundPosition: 'center',
                }}
            >
            <Typography variant="h1" color="primary" gutterBottom>
                Zajęcia
            </Typography>
        </ImageBlock>
    );
}

export default Hero;