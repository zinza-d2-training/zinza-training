import '../../styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { theme } from 'src/theme/theme';
import { createEmotionCache } from 'src/utils/createEmotionCache';
import { AppLayout } from '../components/layouts/AppLayout';
import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { GithubProvider } from 'src/components/auth/github/GithubProvider';
import { ErrorBoundary } from 'src/components/layouts/ErrorBoundary';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

export default function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <GithubProvider>
              <CacheProvider value={emotionCache}>
                <Head>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
              </CacheProvider>
            </GithubProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
