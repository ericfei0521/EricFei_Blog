import { createGlobalStyle } from 'styled-components';
import { resetStyle } from './resetStyle';

export default createGlobalStyle`
    ${resetStyle}
    body {
        font-size: 16px;
        margin: 0;
        font-family: -apple-system, 'Nunito', 'Roboto', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6rem;

        p {
            line-height: 20px;
        }

        a {
            font-size: 16px;
            color: black;
            text-decoration: none;
        }
        span {
            line-height: 30px;
        }

        main {
            width: 100%;
            min-height: calc(80vh - 42px);
        }
    }
`;
