import React, { useEffect } from 'react';

interface Props {
  adUnit: string;
}

const AdSenseAd: React.FC<Props> = ({ adUnit }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Ignore AdSense push error on SSR
    }
  }, [adUnit]);

  if (!adUnit) return null;

  return (
    <>
      {/* Google AdSense */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90, minWidth: 300, width: '100%' }}
        data-ad-client={adUnit}
        data-ad-slot="YOUR-AD-UNIT-SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default AdSenseAd;
