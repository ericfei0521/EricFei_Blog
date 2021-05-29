import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
interface Iprop {
    name: string;
    url: string;
}
const HeadNavButton = ({ name, url }: Iprop) => {
    const router = useRouter();
    const currentRouter = router.route === url;

    return (
        <div className={currentRouter ? 'active' : 'inactive'}>
            <Link href={url}>{name}</Link>
        </div>
    );
};

export default styled(HeadNavButton)`
    .inactive {
        a {
            color: black;
        }
    }
    .active {
        a {
            color: brown;
        }
    }
`;
