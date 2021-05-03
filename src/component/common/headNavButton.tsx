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
        <div className={currentRouter ? style.active : style.inactive}>
            <Link href={url}>{name}</Link>
        </div>
    );
};

export default HeadNavButton;
