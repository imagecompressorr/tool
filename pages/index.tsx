import React, { useState } from 'react';
import ImageCompressor from '../components/ImageCompressor';
import AdSenseAd from '../components/AdSenseAd';
import styles from '../styles/Home.module.css';

const ADSENSE_UNIT_ID = 'ca-pub-XXXXXXXXXXXXXXXX'; // Replace or make configurable

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Image Compression Tool</h1>
        <p>Quickly compress and optimize your images online. Choose quality, preview results, and download optimized images. 100% free, SEO optimized, and AdSense ready.</p>
      </header>

      <section className={styles.compressorSection}>
        <ImageCompressor />
      </section>

      <aside className={styles.adSidebar}>
        {/* AdSense - Sidebar or Banner */}
        <AdSenseAd adUnit={ADSENSE_UNIT_ID} />
      </aside>

      <section className={styles.adsFooter}>
        {/* AdSense - Footer */}
        <AdSenseAd adUnit={ADSENSE_UNIT_ID} />
      </section>
    </main>
  );
}
