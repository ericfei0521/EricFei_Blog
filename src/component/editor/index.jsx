import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Draft, { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils, Modifier } from 'draft-js';
import { firestore } from '../../lib/firebase';
import CodeUtils from 'draft-js-code';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PrismDecorator from 'draft-js-prism';
import { BlockStyleControls, ColorStyleControls, colorStyleMap } from './inlineUnit';
import { ImageUploader, mediaBlockRenderer } from './imageUploader';

const MyEditor = ({ className, id, content }) => {
    const contentState = convertFromRaw(content);
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
    useEffect(() => {
        const decorator = new PrismDecorator({
            prism: Prism,
            defaultSyntax: 'javascript',
        });
        setEditorState(EditorState.set(editorState, { decorator }));
    }, []);
    const _onChange = (newState) => {
        const decorator = new PrismDecorator({
            prism: Prism,
            defaultSyntax: 'javascript',
        });
        setEditorState(EditorState.set(newState, { decorator }));
    };

    const _handleKeyCommand = (command, editorState) => {
        let newState;
        if (CodeUtils.hasSelectionInBlock(editorState)) {
            newState = CodeUtils.handleKeyCommand(editorState, command);
        }
        if (!newState) {
            newState = RichUtils.handleKeyCommand(editorState, command);
        }
        if (newState) {
            _onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const _handleInlineStyle = (inlineStyle) => {
        _onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
    const _handleInlineColor = (toggledcolor) => {
        const selection = editorState.getSelection();
        const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
            return Modifier.removeInlineStyle(contentState, selection, color);
        }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
        const currentStyle = editorState.getCurrentInlineStyle();
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }
        if (!currentStyle.has(toggledcolor)) {
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledcolor);
        }
        _onChange(nextEditorState);
    };
    const _toggleBlockType = (blockType) => {
        let state = editorState;
        if (blockType === 'code-block' && CodeUtils.hasSelectionInBlock(editorState)) {
            const content = state.getCurrentContent();
            const selection = state.getSelection();
            const split = Modifier.splitBlock(content, selection);
            state = EditorState.push(state, split, 'split-block');
        }
        _onChange(Draft.RichUtils.toggleBlockType(state, blockType));
    };

    const _clearCodeBlockStyle = () => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const key = selection.getStartKey();
        const block = contentState.getBlockForKey(key);
        const styles = block.getType();
        const isCodeBlockStyle = styles === 'code-block';
        if (isCodeBlockStyle) {
            _toggleBlockType('code-block');
        } else {
            return;
        }
    };
    const _mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            _onChange(CodeUtils.onTab(e, editorState));
            return;
        }

        if (e.keyCode === 13 && !e.shiftKey) {
            if (CodeUtils.hasSelectionInBlock(editorState)) {
                _onChange(CodeUtils.handleReturn(e, editorState));
                return;
            }
        }
        if (e.shiftKey && e.keyCode === 13) {
            if (CodeUtils.hasSelectionInBlock(editorState)) {
                _clearCodeBlockStyle();
                return;
            }
        }
        if (CodeUtils.hasSelectionInBlock(editorState)) {
            const command = CodeUtils.getKeyBinding(e);
            if (command) return command;
        }
        return Draft.getDefaultKeyBinding(e);
    };

    const _handlePastedText = (replaceText) => {
        if (CodeUtils.hasSelectionInBlock(editorState)) {
            const newContent = Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                replaceText,
            );
            _onChange(EditorState.push(editorState, newContent, 'insert-characters'));
            return true;
        }
        return false;
    };

    const _onChangeState = () => {
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
        <div style={{ maxWidth: '1000px', margin: '70px auto 0 auto' }} className={className}>
            <div className="toolbar">
                <div className="button-list">
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
                    <ImageUploader editorState={editorState} addImage={_onChange} />
                    <ColorStyleControls editorState={editorState} onToggle={_handleInlineColor} />
                </div>
                <div>
                    <button onClick={_onChangeState}>Save</button>
                    <button onClick={_onChangeState}>Submit</button>
                </div>
            </div>
            <label htmlFor="articleTitle">Title: </label>
            <input type="text" name="articleTitle" placeholder="please input title" />
            <Editor
                placeholder="Start writing ...."
                handlePastedText={_handlePastedText}
                editorState={editorState}
                onFocus={() => {
                    console.log(123);
                }}
                onChange={_onChange}
                handleKeyCommand={_handleKeyCommand}
                keyBindingFn={_mapKeyToEditorCommand}
                blockStyleFn={_getBlockStyle}
                blockRendererFn={(block) => mediaBlockRenderer(block)}
                customStyleMap={colorStyleMap}
            />
        </div>
    );
};

MyEditor.propTypes = {
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
};

export default styled(MyEditor)`
    .toolbar {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: #333333;
        z-index: 900;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        .button-list {
            grid-column-start: 2;
            max-width: 1000px;
            padding: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        }
    }
    .public-DraftStyleDefault-pre {
        font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
        font-size: 16px;
        padding: 0.5em 10px;
    }
    figure {
        display: flex;
        justify-content: center;
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
