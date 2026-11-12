import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 256, height: 256 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#070709',
          border: '14px solid #d2ff28',
          boxSizing: 'border-box',
          color: '#f6f3ec',
          fontSize: 108,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          fontFamily: 'sans-serif',
        }}
      >
        <span>K</span>
        <span style={{ color: '#d2ff28' }}>S</span>
      </div>
    ),
    { ...size }
  );
}
