import { Amplify } from 'aws-amplify';

export function initializeAmplifyOAuth() {
  const region = process.env.NEXT_PUBLIC_AWS_REGION || '';
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '';
  const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        signUpVerificationMethod: 'code',
        loginWith: {
          oauth: {
            domain,
            scopes: ['email', 'profile', 'openid'],
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
  });
}
