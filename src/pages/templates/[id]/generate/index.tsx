import { Button, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import CreateNewImg from 'src/assets/templates/generate/create-new.webp';
import ExistedImg from 'src/assets/templates/generate/existed.webp';
import Image from 'next/image';
import { grey } from '@mui/material/colors';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { TemplateGenerateDialogProps } from 'src/components/repositories/templates/generate/TemplateGenerateDialog';
import { AppLayout } from 'src/components/layouts/AppLayout';

const TemplateCreateDialog = dynamic<TemplateGenerateDialogProps>(() =>
  import('src/components/repositories/templates/generate/TemplateGenerateDialog').then(
    (comp) => comp.TemplateCreateDialog
  )
);

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
    <AppLayout>
      <Stack
        direction="column"
        width={1}
        alignItems="center"
        mt={{
          xs: '100px',
          sm: '150px'
        }}
        spacing={{
          sm: 10
        }}>
        <Typography>Chọn cách bạn muốn áp dụng template:</Typography>
        <Grid container>
          <Grid item sm={5} xs={12}>
            <Stack
              sx={(theme) => ({
                alignItems: 'center',
                [theme.breakpoints.up('sm')]: {
                  alignItems: 'flex-end'
                }
              })}>
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
            </Stack>
          </Grid>
          <Grid item sm={2} xs={12}>
            <Stack height={1} justifyContent="center">
              <Divider orientation="vertical" flexItem sx={{ height: 1 }}>
                Hoặc
              </Divider>
            </Stack>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Stack
              sx={(theme) => ({
                alignItems: 'center',
                [theme.breakpoints.up('sm')]: {
                  alignItems: 'flex-start'
                }
              })}>
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
                    Hãy để trình tạo logo hỗ trợ AI của chúng tôi đọc và đồng bộ những phần còn
                    thiếu so với template.
                  </Typography>
                </Stack>
                <DarkenButton sx={{ borderRadius: '100px' }} variant="contained" size="large">
                  Đồng bộ repository
                </DarkenButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        {generating && (
          <TemplateCreateDialog
            open={true}
            onClose={() => setGenerating(false)}
            repositoryName={String(router.query.id)}
          />
        )}
      </Stack>
    </AppLayout>
  );
};

export default TemplateGeneratePage;
