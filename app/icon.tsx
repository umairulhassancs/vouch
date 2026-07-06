import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          width="32"
          height="32"
          fill="none"
        >
          {/* Left diagonal stroke */}
          <path
            d="M4 4 L22 40"
            stroke="#6C5CE7"
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right diagonal stroke */}
          <path
            d="M40 4 L22 40"
            stroke="#00B894"
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Glowing tip accent */}
          <circle cx="22" cy="40" r="3" fill="#00C9A7" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
