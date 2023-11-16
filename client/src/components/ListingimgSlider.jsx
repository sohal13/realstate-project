import React, { useState, useEffect } from 'react';

export function ListingimgSlider({ images }) {
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
      <img src={images[currentImageIndex]} alt="Listing Image" />
    </div>
  );
}