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
  description: string;
  lang: RepositoryTemplateConfigLanguage;
  wbsLink: string;
  issuesOrder: number[];
  cloneableFeatures: RepositoryTemplateConfigCloneableFeatures[];
  cloneable?: boolean;
  version: RepositoryTemplateConfigVersion;
}

export interface RepositoryTemplateConfigV1 extends RepositoryTemplateConfig {
  version: RepositoryTemplateConfigVersion.V1;
}

export interface RepositoryTemplateConfigV2 extends RepositoryTemplateConfig {
  version: RepositoryTemplateConfigVersion.V2;
}

export const parseRepositoryTemplateConfig = (binary: string): RepositoryTemplateConfig => {
  try {
    const config = JSON.parse(binary);
    if (Object.values(RepositoryTemplateConfigVersion).includes(config.version)) {
      return config;
    }
    throw new Error('Invalid config version');
  } catch (e) {
    throw e;
  }
};
