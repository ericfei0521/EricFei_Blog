import Link from 'next/link';
import { GetStaticProps } from 'next';
import { firestore } from '../lib/firebase';
interface Iprops {
    data: any[];
}
interface LooseObject {
    [key: string]: any;
}
const Work = ({ data }: Iprops) => {
    console.log(data);
    return (
        <div>
            {data.map((item) => {
                console.log(item.image);
                return (
                    <Link href="/posts/[uid]" as={`/posts/${item.id}`}>
                        <div
                            style={{
                                width: '80%',
                                height: '120px',
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {item.Title}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await firestore.collection('Posts').get();
    const idArray = res.docs.map((doc) => doc.id);
    const data: LooseObject = res.docs.map((doc) => doc.data());
    for (let i = 0; i < idArray.length; i++) {
        data[i].id = idArray[i];
    }
    return { props: { data }, revalidate: 1 };
};
export default Work;
