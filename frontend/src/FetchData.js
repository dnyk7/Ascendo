// template for fetching data from FastAPI backend
// to insert raspberry pi ip address, replace <raspberry_pi_ip_address> with the ip address of your raspberry pi

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://<raspberry_pi_ip_address>:8000/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      
    fetchData();
  }, []);

  return (
    <div>
      <h1>My React Component</h1>
      {data && <p>Message from FastAPI: {data.message}</p>}
    </div>
  );
}

export default MyComponent;
