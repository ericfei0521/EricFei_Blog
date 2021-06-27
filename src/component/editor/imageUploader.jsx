import { useState } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import styled from 'styled-components';

export const ImageUploader = ({ editorState, addImage }) => {
    const [imageData, setImageData] = useState(null);
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
                })
                .catch((err) => {
                    console.log('ERROR', err);
                });
        }
    };
    return (
        <div>
            <form>
                <label htmlFor="file-upload">Upload</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setImageData(e.target.files[0]);
                    }}
                    id="file-upload"
                />
                <button onClick={_handleInputChange}>Submit</button>
            </form>
        </div>
    );
};

const ImageBox = styled.div`
    width: 100%;
    height: 20vw;
    background-image: url(${(props) => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const Media = (props) => {
    if (!props.block.getEntityAt(0)) return null;

    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;

    if (type === 'image') {
        const key = props.block.getKey();

        media = <ImageBox image={src} />;
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
