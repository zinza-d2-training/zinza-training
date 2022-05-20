import { Dialog, DialogContent, DialogProps, IconButton, Stack } from '@mui/material';
import Image from 'next/image';
import BackgroundImage from 'src/assets/templates/generate/create-dialog-img.webp';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, FormProvider } from 'react-hook-form';
import { StepOnBoarding } from 'src/components/repositories/templates/generate/StepOnBoarding';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StepNaming } from 'src/components/repositories/templates/generate/StepNaming';
import { StepIssues } from 'src/components/repositories/templates/generate/StepIssues';
import { TemplateCreateFormData } from 'src/components/repositories/templates/generate/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import { useAppSelector } from 'src/store';
import { sortBy } from 'lodash';

export enum TemplateCreateStep {
  OnBoarding = 'OnBoarding',
  Naming = 'Naming',
  Issues = 'Issues'
}

export interface TemplateGenerateDialogProps extends DialogProps {
  onClose?: () => void;
  repositoryName: string;
}

export const TemplateCreateDialog = ({
  onClose,
  repositoryName,
  ...props
}: TemplateGenerateDialogProps) => {
  const [currentStep, setCurrentStep] = useState<TemplateCreateStep>(TemplateCreateStep.OnBoarding);
  const [issues, setIssues] = useState<
    RestEndpointMethodTypes['issues']['listForRepo']['response']['data']
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [created, setCreated] = useState<boolean>(false);
  const githubClient = useAppSelector((store) => store.github.githubClient);

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return false;
    }
    onClose && onClose();
  };

  const methods = useForm<TemplateCreateFormData>({
    mode: 'onChange',
    resolver: yupResolver(
      yup
        .object({
          repositoryName: yup.string().required(),
          issueIds: yup.array(yup.number().required()).required()
        })
        .required()
    ),
    defaultValues: {
      repositoryName: '',
      issueIds: []
    }
  });

  const fetchIssues = useCallback(async () => {
    if (githubClient) {
      setLoading(true);
      const _issues = await githubClient.rest.issues.listForRepo({
        owner: process.env.NEXT_PUBLIC_ORG ?? '',
        repo: repositoryName
      });
      setIssues(sortBy(_issues.data, 'id'));
      setLoading(false);
    }
  }, [githubClient, repositoryName]);
  useEffect(() => {
    fetchIssues().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [creating, setCreating] = useState<boolean>(false);
  const [creatingProcess, setCreatingProcess] = useState<string[]>([]);

  const onSubmit = async ({ issueIds, repositoryName }: TemplateCreateFormData) => {
    if (githubClient && !created) {
      const _issues = issues.filter((issue) => issueIds.includes(issue.id));
      setCreating(true);
      await githubClient.rest.repos.createInOrg({
        org: process.env.NEXT_PUBLIC_ORG ?? '',
        name: repositoryName
      });
      setCreatingProcess((state) => [...state, `Created repository ${repositoryName}`]);
      for (const issue of _issues) {
        await githubClient.rest.issues.create({
          owner: process.env.NEXT_PUBLIC_ORG ?? '',
          repo: repositoryName,
          title: issue.title,
          body: issue.body ?? undefined
        });
        setCreatingProcess((state) => [...state, `Created issue ${issue.title}`]);
      }
      setCreating(false);
      setCreated(true);
    }
  };

  useEffect(() => {
    if (currentStep === TemplateCreateStep.OnBoarding) {
      methods.setValue(
        'issueIds',
        issues.map((issue) => issue.id)
      );
    }
  }, [currentStep, issues, methods]);

  const renderedStep = useMemo(() => {
    switch (currentStep) {
      case TemplateCreateStep.OnBoarding:
        return (
          <StepOnBoarding
            currentStep={currentStep}
            onNext={() => setCurrentStep(TemplateCreateStep.Naming)}
          />
        );
      case TemplateCreateStep.Naming:
        return (
          <StepNaming
            currentStep={currentStep}
            onNext={() => setCurrentStep(TemplateCreateStep.Issues)}
            onPrevious={() => setCurrentStep(TemplateCreateStep.OnBoarding)}
          />
        );
      case TemplateCreateStep.Issues:
        return (
          <StepIssues
            issues={issues}
            repositoryName={repositoryName}
            onPrevious={() => setCurrentStep(TemplateCreateStep.Naming)}
            creating={creating}
            creatingProcess={creatingProcess}
            created={created}
            reCreate={() => {
              setCreated(false);
              setCurrentStep(TemplateCreateStep.OnBoarding);
              setCreatingProcess([]);
              methods.reset();
              methods.setValue(
                'issueIds',
                issues.map((issue) => issue.id)
              );
            }}
          />
        );
      default:
        return null;
    }
  }, [created, creating, creatingProcess, currentStep, issues, methods, repositoryName]);

  return (
    <Dialog
      disableEscapeKeyDown
      {...props}
      onClose={handleClose}
      PaperProps={{ sx: { height: '80vh', borderRadius: '20px' } }}
      maxWidth="lg"
      fullWidth>
      <DialogContent sx={{ padding: 0 }}>
        <Stack direction="row" height={1}>
          <Image src={BackgroundImage} alt="" height="100%" width={482} objectFit="cover" />
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            flex={1}
            position="relative">
            <Box position="absolute" top={12} right={12} onClick={onClose}>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box width={482}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>{renderedStep}</form>
              </FormProvider>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};