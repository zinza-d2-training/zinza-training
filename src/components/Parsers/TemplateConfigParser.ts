import { object, string, number, date, InferType, array, boolean, mixed } from 'yup';

export enum RepositoryTemplateConfigVersion {
  V1 = 1,
  V2 = 2
}

export enum RepositoryTemplateConfigLanguage {
  React = 'react',
  Vue = 'vue',
  Angular = 'angular'
}

export enum RepositoryTemplateConfigCloneableFeatures {
  Issues = 'issues',
  Milestones = 'milestones',
  Tags = 'tags'
}

export interface RepositoryTemplateConfig {
  name: string;
  description?: string;
  lang: RepositoryTemplateConfigLanguage;
  wbsLink?: string;
  issuesOrder: number[];
  cloneableFeatures: RepositoryTemplateConfigCloneableFeatures[];
  cloneable?: boolean;
  version: RepositoryTemplateConfigVersion;
}

export interface RepositoryTemplateConfigV1 extends RepositoryTemplateConfig {
  version: RepositoryTemplateConfigVersion.V1;
}

const repositoryTemplateConfigSchema = object({
  name: string().required(),
  description: string(),
  lang: mixed<RepositoryTemplateConfigLanguage>()
    .oneOf(Object.values(RepositoryTemplateConfigLanguage))
    .required(),
  wbsLink: string(),
  issuesOrder: array().of(number().required()).required(),
  cloneableFeatures: array()
    .of(
      mixed<RepositoryTemplateConfigCloneableFeatures>()
        .oneOf(Object.values(RepositoryTemplateConfigCloneableFeatures))
        .required()
    )
    .required(),
  cloneable: boolean().required(),
  version: number().oneOf(Object.values(RepositoryTemplateConfigVersion).map(Number)).required()
});

export interface RepositoryTemplateConfigV2 extends RepositoryTemplateConfig {
  version: RepositoryTemplateConfigVersion.V2;
}

export const validateRepositoryTemplateConfig = (
  data: Record<string, any>
): RepositoryTemplateConfig | false => {
  try {
    return repositoryTemplateConfigSchema.validateSync(data);
  } catch (e) {
    return false;
  }
};
