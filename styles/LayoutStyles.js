import { css } from 'styled-components';

const styles = css`
    header {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        height: 10vh;
        box-shadow: 0px 2px 10px rgba(183, 203, 208, 0.269);
        display: grid;
        grid-template-columns: 20% 60% 20%;
        align-items: center;
        text-align: center;
        position: sticky;
        top: 0;
        background-color: white;
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
            a:hover {
                color: brown;
            }
        }
    }
    .content {
        margin: 50px auto;
        width: 80%;
        display: flex;
        flex-direction: column;

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        h3 {
            font-size: 1.2rem;
            font-weight: 700;
            color: black;
            margin-bottom: 10px;
        }
        p {
            margin-bottom: 10px;
        }

        img {
            width: 100%;
        }
    }
    footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        height: 40px;
        background-color: rgb(188 90 58);
        z-index: 999;
    }
`;
export default styles;
