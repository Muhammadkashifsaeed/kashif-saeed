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
          backgroundColor: '#1e1e2f',
          overflow: 'hidden',
          border: '12px solid #6366f1',
          boxSizing: 'border-box',
        }}
      >
        {/* Using GitHub avatar to ensure it's a perfect square and easily accessible by the edge runtime */}
        <img 
          src="https://github.com/Muhammadkashifsaeed.png" 
          width="100%" 
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </div>
    ),
    { ...size }
  );
}
