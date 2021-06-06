import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
interface Iprop {
    name: string;
    url: string;
    className?: string;
}
const HeadNavButton = ({ className, name, url }: Iprop) => {
    const router = useRouter();
    const currentRouter = router.route === url;

    return (
        <div className={className}>
            <div className={currentRouter ? 'active' : 'inactive'}>
                <Link href={url}>{name}</Link>
            </div>
        </div>
    );
};

export default styled(HeadNavButton)`
    .inactive {
        a {
            color: white;
        }
    }
    .active {
        a {
            color: brown;
        }
    }
`;
