const fetch = require('node-fetch');

exports.handler = async (event) => {
  console.log('Function started'); // Debug-Log
  
  const targetURL = "https://92j9z1gpp318cidw.dyn.acsc.land/admin";
  const headers = {
    "Host": "localhost:5000",
    "X-Forwarded-Host": "localhost:5000",
    "User-Agent": "Netlify-Proxy",
    "Accept": "*/*"
  };

  try {
    console.log('Sending request to:', targetURL); // Debug
    console.log('With headers:', headers); // Debug
    
    const response = await fetch(targetURL, { headers });
    
    console.log('Received status:', response.status); // Debug
    
    if (!response.ok) {
      throw new Error(`Target server responded with ${response.status}`);
    }

    const data = await response.text();
    console.log('Response data:', data.slice(0, 50) + '...'); // Debug
    
    return {
      statusCode: 200,
      body: data,
      headers: { 
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*" 
      }
    };
    
  } catch (error) {
    console.error('Full error:', error); // Debug
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      }
    };
  }
};
