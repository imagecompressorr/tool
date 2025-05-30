import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Responsive Image Compression Tool - Optimize Your Images Online</title>
        <meta name="description" content="Compress and optimize images online for free. Select your preferred compression level and download optimized images instantly. SEO-friendly, responsive, and AdSense-ready." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Responsive Image Compression Tool" />
        <meta property="og:description" content="Compress and optimize images online. Choose compression levels and download optimized images. SEO optimized and AdSense ready." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
