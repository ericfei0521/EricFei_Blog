import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class Document extends NextDocument {
    static getInitialProps = async (ctx: DocumentContext) => {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await NextDocument.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            // sheet.seal();
        }
    };

    render() {
        return (
            <Html lang="en">
                <Head>
                    <style>
                        {`
                        html, body {
                            overflow-x:hidden;
                        }`}
                    </style>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
