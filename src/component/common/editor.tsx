import React, { useState } from 'react';
import Image from 'next/image';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';
import { firestore } from '../../lib/firebase';
import styled from 'styled-components';
interface Iprops {
    id: string;
    content: any;
    className?: string;
}

const MyEditor = ({ className, id, content }: Iprops) => {
    const contentState = convertFromRaw(content);
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
    const _handleInlineStyle = (inlineStyle: string): void => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
    const _handleBolckStyle = (blockStyle: string): void => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
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
    const _getBlockStyle = (block: any) => {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            default:
                return null;
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }} className={className}>
            <button onClick={(): void => _handleInlineStyle('BOLD')}>
                <Image src="/images/icons/bold.svg" alt="Bold-icon" height={15} width={15} />
            </button>
            <button onClick={(): void => _handleInlineStyle('ITALIC')}>
                <Image src="/images/icons/italic.svg" alt="italic-icon" height={15} width={15} />
            </button>
            <button onClick={(): void => _handleInlineStyle('UNDERLINE')}>
                <Image src="/images/icons/underline.svg" alt="underline-icon" height={15} width={15} />
            </button>
            <button onClick={(): void => _handleBolckStyle('code-block')}>
                <Image src="/images/icons/coding.svg" alt="underline-icon" height={15} width={15} />
            </button>
            <Editor
                textAlignment="left"
                blockStyleFn={_getBlockStyle}
                placeholder="Start writing ...."
                handleKeyCommand={_handleKeyCommand}
                editorState={editorState}
                onChange={setEditorState}
            />
            <button onClick={onChangeState}>kkk</button>
        </div>
    );
};
export default styled(MyEditor)`
    .public-DraftStyleDefault-pre {
        background-color: rgba(0, 0, 0, 0.05);
        font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
        font-size: 12px;
        padding: 20px;
    }
    pre {
        font-size: 16px;
        padding: 5px;
        white-space: normal;
    }
`;
