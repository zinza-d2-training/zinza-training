import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import GenerateIcon from 'src/assets/svg/svgexport-24.svg';
import ReGenerateIcon from 'src/assets/svg/svgexport-18.svg';
import ProtectIcon from 'src/assets/svg/svgexport-20.svg';
import ArchiveIcon from 'src/assets/svg/svgexport-6.svg';
import ExportIcon from 'src/assets/svg/svgexport-17.svg';
import { HomeToolItem, HomeToolItemProps } from './HomeToolItem';

const tools: HomeToolItemProps[] = [
  {
    title: 'Create repository',
    description:
      'Create a repository from a template you want, include issues, milestones, projects, labels',
    icon: GenerateIcon
  },
  {
    title: 'Regenerate repository',
    description: 'Repair a damaged repository and recover issues, milestones, projects, labels',
    icon: ReGenerateIcon
  },
  {
    title: 'Protect repository',
    description: 'Protect repository with a security workflow to prevent unauthorized access.',
    icon: ProtectIcon
  },
  {
    title: 'Archive repository',
    description: 'Archive repository to prevent editing',
    icon: ArchiveIcon
  },
  {
    title: 'Export repository',
    description:
      'Pull data straight from repositories into Excel spreadsheets in a few short seconds for reporting.',
    icon: ExportIcon
  }
];

export const HomeTools = () => {
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      width={1}
      pb={7}
      px={8}
      sx={{
        background: 'rgb(243, 240, 236)'
      }}>
      <Box width={1} sx={{ background: 'white' }} mt={-10}>
        <Grid container>
          {tools.map((tool) => (
            <Grid item lg={2} md={3} sm={4} xs={12} key={tool.title}>
              <HomeToolItem {...tool} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
