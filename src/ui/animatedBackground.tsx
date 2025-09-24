'use client'

import { Box, keyframes } from '@mui/material'

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
`

const floatReverse = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(15px) rotate(-120deg);
  }
  66% {
    transform: translateY(-10px) rotate(-240deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`

export function AnimatedBackground() {
  return <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      background: `
        linear-gradient(135deg, 
          rgba(20, 111, 194, 0.1) 0%, 
          rgba(0, 135, 126, 0.08) 25%, 
          rgba(104, 20, 194, 0.06) 50%, 
          rgba(233, 242, 247, 0.9) 75%, 
          rgba(255, 255, 255, 0.95) 100%
        )
      `,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(20, 111, 194, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 135, 126, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(104, 20, 194, 0.1) 0%, transparent 50%)
        `,
      }
    }}
  >
    {/* Desktop-only animated blobs for better mobile performance */}
    <Box
      sx={{
        display: { xs: 'none', md: 'block' }
      }}
    >
      {/* Floating Blob 1 */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 30% 30%, 
              rgba(20, 111, 194, 0.2) 0%, 
              rgba(20, 111, 194, 0.1) 50%, 
              transparent 100%
            )
          `,
          filter: 'blur(1px)',
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '0s',
        }}
      />
      
      {/* Floating Blob 2 */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 70% 20%, 
              rgba(0, 135, 126, 0.18) 0%, 
              rgba(0, 135, 126, 0.08) 50%, 
              transparent 100%
            )
          `,
          filter: 'blur(1px)',
          animation: `${floatReverse} 10s ease-in-out infinite`,
          animationDelay: '2s',
        }}
      />
      
      {/* Floating Blob 3 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 50% 50%, 
              rgba(104, 20, 194, 0.15) 0%, 
              rgba(104, 20, 194, 0.05) 50%, 
              transparent 100%
            )
          `,
          filter: 'blur(1px)',
          animation: `${float} 12s ease-in-out infinite`,
          animationDelay: '4s',
        }}
      />
      
      {/* Floating Blob 4 */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '40%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 20% 80%, 
              rgba(20, 111, 194, 0.12) 0%, 
              rgba(0, 135, 126, 0.08) 50%, 
              transparent 100%
            )
          `,
          filter: 'blur(1px)',
          animation: `${floatReverse} 9s ease-in-out infinite`,
          animationDelay: '1s',
        }}
      />
      
      {/* Floating Blob 5 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '40%',
          right: '10%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 60% 40%, 
              rgba(0, 135, 126, 0.14) 0%, 
              rgba(104, 20, 194, 0.06) 50%, 
              transparent 100%
            )
          `,
          filter: 'blur(1px)',
          animation: `${float} 11s ease-in-out infinite`,
          animationDelay: '3s',
        }}
      />
      
      {/* Floating Blob 6 */}
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          left: '60%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 40% 60%, 
              rgba(104, 20, 194, 0.16) 0%, 
              rgba(20, 111, 194, 0.08) 50%, 
              transparent 100%
            )
          `,
          filter: 'blur(1px)',
          animation: `${floatReverse} 7s ease-in-out infinite`,
          animationDelay: '5s',
        }}
      />
      
      {/* Subtle pulsing overlay - desktop only */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 50% 50%, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 70%
            )
          `,
          animation: `${pulse} 6s ease-in-out infinite`,
        }}
      />
    </Box>
  </Box>
}