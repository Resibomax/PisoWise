import { getCurrentUser, fetchUserAttributes } from '@aws-amplify/auth';

export async function handleOAuthCallback(): Promise<{
  success: boolean;
  user?: any;
  error?: string;
}> {
  try {
    console.log('Starting OAuth callback processing...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('🔄 Getting current user...');
    const currentUser = await getCurrentUser();
    console.log('Current user obtained:', currentUser.userId);
    
    console.log('Fetching user attributes...');
    const attributes = await fetchUserAttributes();
    console.log('User attributes fetched:', attributes);
    
    return {
      success: true,
      user: {
        email: attributes?.email ?? '',
        sub: currentUser.userId,
        attributes
      }
    };
  } catch (error: any) {
    console.error('OAuth callback handling failed:', error);
    
    if (error.name === 'NotAuthorizedException') {
      return {
        success: false,
        error: 'Authentication failed. Please try signing in again.'
      };
    }
    
    if (error.name === 'UserNotConfirmedException') {
      return {
        success: false,
        error: 'Please confirm your email address before signing in.'
      };
    }

    if (error.name === 'UserNotFoundException') {
      return {
        success: false,
        error: 'User not found. Please check your credentials.'
      };
    }

    if (error.message?.includes('400') || error.message?.includes('Bad Request')) {
      return {
        success: false,
        error: 'Authentication service error. Please try again in a moment.'
      };
    }
    
    return {
      success: false,
      error: error.message || 'Authentication failed'
    };
  }
}
