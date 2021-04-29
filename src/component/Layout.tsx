import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import style from '../../styles/header.module.scss';
import HeadNavButton from '../component/common/headNavButton';
import React, { memo } from 'react';
interface Iprops {
    title: string;
    children: any;
}
const Layout = ({ children, title }: Iprops) => {
    console.log('aa');
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={style.header}>
                <Link href="/">
                    <h1>{title}</h1>
                </Link>
                <nav className={style.nav}>
                    <HeadNavButton name="Home" url="/" />
                    <HeadNavButton name="Posts" url="post" />
                    <HeadNavButton name="About" url="about" />
                    <HeadNavButton name="Works" url="work" />
                </nav>
                <div className={style.nav}>
                    <a href="https://www.instagram.com/eric_fei_01/">
                        {/* <Image priority src="/images/instagram.svg" height={16} width={16} /> */}
                        <img src="/images/instagram.svg" height={16} width={16} />
                    </a>
                    <a href="https://www.facebook.com/fei.eric.3/">
                        <Image priority src="/images/facebook.svg" height={16} width={16} />
                    </a>
                    <a href="https://github.com/ericfei0521">
                        <Image priority src="/images/github.svg" height={16} width={16} />
                    </a>
                </div>
            </header>
            <main>{children}</main>
            <footer> </footer>
        </>
    );
};

export default memo(Layout);
