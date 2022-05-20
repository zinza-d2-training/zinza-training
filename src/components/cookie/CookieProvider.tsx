import { FC, useEffect } from 'react';
import { useAppDispatch } from 'src/store';
import { setCookie } from 'src/components/cookie/cookieSlice';

interface Props {
  cookie: string;
}

export const CookieProvider: FC<Props> = ({ cookie, children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCookie(cookie));
  }, [cookie, dispatch]);

  return <>{children}</>;
};
