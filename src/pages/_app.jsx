import '../../styles/all.scss';
import Layout from '../component/Layout';

export default function App({ Component, pageProps }) {
    return (
        <Layout title="TecPit">
            <Component {...pageProps} />
        </Layout>
    );
}
