import { css } from 'styled-components';

const styles = css`
    display: grid;
    height: 400px;
    margin-top: 20px;
    padding: 20px;
    grid-template-columns: 70% 30%;
    border-bottom: 1px solid white;
    .image {
        width: 100%;
        height: 400px;
        overflow: hidden;
        img {
            width: 500px;
            transform: translate(43px, -60px);
            filter: contrast(90%) grayscale(20%);
        }
        .animation_trigger {
            transform: translate(0px, -60px);
            transition: 1s ease-in-out;
        }
    }
    .intro {
        padding: 0 20px;
        z-index: 100;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
            font-size: 1.2rem;
            line-height: 2rem;
        }
        .contact {
            width: 100px;
            display: flex;
            justify-content: space-between;
            img {
                filter: brightness(0) invert(1);
            }
        }
    }
`;
export default styles;
