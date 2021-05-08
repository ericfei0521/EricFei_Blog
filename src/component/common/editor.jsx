import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { firestore } from '../../lib/firebase';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MyEditor = ({ id, content }) => {
    const contentState = convertFromRaw(content);
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
    const [editor, setEditor] = useState(false);
    useEffect(() => {
        setEditor(true);
    });
    const onChangeState = () => {
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        firestore.collection('Posts').doc(id).update({
            content: data,
        });
    };
    return (
        <>
            {editor ? (
                <div style={{ width: '100%' }}>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={setEditorState}
                        readOnly={true}
                        toolbarHidden={false}
                        toolbar={{
                            link: { showOpenOptionOnHover: false },
                        }}
                    />
                    {/* <button onClick={onChangeState}>kkk</button> */}
                </div>
            ) : null}
        </>
    );
};
export default MyEditor;
