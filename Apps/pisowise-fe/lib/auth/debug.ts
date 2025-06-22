export function debugAuthConfig() {
  const config = {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    currentUrl: typeof window !== 'undefined' ? window.location.href : 'N/A',
    origin: typeof window !== 'undefined' ? window.location.origin : 'N/A'
  };

  console.log('🔍 Auth Configuration Debug:', config);
  
  const missing = Object.entries(config)
    .filter(([key, value]) => !value || value === 'N/A')
    .map(([key]) => key);
    
  if (missing.length > 0) {
    console.error('Missing configuration values:', missing);
  } else {
    console.log('All configuration values present');
  }

  return config;
}

export function debugUrlParams() {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlParams.entries());
  
  console.log('🔍 URL Parameters:', params);
  
  if (params.error) {
    console.error('OAuth Error in URL:', {
      error: params.error,
      error_description: params.error_description,
      error_uri: params.error_uri
    });
  }
  
  return params;
}
