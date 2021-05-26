import '../../styles/all.scss';
import Layout from '../component/Layout';

interface AppProps {
    Component: any;
    pageProps: any;
}
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout title="TechPit">
            <Component {...pageProps} />
        </Layout>
    );
}
