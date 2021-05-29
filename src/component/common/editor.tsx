import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';
import { firestore } from '../../lib/firebase';

interface Iprops {
    id: string;
    content: any;
}

const MyEditor = ({ id, content }: Iprops) => {
    const contentState = convertFromRaw(content);
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
    const _handleInlineStyle = (inlineStyle: string): void => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
    const _handleKeyCommand = (command: any, editorState: any) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const onChangeState = () => {
        const data = convertToRaw(editorState.getCurrentContent());
        firestore.collection('Posts').doc(id).update({
            content: data,
        });
    };
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={(): void => _handleInlineStyle('BOLD')}>
                <img src="/images/icons/bold.svg" alt="Bold-icon" />
            </button>
            <button onClick={(): void => _handleInlineStyle('ITALIC')}>ITALIC</button>
            <button onClick={(): void => _handleInlineStyle('CODE')}>CODE</button>
            <button onClick={(): void => _handleInlineStyle('UNDERLINE')}>UNDERLINE</button>
            <Editor
                textAlignment="left"
                placeholder="Enter something here"
                handleKeyCommand={_handleKeyCommand}
                editorState={editorState}
                onChange={setEditorState}
            />
            <button onClick={onChangeState}>kkk</button>
        </div>
    );
};
export default MyEditor;
