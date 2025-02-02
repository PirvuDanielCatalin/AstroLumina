import React, { useEffect, useState } from 'react';
import SimpleLoadingSpinner from './SimpleLoadingSpinner';
import ParticleLoadingAnimation from './ParticleLoadingAnimation';

const LoadingAnimation: React.FC = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);
  }, []);

  if (isIOS) {
    return <SimpleLoadingSpinner />;
  }

  return <ParticleLoadingAnimation />;
};

export default LoadingAnimation;
