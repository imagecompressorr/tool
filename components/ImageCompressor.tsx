import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import styles from '../styles/ImageCompressor.module.css';

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
  const [compressionLevel, setCompressionLevel] = useState(70);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      setError('Please upload a valid image file.');
      return;
    }
    setOriginalImage(file);
    setCompressedImage(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError('');
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      setError('Please upload a valid image file.');
      return;
    }
    setOriginalImage(file);
    setCompressedImage(null);
  };

  const handleCompress = async () => {
    if (!originalImage) return;
    setLoading(true);
    setError('');
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: compressionLevel / 100,
      };
      const compressed = await imageCompression(originalImage, options);
      setCompressedImage(compressed);
    } catch (err) {
      setError('Compression failed. Please try again.');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const url = URL.createObjectURL(compressedImage);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${originalImage?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.compressor}>
      <div
        className={styles.uploadArea}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
        <p>Click or drag & drop an image here</p>
      </div>
      {originalImage && (
        <div className={styles.sliderContainer}>
          <label htmlFor="compressionRange">
            Compression quality: {compressionLevel}%
          </label>
          <input
            id="compressionRange"
            type="range"
            min={10}
            max={100}
            value={compressionLevel}
            onChange={e => setCompressionLevel(Number(e.target.value))}
          />
          <button onClick={handleCompress} disabled={loading} className={styles.compressBtn}>
            {loading ? 'Compressing...' : 'Compress Image'}
          </button>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.previewSection}>
        {originalImage && (
          <div className={styles.previewBlock}>
            <h3>Original</h3>
            <img
              src={URL.createObjectURL(originalImage)}
              alt="Original preview"
              className={styles.previewImg}
            />
            <p>Size: {(originalImage.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        {compressedImage && (
          <div className={styles.previewBlock}>
            <h3>Compressed</h3>
            <img
              src={URL.createObjectURL(compressedImage)}
              alt="Compressed preview"
              className={styles.previewImg}
            />
            <p>
              Size:{' '}
              {(compressedImage.size / 1024).toFixed(2)} KB <br />
              Reduction:{' '}
              {(
                100 -
                (compressedImage.size / (originalImage?.size || 1)) * 100
              ).toFixed(1)}
              %
            </p>
            <button onClick={handleDownload} className={styles.downloadBtn}>
              Download Compressed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
