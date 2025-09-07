import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ApiDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    // Get environment info
    const envInfo = {
      MODE: import.meta.env.MODE,
      VITE_API_URL: import.meta.env.VITE_API_URL,
      baseURL: api.defaults.baseURL,
      allEnv: import.meta.env
    };
    setDebugInfo(envInfo);

    // Test API connection
    const testApi = async () => {
      try {
        console.log('🧪 Testing API connection...');
        const response = await fetch(api.defaults.baseURL + '/routes/');
        const data = await response.text();
        
        setTestResult({
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          data: data.substring(0, 200) + '...',
          success: response.ok
        });
      } catch (error) {
        setTestResult({
          error: error.message,
          success: false
        });
      }
    };

    testApi();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      right: 10, 
      background: 'white', 
      border: '2px solid #333', 
      padding: '10px',
      fontSize: '12px',
      maxWidth: '400px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <h3>🔍 API Debug Info</h3>
      
      <div>
        <strong>Environment:</strong>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>

      <div>
        <strong>API Test Result:</strong>
        <pre style={{ color: testResult?.success ? 'green' : 'red' }}>
          {JSON.stringify(testResult, null, 2)}
        </pre>
      </div>

      <div>
        <strong>Expected URL:</strong>
        <div>https://webstrat-production.up.railway.app/api/routes/</div>
      </div>
    </div>
  );
};

export default ApiDebugger;
