import { css } from 'styled-components';

const styles = css`
    header {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        height: 70px;
        display: grid;
        grid-template-columns: 20% 60% 20%;
        align-items: center;
        text-align: center;
        position: fixed;
        top: 0;
        color: white;
        background-color: #121212;
        z-index: 999;
        .title {
            font-size: 1.5rem;
            font-weight: bolder;
            cursor: pointer;
        }
        nav {
            display: flex;
            justify-content: space-around;
            box-sizing: border-box;
            padding: 0 10%;
            img {
                filter: brightness(0) invert(1);
            }
        }
    }
    .content {
        margin: 50px auto;
        width: 80%;
        display: flex;
        flex-direction: column;
        min-height: 84vh;
    }
    footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: white;
        height: 40px;
        background-color: rgb(188 90 58 0);
        z-index: 999;
        span {
            font-size: 8px;
            color: #888888;
            padding-right: 20px;
        }
    }
`;
export default styles;
