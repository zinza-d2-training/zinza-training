import { IconButton, Stack, Typography } from '@mui/material';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import { DarkenButton } from 'src/pages/templates/[id]/generate';
import { TemplateCreateStep } from 'src/components/repositories/templates/generate/TemplateGenerateDialog';

export interface StepOnBoardingProps {
  currentStep: TemplateCreateStep;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const StepOnBoarding = ({ currentStep, onNext, onPrevious }: StepOnBoardingProps) => {
  return (
    <Stack width={1} direction="column" spacing={3} alignItems="flex-start">
      <Typography sx={{ typography: { sm: 'h4', xs: 'h5' } }}>
        Hãy để Trình Tạo Repository AI của chúng tôi tạo ra phép màu
      </Typography>
      <Typography>Chỉ với 3 bước đơn giản để tạo 1 repository từ template:</Typography>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton sx={{ backgroundColor: '#dde1e6' }} aria-label="Name">
            <DriveFileRenameOutlineRoundedIcon htmlColor="#9da3a9" />
          </IconButton>
          <Typography>
            Chọn 1 cái tên đẹp (
            <Typography component="span" variant="body2" fontStyle="italic">
              nana-react
            </Typography>
            )
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton sx={{ backgroundColor: '#dde1e6' }} aria-label="Issues">
            <BugReportRoundedIcon htmlColor="#9da3a9" />
          </IconButton>
          <Typography>Chọn các issues sẽ khởi tạo</Typography>
        </Stack>
      </Stack>
      <DarkenButton
        variant="contained"
        size="large"
        sx={{ borderRadius: '100px' }}
        onClick={onNext}>
        Tiếp tục
      </DarkenButton>
    </Stack>
  );
};
