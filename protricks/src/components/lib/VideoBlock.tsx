import React from 'react';
import { Theme, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const VideoBlockRoot = styled('section')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '60vh',
  minHeight: 500,
  maxHeight: 1300,
}));

const Background = styled('video')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  filter: 'grayscale(80%)',
  objectFit: 'cover',
});

interface VideoBlockProps {
  url: string;
  sxBackground?: SxProps<Theme>;
}

const VideoBlock: React.FC<React.HTMLAttributes<HTMLDivElement> & VideoBlockProps> = (props) => {
  const { sxBackground, url, children } = props;

  return (
    <VideoBlockRoot>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1
        }}
      >
        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
      </Container>
      <Background
        sx={sxBackground}
        muted
        autoPlay
        loop
      >
        <source src={url} type="video/mp4" />
        Twoja przeglądarka nie wspiera filmów.
      </Background>
    </VideoBlockRoot>
  );
}

export default VideoBlock;
