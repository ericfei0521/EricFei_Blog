import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import style from './headNavbutton.module.scss';
interface Iprop {
    name: string;
    url: string;
}
const HeadNavButton = ({ name, url }: Iprop) => {
    const router = useRouter();
    let currentRouter;
    if(router.route === '/'){
        currentRouter = 'Home'
    }
    if(router.route !== '/'){
       const isCurrent  = router.route.replace('/','') === url
        currentRouter = isCurrent?name:''
    }
    return (
        <div className={currentRouter===name ? style.active : style.inactive}>
            <Link href={url}>
                {name}
            </Link>
            {/* <a onClick={() => router.push(url, 'url', { shallow: false })}>{name}</a> */}
        </div>
    );
};

export default HeadNavButton;
