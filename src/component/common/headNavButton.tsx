import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './headNavbutton.module.scss';
interface Iprop {
    name: string;
    url: string;
}
const HeadNavButton = ({ name, url }: Iprop) => {
    const router = useRouter();
    let currentRouter;
    if(router.route === '/'){
        currentRouter = 'Home';
    }
    if(router.route!== '/'){
        currentRouter = name;
    }
    return (
        <div className={currentRouter===url ? style.active : style.inactive}>
            <Link href={url} as={name}>
                {name}
            </Link>
        </div>
    );
};

export default HeadNavButton;
