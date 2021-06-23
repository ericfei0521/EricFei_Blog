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
const Button = styled.button`
    color: ${(props) => (props.isActive ? '#9999ff' : 'gray')};
    font-size: 1rem;
    background-color: transparent;
    border: none;
    font-weight: bold;
`;

export const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    console.log(blockType);

    const onToggle = (e, type) => {
        e.preventDefault();
        props.onToggle(type.style);
    };

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
