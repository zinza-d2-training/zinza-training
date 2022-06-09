import type { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import App, { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { theme } from 'src/theme/theme';
import { createEmotionCache } from 'src/utils/createEmotionCache';
import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { GithubProvider } from 'src/components/auth/github/GithubProvider';
import { ErrorBoundary } from 'src/components/layouts/ErrorBoundary';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { setReactQueryLogger } from 'src/libs/react-query';
import { CookieProvider } from 'src/components/cookie/CookieProvider';
import { useState } from 'react';
import * as React from 'react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
  cookie: string;
};

function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, cookie } = props;
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);

  setReactQueryLogger();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <CookieProvider cookie={cookie}>
              <GithubProvider>
                <CacheProvider value={emotionCache}>
                  <Head>
                    <title>Zinza Training</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                  </Head>
                  <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                  </ThemeProvider>
                </CacheProvider>
              </GithubProvider>
            </CookieProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps
  };
};

export default MyApp;
