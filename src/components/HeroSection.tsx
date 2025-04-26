
import React from 'react';
import ParticleBackground from './ParticleBackground';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundClass?: string;
  height?: string;
  children?: React.ReactNode;
  textColor?: string;
  overlayClass?: string;
  particleColor?: string;
  particleCount?: number;
  particleSpeed?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  backgroundClass = "bg-mosaic-green-dark",
  height = "py-32", 
  children,
  textColor = "text-white",
  overlayClass = "bg-black/30",
  particleColor = "#ffffff",
  particleCount = 30,
  particleSpeed = 0.5
}) => {
  return (
    <section 
      className={`relative overflow-hidden ${height} px-4 flex items-center justify-center ${textColor}`}
      style={backgroundImage ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : {}}
    >
      {/* Background color or image */}
      {!backgroundImage && <div className={`absolute inset-0 ${backgroundClass}`}></div>}
      
      {/* Overlay for better text readability */}
      {backgroundImage && <div className={`absolute inset-0 ${overlayClass}`}></div>}
      
      {/* Particles effect */}
      <ParticleBackground 
        particleColor={particleColor}
        particleCount={particleCount}
        particleSpeed={particleSpeed}
      />
      
      {/* Content */}
      <div className="container relative z-10 mx-auto text-center max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
