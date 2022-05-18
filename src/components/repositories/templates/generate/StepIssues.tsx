import { Button, Stack, styled, Typography } from '@mui/material';
import { SelectIssues } from 'src/components/repositories/templates/generate/SelectIssues';
import { Controller, useFormContext } from 'react-hook-form';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import { grey } from '@mui/material/colors';
import LoadingButton from '@mui/lab/LoadingButton';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import { DarkenButton } from 'src/pages/templates/[id]/generate';

export const DarkenLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.common.black),
  backgroundColor: theme.palette.common.black,
  '&:hover': {
    backgroundColor: grey[800]
  }
}));

export interface StepOnBoardingProps {
  onNext?: () => void;
  onPrevious?: () => void;
  repositoryName: string;
  issues: RestEndpointMethodTypes['issues']['listForRepo']['response']['data'];
  creating: boolean;
  creatingProcess: string[];
  created: boolean;
  reCreate: () => void;
}

export const StepIssues = ({
  onPrevious,
  repositoryName,
  issues,
  creating,
  creatingProcess,
  created,
  reCreate
}: StepOnBoardingProps) => {
  const {
    control,
    formState: { isValid }
  } = useFormContext();

  return (
    <Stack width={1} direction="column" spacing={5} alignItems="flex-start">
      <Typography variant="h5">Chọn các issues:</Typography>
      <Controller
        name="issueIds"
        control={control}
        render={({ field: { ref, ...methods } }) => <SelectIssues {...methods} issues={issues} />}
      />
      <Stack direction="column">
        {creatingProcess.map((text) => (
          <Typography key={text}>{text}</Typography>
        ))}
      </Stack>
      <Stack direction="row" spacing={3}>
        <Button
          disabled={creating || !isValid}
          variant="contained"
          size="large"
          color="secondary"
          sx={{ borderRadius: '100px' }}
          onClick={onPrevious}>
          Quay lại
        </Button>
        {created && (
          <DarkenButton
            onClick={reCreate}
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: '100px' }}>
            Create another
          </DarkenButton>
        )}
        {!created && (
          <DarkenLoadingButton
            disabled={!isValid}
            loading={creating}
            loadingPosition="end"
            endIcon={<BackupRoundedIcon />}
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: '100px' }}>
            Submit
          </DarkenLoadingButton>
        )}
      </Stack>
    </Stack>
  );
};
