import { Link, LinkProps } from '@mui/material';
import NextLink from 'next/link';

interface Props extends Omit<LinkProps, 'component'> {
  href: string;
  content: string;
  active?: boolean;
}

export const PrimaryMenuItem = ({ content, href, active, ...props }: Props) => {
  return (
    <NextLink href={href} passHref>
      <Link
        textTransform="uppercase"
        underline="none"
        fontWeight="500"
        display="flex"
        sx={{
          color: active ? 'red' : '#000000',
          alignItems: 'center',
          justifyContent: 'center',
          height: 1,
          px: 2,
          cursor: 'pointer',
          '&:hover': {
            color: 'red'
          }
        }}
        {...props}>
        {content}
      </Link>
    </NextLink>
  );
};
