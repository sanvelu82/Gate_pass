import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import './Scanner.css';

export default function Scanner({ onScan }) {
  const html5QrRef = useRef(null);
  const [manualInput, setManualInput] = useState('');
  const [cameraError, setCameraError] = useState(false);
  const [scannerReady, setScannerReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let html5QrCode = null;

    async function startScanner() {
      // Small delay to ensure DOM element is mounted
      await new Promise(r => setTimeout(r, 300));

      if (!mounted) return;

      const el = document.getElementById('qr-reader');
      if (!el) {
        console.warn('Scanner element not found');
        setCameraError(true);
        return;
      }

      try {
        html5QrCode = new Html5Qrcode('qr-reader', {
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
          ],
          verbose: false,
        });
        html5QrRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 15,
            qrbox: { width: 280, height: 180 },
            aspectRatio: 1.333,
            disableFlip: false,
          },
          (decodedText) => {
            if (mounted) onScan(decodedText);
          },
          () => {} // silence no-code frames
        );

        if (mounted) setScannerReady(true);
      } catch (err) {
        console.warn('Camera init error:', err);
        if (mounted) setCameraError(true);
      }
    }

    startScanner();

    return () => {
      mounted = false;
      if (html5QrCode) {
        html5QrCode.stop().catch(() => {});
        html5QrCode.clear();
      }
    };
  }, []); // Only run once on mount — onScan is stable via useCallback

  const handleManualVerify = () => {
    const val = manualInput.trim();
    if (val) {
      onScan(val);
      setManualInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleManualVerify();
  };

  return (
    <section className="scanner-panel">
      <div className="panel-header">
        <div className={`pulse-dot ${scannerReady ? '' : 'inactive'}`}></div>
        <h2>Barcode Scanner</h2>
      </div>

      <div className="scanner-wrapper">
        <div id="qr-reader" className="qr-reader"></div>

        {cameraError && (
          <div className="camera-fallback-overlay">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="2"/>
              <line x1="2" y1="2" x2="22" y2="22"/>
            </svg>
            <p>Camera not available</p>
            <p className="camera-hint">Use manual entry below or allow camera permission</p>
          </div>
        )}

        {!cameraError && (
          <div className="scanner-overlay">
            <div className="scan-line"></div>
            <div className="corner tl"></div>
            <div className="corner tr"></div>
            <div className="corner bl"></div>
            <div className="corner br"></div>
          </div>
        )}
      </div>

      <div className="scanner-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
        </svg>
        Position the barcode within the frame
      </div>

      <div className="manual-entry">
        <p>Or enter Registration Number manually:</p>
        <div className="manual-input-group">
          <input
            type="text"
            id="manual-reg-input"
            placeholder="e.g. 20261001"
            autoComplete="off"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button id="manual-verify-btn" onClick={handleManualVerify}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Verify
          </button>
        </div>
      </div>
    </section>
  );
}
