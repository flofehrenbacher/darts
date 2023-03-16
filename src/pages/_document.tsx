import { createGetInitialProps } from '@mantine/next'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

class MyDocument extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/logo.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="App for playing darts" />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/logo192.png"
            rel="icon"
            type="image/png"
            sizes="192x192"
          />
          <link
            href="/logo512.png"
            rel="icon"
            type="image/png"
            sizes="512x512"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <title>Darts - Hunter</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
