import React, { useState, useEffect } from 'react';

export function SingleListimgSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images]);

  return (
    <div className="image-slider">
      <img src={images[currentImageIndex]} className='w-full h-[400px] sm:h-[500px] border border-black object-cover' alt="Listing Image" />
    </div>
  );
}