import { Amplify } from 'aws-amplify';

let isConfigured = false;

export function initializeAmplifyOAuth() {
  if (isConfigured) {
    return;
  }

  const region = process.env.NEXT_PUBLIC_AWS_REGION || '';
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '';
  const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  if (!userPoolId || !userPoolClientId || !domain) {
    console.error('Missing required Amplify configuration:', {
      userPoolId: !!userPoolId,
      userPoolClientId: !!userPoolClientId,
      domain: !!domain,
      region: !!region
    });
    return;
  }

  const cleanDomain = domain.replace(/^https?:\/\//, '');

  try {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId,
          userPoolClientId,
          signUpVerificationMethod: 'code',
          loginWith: {
            oauth: {
              domain: cleanDomain,
              scopes: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
              redirectSignIn: [`${origin}/auth/callback`],
              redirectSignOut: [`${origin}`],
              responseType: 'code'
            },
            email: true,
            phone: false,
            username: false,
          }
        }
      }
    }, {
      ssr: true 
    });
    
    isConfigured = true;
    console.log('Amplify OAuth configured successfully', {
      domain: cleanDomain,
      redirectSignIn: `${origin}/auth/callback`,
      userPoolId,
      region,
      scopes: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin']
    });
  } catch (error) {
    console.error('Error configuring Amplify:', error);
  }
}
