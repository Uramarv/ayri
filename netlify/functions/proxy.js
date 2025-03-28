exports.handler = async (event) => {
  const targetURL = "https://92j9z1gpp318cidw.dyn.acsc.land/admin";
  
  try {
    const response = await fetch(targetURL, {
      headers: {
        "Host": "localhost:5000",  // Kritischer Header
        "X-Forwarded-Host": "localhost:5000",  // Backup-Header
        "User-Agent": "Netlify-Proxy",
        "Accept": "*/*"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    
    return {
      statusCode: 200,
      body: data,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"  // CORS für Ihre Frontend-Seite
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
};
