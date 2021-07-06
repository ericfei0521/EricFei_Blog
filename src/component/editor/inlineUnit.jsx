import { useState } from 'react';
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

const COLOR_TYPES = [
    { label: '#1ff0ff', style: 'lightblue' },
    { label: 'rgba(255, 0, 0, 1.0)', style: 'red' },
    { label: 'rgba(255, 127, 0, 1.0)', style: 'orange' },
    { label: '#fffc47', style: 'yellow' },
    { label: 'rgba(0, 180, 0, 1.0)', style: 'green' },
    { label: '#5ba7ff', style: 'blue' },
    { label: 'rgba(75, 0, 130, 1.0)', style: 'indigo' },
    { label: '#ff00d4', style: 'violet' },
];

export const colorStyleMap = {
    lightblue: {
        color: '#1ff0ff',
    },
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: '#fffc47',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: '#5ba7ff',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: '#ff00d4',
    },
};
const ColorButtonWrapper = styled.div`
    color: ${(props) => (props.isOpen ? '#9999ff' : 'gray')};
    position: relative;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;

    .color-wrap {
        position: absolute;
        width: 50px;
        padding: 5px;
        display: flex;
        transform: translateY(10px) scaleY(0);
        justify-content: space-around;
        flex-wrap: wrap;
        background-color: #6d6d6d;
        box-shadow: 0 0 20px black;
        transition: all 0.1s;
        transform-origin: top;
    }
    .show {
        transform: translateY(10px) scaleY(1);
    }
`;
const ColorButton = styled.div`
    width: 1rem;
    height: 1rem;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => (props.isActive ? 'white' : 'transparent')};
    .color-button {
        width: 0.8rem;
        height: 0.8rem;
        background-color: ${(props) => props.colorType};
    }
`;
export const ColorStyleControls = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentStyle = props.editorState.getCurrentInlineStyle();
    const onToggle = (e, type) => {
        e.preventDefault();
        props.onToggle(type.style);
    };
    const toggleOpen = (e) => {
        if (e.target.id !== 'colorButtonWrapper') {
            return;
        }
        setIsOpen(!isOpen);
    };
    return (
        <ColorButtonWrapper isOpen={isOpen} onClick={toggleOpen} id="colorButtonWrapper">
            Color
            <div className={`color-wrap ${isOpen ? 'show' : ''}`}>
                {COLOR_TYPES.map((type) => (
                    <ColorButton
                        onMouseDown={(e) => onToggle(e, type)}
                        key={type.label}
                        colorType={type.label}
                        isActive={currentStyle.has(type.style)}
                    >
                        <div className="color-button"></div>
                    </ColorButton>
                ))}
            </div>
        </ColorButtonWrapper>
    );
};
