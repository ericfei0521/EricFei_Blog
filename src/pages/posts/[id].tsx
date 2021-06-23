import { GetServerSideProps } from 'next';
import { firestore } from '../../lib/firebase';
import MyEditor from '../../component/editor';
interface Iprops {
    content: any;
    id: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.query.id;
    const res = await firestore.collection('Posts').doc(id).get();
    const data = res.data();
    let content = {
        entityMap: {},
        blocks: [],
    };

    if (data?.content) {
        content = data.content;
    }
    return { props: { content, id } };
};

export default function PostDetail({ content, id }: Iprops) {
    return (
        <div style={{ width: '100%' }}>
            <MyEditor className="" id={id} content={content} />
        </div>
    );
}
