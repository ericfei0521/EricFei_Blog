import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { firestore } from '../../lib/firebase';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MyEditor = ({ id, content }) => {
    const contentState = convertFromRaw(content);
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
    const onChangeState = () => {
        const data = convertToRaw(editorState.getCurrentContent());
        firestore.collection('Posts').doc(id).update({
            content: data,
        });
    };
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                readOnly={true}
                toolbarHidden={true}
                toolbar={{
                    link: { showOpenOptionOnHover: false },
                }}
            />
            <button onClick={onChangeState}>kkk</button>
        </div>
    );
};
export default MyEditor;
