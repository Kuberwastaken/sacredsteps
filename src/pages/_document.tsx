import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* PWA Meta Tags */}
          <meta name="application-name" content="PrayGo" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="PrayGo" />
          <meta name="description" content="A React praygo clone web app for learning religious content" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#0A0" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#0A0" />
          
          {/* Apple Touch Icons */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          
          {/* Manifest */}
          <link rel="manifest" href="/app.webmanifest" />
          
          {/* Favicon */}
          <link rel="shortcut icon" href="/favicon.ico" />
          
          {/* Additional PWA icons */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
