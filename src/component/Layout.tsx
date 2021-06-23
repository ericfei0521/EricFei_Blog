import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import styles from '../../styles/LayoutStyles';
import HeadNavButton from './headNavButton';

import { ReactChild } from 'react';

interface Iprops {
    title: string;
    children: ReactChild;
    className?: string;
}
const Layout = ({ className, children, title }: Iprops) => {
    return (
        <div className={className}>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
            </Head>
            <header>
                <Link href="/">
                    <span className="title">{title}</span>
                </Link>
                <nav>
                    <HeadNavButton name="Home" url="/" />
                    <HeadNavButton name="Posts" url="/posts" />
                    <HeadNavButton name="About" url="/about" />
                    <HeadNavButton name="Works" url="/work" />
                </nav>
                <nav>
                    <a href="https://www.instagram.com/eric_fei_01/" target="_blank">
                        <Image priority src="/images/instagram.svg" height={16} width={16} />
                    </a>
                    <a href="https://www.facebook.com/fei.eric.3/" target="_blank">
                        <Image priority src="/images/facebook.svg" height={16} width={16} />
                    </a>
                    <a href="https://github.com/ericfei0521" target="_blank">
                        <Image priority src="/images/github.svg" height={16} width={16} />
                    </a>
                </nav>
            </header>
            <main className="content">{children}</main>
            <footer>
                <span>© 2021 created by TecPit</span>
            </footer>
        </div>
    );
};

export default styled(Layout)`
    ${styles}
`;
