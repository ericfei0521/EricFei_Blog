import style from '../styles/header.module.scss';
import Link from 'next/link';
import Head from 'next/head';
interface Iprops {
    title: string;
}
const Layout = ({ title }: Iprops) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={style.header}>
                <Link href="/">
                    <h1>{title}</h1>
                </Link>
                <nav style={{ display: 'flex' }}>
                    <Link href="/">Home</Link>
                    <Link href="#">Posts</Link>
                    <Link href="#">About</Link>
                    <Link href="#">Contact</Link>
                </nav>
                <div>
                    <Link href="/">IG</Link>
                    <Link href="/">FB</Link>
                    <Link href="/">Git</Link>
                </div>
            </header>
            {/* <main>{child}</main> */}
            <footer> </footer>
        </>
    );
};

export default Layout;
