import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MyEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [editor, setEditor] = useState(false);
    useEffect(() => {
        setEditor(true);
    });

    return (
        <>
            {editor ? (
                <div>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={setEditorState}
                    />
                    <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
                </div>
            ) : null}
        </>
    );
};
export default MyEditor;
