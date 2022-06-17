import React from 'react';
import { Theme, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const ImageBlockRoot = styled('section')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '60vh',
  minHeight: 500,
  maxHeight: 1300,
}));

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

interface ImageBlockProps {
  sxBackground: SxProps<Theme>;
}

const ImageBlock: React.FC<React.HTMLAttributes<HTMLDivElement> & ImageBlockProps> = (props) => {
  const { sxBackground, children } = props;

  return (
    <ImageBlockRoot>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
        <Background sx={sxBackground} />
      </Container>
    </ImageBlockRoot>
  );
}

export default ImageBlock;
