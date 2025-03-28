exports.handler = async (event) => {
    const targetURL = "https://92j9z1gpp318cidw.dyn.acsc.land/admin";
    
    const response = await fetch(targetURL, {
        headers: {
            "Host": "localhost:5000",  // Kritischer Header
            "User-Agent": "Netlify-Proxy",
            "Accept": "*/*"
        }
    });
    
    const data = await response.text();
    
    return {
        statusCode: 200,
        body: data,
        headers: {
            "Content-Type": "text/plain"
        }
    };
};
