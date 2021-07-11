import { useState, useRef } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import PhotoIcon from '../../../public/images/icons/image.svg';
import styled from 'styled-components';

const ImageWrapper = styled.div`
    justify-self: center;
    display: flex;
    svg {
        width: 1.2rem;
        height: auto;
        fill: ${(props) => (props.isOpen ? '#9999ff' : 'gray')};
    }

    .floatwrapper {
        position: fixed;
        display: grid;
        top: 118px;
        left: 50%;
        transform: translateX(-50%) scaleY(0);
        transform-origin: top;
        transition: all 0.3s;
        width: 500px;
        padding: 8px;
        border-top: 1px solid gray;
        border-radius: 4px;
        row-gap: 8px;
        background-color: #6d6d6d;
        box-shadow: 0 0 20px black;
        .image-select {
            width: 100%;
            box-sizing: border-box;
            padding: 1px;
            text-align: center;
            font-size: 14px;
            background-color: #494949;
            cursor: pointer;
            &:hover {
                background-color: #252525;
            }
        }
        #file-upload {
            display: none;
        }
        input {
            font-size: 1rem;
            padding: 2px;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid#252525;
            color: white;
            &:focus {
                outline: none;
            }
        }
        .image-select,
        button {
            border-radius: 4px;
        }
        .buttons {
            justify-self: end;
            button {
                background-color: transparent;
                width: fit-content;
                color: white;
                border: 1px solid white;
                &:hover {
                    cursor: pointer;
                    background-color: #252525;
                }
                &:first-child {
                    margin-right: 5px;
                }
            }
        }
    }
    .open {
        transform: translateX(-50%) scaleY(1);
    }
`;

export const ImageUploader = ({ editorState, addImage }) => {
    const [imageData, setImageData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const imageUrlInput = useRef(null);
    const _addImage = (src) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        addImage(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    };
    const _handleInputChange = (e) => {
        e.preventDefault();
        if (imageData) {
            if (typeof imageData === 'object') {
                const formdata = new FormData();
                formdata.append('image', imageData);
                fetch('https://api.imgur.com/3/image', {
                    method: 'post',
                    headers: {
                        Authorization: 'Client-ID a81be53fc1fe8b3',
                    },
                    body: formdata,
                })
                    .then((data) => data.json())
                    .then((data) => {
                        const img = data.data.link;
                        _addImage(img);
                        setImageData(null);
                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                    });
            }
            if (typeof imageData === 'string') {
                _addImage(imageData);
                imageUrlInput.current.value = '';
                setImageData(null);
            }
            setIsOpen(!isOpen);
        } else {
            alert('please input image link or attach file');
        }
    };
    return (
        <ImageWrapper isOpen={isOpen}>
            <PhotoIcon src="/images/icons/photo.svg" alt="" onClick={() => setIsOpen(!isOpen)} />
            <div className={`floatwrapper ${isOpen ? 'open' : ''}`}>
                <p>Upload an image</p>
                <label htmFor="file-upload" className="image-select">
                    Selet Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setImageData(e.target.files[0]);
                    }}
                    id="file-upload"
                />
                <span>or</span>
                <span>Url</span>
                <input
                    type="text"
                    ref={imageUrlInput}
                    onChange={(e) => {
                        setImageData(e.target.value);
                    }}
                />
                <div className="buttons">
                    <button onClick={_handleInputChange}>Submit</button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </ImageWrapper>
    );
};

const ImageBox = styled.img`
    max-width: 70%;
    height: auto;
`;

const Media = (props) => {
    if (!props.block.getEntityAt(0)) return null;

    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;

    if (type === 'image') {
        const key = props.block.getKey();
        media = <ImageBox src={src} key={key} loading="lazy" />;
    }

    return media;
};

export const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
};
