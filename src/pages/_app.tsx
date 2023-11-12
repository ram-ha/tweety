import ErrorFallback from '@/components/errorfallback';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary fallbackRender={(fallbackProps) => <ErrorFallback {...fallbackProps} />}>
            <SWRConfig
                value={{
                    fetcher: (url: string) => fetch(url).then((response) => response.json()),
                    onError: (error: Error) => alert(error),
                }}
            >
                <Component {...pageProps} />
            </SWRConfig>
        </ErrorBoundary>
    );
}
