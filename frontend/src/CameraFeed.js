import React, { useState, useEffect } from 'react';

function CameraFeed() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://<raspberry_pi_ip>:5000/video_feed'); // Replace with Raspberry Pi IP
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } catch (error) {
        console.error('Error fetching camera feed:', error);
      }
    };

    // Fetch every 100ms for near real-time updates
    const intervalId = setInterval(fetchData, 100);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Robot Camera Feed</h1>
      {image ? (
        <img
          src={image}
          alt="Robot Camera Feed"
          style={{ width: "80%", border: "1px solid black" }}
        />
      ) : (
        <p>Loading camera feed...</p>
      )}
    </div>
  );
}

export default CameraFeed;
