import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useMemo } from 'react';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import { uniq } from 'lodash';

export interface SelectIssuesProps {
  value: number[];
  onChange: (value: number[]) => void;
  issues: RestEndpointMethodTypes['issues']['listForRepo']['response']['data'];
}

export const SelectIssues = ({ value, onChange, issues }: SelectIssuesProps) => {
  const selectedIds = useMemo<number[]>(() => {
    return value.filter((id) => issues.some((issue) => issue.id === id));
  }, [issues, value]);

  return (
    <Stack direction="column">
      {issues.map((issue) => (
        <FormControlLabel
          checked={selectedIds.includes(issue.id)}
          onChange={(event, checked) => {
            if (checked) {
              onChange(uniq(selectedIds.concat(issue.id)));
            } else {
              onChange(selectedIds.filter((selectedId) => selectedId !== issue.id));
            }
          }}
          key={issue.id}
          control={<Checkbox />}
          label={issue.title}
        />
      ))}
    </Stack>
  );
};
