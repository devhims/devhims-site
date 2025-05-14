import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Himanshu Gupta - Full Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.15) 2px, transparent 0)',
            backgroundSize: '50px 50px',
            zIndex: 1,
          }}
        />

        {/* Gradient overlay - slightly different color for Twitter */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to right, #1d4ed8, #3b82f6, #0ea5e9)',
            opacity: 0.7,
            zIndex: 2,
          }}
        />

        {/* Profile image with rounded borders */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3,
          }}
        >
          <img
            src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20%282%29-cewUemtY59wkXQB4V4F6hsGSoc7uI0.png'
            alt='Profile'
            width={220}
            height={220}
            style={{
              borderRadius: '50%',
              border: '6px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>

        {/* Name and title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 40,
            zIndex: 3,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Himanshu Gupta
          </h1>
          <h2
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              marginTop: 10,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Senior Full Stack Engineer
          </h2>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              gap: 12,
            }}
          >
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.3)',
                padding: '8px 16px',
                borderRadius: 20,
                color: 'white',
                fontSize: 20,
              }}
            >
              React
            </div>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.3)',
                padding: '8px 16px',
                borderRadius: 20,
                color: 'white',
                fontSize: 20,
              }}
            >
              Next.js
            </div>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.3)',
                padding: '8px 16px',
                borderRadius: 20,
                color: 'white',
                fontSize: 20,
              }}
            >
              TypeScript
            </div>
          </div>
        </div>

        {/* Twitter handle */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.8)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            style={{ marginRight: 4 }}
          >
            <path
              d='M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z'
              fill='rgba(255, 255, 255, 0.8)'
            />
          </svg>
          @devhims
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
