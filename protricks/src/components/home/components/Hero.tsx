import React from 'react';
import Typography from '@mui/material/Typography';
import { ColorButton, VideoBlock } from '../../lib'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const videoUrl = '/static/videos/home.mp4'

const Hero: React.FC = () => {
    return (
        <VideoBlock url={videoUrl}>
            <Typography variant="h1" color="primary" gutterBottom>
                Rozwijamy sporty akrobatyczne w Polsce
            </Typography>
            <ColorButton
                color="primary"
                variant="outlined"
                sx={{ width: 300, height: 50, borderWidth: 2, fontSize: 20 }}
                endIcon={<ArrowRightIcon />}
            >
                Dołącz do nas
            </ColorButton>
        </VideoBlock>
    );
}

export default Hero;