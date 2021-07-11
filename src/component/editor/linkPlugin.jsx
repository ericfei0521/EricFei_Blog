import { RichUtils, KeyBindingUtil, EditorState } from 'draft-js';

export const Link = ({ contentState, entityKey }) => {
    const { url } = contentState.getEnitity(entityKey).getData();
    return (
        <a href={url} target="_blank">
            {props.children}
        </a>
    );
};

export const linkStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        // console.log(character);
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
};
