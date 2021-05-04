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
                console.log(item.id);
                return (
                    <div>
                        <h1>{item.Title}</h1>
                        <Link href="/posts/[uid]" as={`/posts/${item.id}`}>
                            {item.Title}
                        </Link>
                    </div>
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
