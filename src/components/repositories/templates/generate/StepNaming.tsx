import { Button, Stack, TextField, Typography } from '@mui/material';
import { TemplateCreateStep } from 'src/components/repositories/templates/generate/TemplateGenerateDialog';
import { Controller, useFormContext } from 'react-hook-form';
import { DarkenButton } from 'src/pages/templates/[id]/generate';

export interface StepOnBoardingProps {
  currentStep: TemplateCreateStep;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const StepNaming = ({ currentStep, onNext, onPrevious }: StepOnBoardingProps) => {
  const {
    control,
    formState: { isValid }
  } = useFormContext();

  return (
    <Stack width={1} direction="column" spacing={5} alignItems="flex-start">
      <Typography variant="h5">Chọn tên repository:</Typography>
      <Controller
        name="repositoryName"
        control={control}
        render={({ field }) => <TextField fullWidth variant="outlined" size="medium" {...field} />}
      />
      <Stack direction={{ sm: 'row', xs: 'column-reverse' }} spacing={3} width={1}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ borderRadius: '100px' }}
          onClick={onPrevious}>
          Quay lại
        </Button>
        <DarkenButton
          disabled={!isValid}
          variant="contained"
          size="large"
          sx={{ borderRadius: '100px' }}
          onClick={onNext}>
          Tiếp tục
        </DarkenButton>
      </Stack>
    </Stack>
  );
};
