import React, { useState, useEffect } from 'react';

function CameraFeeds() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  useEffect(() => {
    const fetchData = async (cameraNumber, setImage) => {
      try {
        const response = await fetch(`http://<raspberry_pi_ip>:5000/video_feed_${cameraNumber}`);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } catch (error) {
        console.error(`Error fetching camera ${cameraNumber} feed:`, error);
      }
    };

    // Fetch each camera feed every 100ms
    const intervalId1 = setInterval(() => fetchData(1, setImage1), 100);
    const intervalId2 = setInterval(() => fetchData(2, setImage2), 100);
    const intervalId3 = setInterval(() => fetchData(3, setImage3), 100);

    // Clear intervals when component unmounts
    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", padding: "20px" }}>
      {/* Top Row: Two cameras */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "20px" }}>
        <div style={{ margin: "0 10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "3px solid #000", padding: "10px", borderRadius: "8px", width: "400px", height: "300px" }}>
          <h2>Camera 1</h2>
          {image1 ? (
            <img src={image1} alt="Camera 1 Feed" style={{ width: "100%", height: "100%", objectFit: "cover", border: "2px solid black" }} />
          ) : (
            <p>Loading Camera 1...</p>
          )}
        </div>
        <div style={{ margin: "0 10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "3px solid #000", padding: "10px", borderRadius: "8px", width: "400px", height: "300px" }}>
          <h2>Camera 2</h2>
          {image2 ? (
            <img src={image2} alt="Camera 2 Feed" style={{ width: "100%", height: "100%", objectFit: "cover", border: "2px solid black" }} />
          ) : (
            <p>Loading Camera 2...</p>
          )}
        </div>
      </div>

      {/* Bottom Row: One camera */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div style={{ margin: "0 10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "3px solid #000", padding: "10px", borderRadius: "8px", width: "400px", height: "300px" }}>
          <h2>Camera 3</h2>
          {image3 ? (
            <img src={image3} alt="Camera 3 Feed" style={{ width: "100%", height: "100%", objectFit: "cover", border: "2px solid black" }} />
          ) : (
            <p>Loading Camera 3...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CameraFeeds;
