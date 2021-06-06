import React from 'react';
import styled from 'styled-components';
const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'Quote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: '</>', style: 'code-block' },
];

export const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    console.log(blockType);

    const onToggle = (e, type) => {
        e.preventDefault();
        props.onToggle(type.style);
    };

    const Button = styled.button`
        color: ${(props) => (props.isActive ? '#9999ff' : 'gray')};
        font-size: 1rem;
        background-color: transparent;
        border: none;
        font-weight: bold;
    `;
    return (
        <>
            {BLOCK_TYPES.map((type) => (
                <Button onMouseDown={(e) => onToggle(e, type)} key={type.label} isActive={blockType === type.style}>
                    {type.label}
                </Button>
            ))}
        </>
    );
};

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

export const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    const onToggle = (e, type) => {
        e.preventDefault();
        props.onToggle(type.style);
    };
    return (
        <div>
            {INLINE_STYLES.map((type) => (
                <button onMouseDown={(e) => onToggle(e, type)} active={currentStyle.has(type.style)} key={type.label}>
                    {type.label}
                </button>
            ))}
        </div>
    );
};
