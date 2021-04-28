import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './headNavbutton.module.scss';
interface Iprop {
    name: string;
    url: string;
}
const HeadNavButton = ({ name, url }: Iprop) => {
    const router = useRouter();
    const currentRouter = router.route === url;
    return (
        <div className={currentRouter ? style.active : style.unactive}>
            <Link href={url} as={name}>
                {name}
            </Link>
            {/* <a onClick={() => router.push(url, 'url', { shallow: false })}>{name}</a> */}
        </div>
    );
};

export default HeadNavButton;
