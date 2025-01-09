import React, { useState, useEffect } from 'react';

function CameraFeed() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/video_feed');
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } catch (error) {
        console.error('Error fetching camera feed:', error);
      }
    };

    const intervalId = setInterval(fetchData, 100); // Update every 100ms

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {image && <img src={image} alt="Robot Camera Feed" />}
    </div>
  );
}

export default CameraFeed;