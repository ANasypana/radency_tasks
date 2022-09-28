// Core
import Document, {
    Head,
    Main,
    NextScript,
    Html,
} from 'next/document';


class MyDocument extends Document {
    render() {
        return (
            <Html lang = 'en'>
                <Head>
                    <title>Notes</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
