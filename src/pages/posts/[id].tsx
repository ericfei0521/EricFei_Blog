import React from 'react';
import { GetServerSideProps } from 'next';
import { firestore } from '../../lib/firebase';
import parse from 'html-react-parser';
interface Iprops {
    data: any;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.query.id;
    const res = await firestore.collection('Posts').doc(id).get();
    const data = await res.data();
    return { props: { data } };
};

export default function PostDetail({ data }: Iprops) {
    const text = parse(String(data.Content));
    return (
        <div>
            <h2>{data.Title}</h2>
            {text}
        </div>
    );
}
