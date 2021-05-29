import { AppProps } from 'next/app';
import GlobalStyle from '../../styles/GlobalStyle';
import Layout from '../component/Layout';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <Layout title="TechPit">
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
