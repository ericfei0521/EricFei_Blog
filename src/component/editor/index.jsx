import React, { useState } from 'react';
import Image from 'next/image';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils, Modifier } from 'draft-js';
import { firestore } from '../../lib/firebase';
import CodeUtils from 'draft-js-code';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PrismDecorator from 'draft-js-prism';
import { BlockStyleControls } from './editorUnits';

const MyEditor = ({ className, id, content }) => {
    const contentState = convertFromRaw(content);
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
    const onChange = (newState) => {
        const decorator = new PrismDecorator({
            prism: Prism,
            defaultSyntax: 'javascript',
        });
        setEditorState(EditorState.set(newState, { decorator }));
    };

    const _handleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const _handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const _toggleBlockType = (blockStyle) => {
        let state = editorState;
        if (blockStyle === 'code-block' && CodeUtils.hasSelectionInBlock(editorState)) {
            const content = state.getCurrentContent();
            const selection = state.getSelection();
            const split = Modifier.splitBlock(content, selection);
            state = EditorState.push(state, split, 'split-block');
        }
        onChange(RichUtils.toggleBlockType(editorState, blockStyle));
    };

    const onChangeState = () => {
        const data = convertToRaw(editorState.getCurrentContent());
        firestore.collection('Posts').doc(id).update({
            content: data,
        });
    };

    const _getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            case 'code-block':
                return 'language-';

            default:
                return null;
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }} className={className}>
            <button onClick={() => _handleInlineStyle('BOLD')}>
                <Image src="/images/icons/bold.svg" alt="Bold-icon" height={15} width={15} />
            </button>
            <button onClick={() => _handleInlineStyle('ITALIC')}>
                <Image src="/images/icons/italic.svg" alt="italic-icon" height={15} width={15} />
            </button>
            <button onClick={() => _handleInlineStyle('UNDERLINE')}>
                <Image src="/images/icons/underline.svg" alt="underline-icon" height={15} width={15} />
            </button>
            <BlockStyleControls editorState={editorState} onToggle={_toggleBlockType} />
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

MyEditor.propTypes = {
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
};

export default styled(MyEditor)`
    .public-DraftStyleDefault-pre {
        font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
        font-size: 12px;
        padding: 0.5em 10px;
    }
    blockquote {
        border-left: 5px solid #5a5a5a;
        margin: 1.5em 10px;
        padding: 0.5em 10px;
        font-size: 1.2em;
        position: relative;
    }
    blockquote p {
        display: inline;
    }
`;
