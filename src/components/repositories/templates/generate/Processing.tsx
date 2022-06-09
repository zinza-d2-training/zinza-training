import { Box, Stack } from '@mui/material';
import { ReactNode, useMemo } from 'react';

type ProcessingContent = NonNullable<ReactNode>[];

export interface ProcessingProps {
  contents: ProcessingContent;
}

export const Processing = ({ contents }: ProcessingProps) => {
  const contentRenderer = useMemo(() => {
    return contents.map((content, index) => (
      <Box
        sx={{
          animation: 'append-animate 0.5s linear',
          display: index === contents.length - 1 ? 'block' : 'none'
        }}
        key={index}>
        {content}
      </Box>
    ));
  }, [contents]);
  return (
    <Stack
      position="fixed"
      width={1}
      height={1}
      top={0}
      left={0}
      zIndex={(theme) => theme.zIndex.modal}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        '@keyframes append-animate': {
          '0%': {
            opacity: 0
          },
          '80%': {
            opacity: 1
          }
        }
      }}
      alignItems="center"
      justifyContent="center">
      <Stack
        width={1}
        height="200px"
        sx={{ backgroundColor: 'white' }}
        alignItems="center"
        justifyContent="center">
        {contentRenderer}
      </Stack>
    </Stack>
  );
};
