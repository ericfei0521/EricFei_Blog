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
    const _handleInputChange = async (data) => {
        if (data) {
            const formdata = new FormData();
            console.log(data);
            formdata.append('image', data);
            await fetch('https://api.imgur.com/3/upload', {
                method: 'post',
                headers: {
                    Authorization: 'Client-ID a81be53fc1fe8b3',
                },
                body: data,
            })
                .then((data) => data.json())
                .then((data) => {
                    img.src = data.data.link;
                    url.innerText = data.data.link;
                    console.log(img.src);
                    console.log(url.innerText);
                })
                .catch((err) => {
                    console.log(111, err);
                });
        }
        // _addImage(imageData);
    };
    return (
        <div>
            <form>
                <label htmlFor="file-upload">Upload</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        _handleInputChange(e.target.files[0]);
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
