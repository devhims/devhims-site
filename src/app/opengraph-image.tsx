import { ImageResponse } from 'next/og';

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

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to right, #4338ca, #3b82f6, #10b981)',
            opacity: 0.6,
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
            width={240}
            height={240}
            style={{
              borderRadius: '50%',
              border: '6px solid rgba(255, 255, 255, 0.2)',
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
              fontSize: 60,
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
              fontSize: 30,
              color: 'rgba(255, 255, 255, 0.8)',
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
              gap: 10,
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
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
                background: 'rgba(255, 255, 255, 0.1)',
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
                background: 'rgba(255, 255, 255, 0.1)',
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

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.7)',
            zIndex: 3,
          }}
        >
          devhims.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
