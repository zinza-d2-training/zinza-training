import { Button, Divider, Stack, styled, Typography } from '@mui/material';
import CreateNewImg from 'src/assets/templates/generate/create-new.webp';
import ExistedImg from 'src/assets/templates/generate/existed.webp';
import Image from 'next/image';
import { grey } from '@mui/material/colors';
import { TemplateCreateDialog } from 'src/components/repositories/templates/generate/TemplateGenerateDialog';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const DarkenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.common.black),
  backgroundColor: theme.palette.common.black,
  '&:hover': {
    backgroundColor: grey[800]
  }
}));

const TemplateGeneratePage = () => {
  const [generating, setGenerating] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Stack direction="column" width={1} alignItems="center" mt="150px" spacing={10}>
      <Typography>Chọn cách bạn muốn áp dụng template:</Typography>
      <Stack direction="row" spacing={10}>
        <Stack direction="column" alignItems="center" spacing={4} maxWidth="380px" my={5}>
          <Image src={CreateNewImg} alt="create new" width={240} height={154} />
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" gutterBottom>
              Tạo repository mới
            </Typography>
            <Typography align="center">
              Hãy cho chúng tôi biết về tên repository của bạn và tạo sau vài giây.
            </Typography>
          </Stack>
          <DarkenButton
            sx={{ borderRadius: '100px' }}
            variant="contained"
            size="large"
            onClick={() => setGenerating(true)}>
            Tạo repository
          </DarkenButton>
        </Stack>
        <Stack alignItems="stretch">
          <Divider orientation="vertical" flexItem sx={{ height: 1 }}>
            Hoặc
          </Divider>
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          spacing={4}
          maxWidth="380px"
          sx={{ marginTop: '40px!important', marginBottom: '40px!important' }}>
          <Image src={ExistedImg} alt="existing repository" width={240} height={154} />
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" gutterBottom>
              Đồng bộ với repository có sẵn
            </Typography>
            <Typography align="center">
              Hãy để trình tạo logo hỗ trợ AI của chúng tôi đọc và đồng bộ những phần còn thiếu so
              với template.
            </Typography>
          </Stack>
          <DarkenButton sx={{ borderRadius: '100px' }} variant="contained" size="large">
            Đồng bộ repository
          </DarkenButton>
        </Stack>
      </Stack>
      {generating && (
        <TemplateCreateDialog
          open={true}
          onClose={() => setGenerating(false)}
          repositoryName={String(router.query.id)}
        />
      )}
    </Stack>
  );
};

export default TemplateGeneratePage;
