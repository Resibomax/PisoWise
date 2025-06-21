# Amazon Cognito Authentication Setup

This document provides instructions for setting up Amazon Cognito authentication for the PisoWise application.

## Prerequisites

- AWS Account
- Access to AWS Management Console
- Basic knowledge of AWS services
- Google Developer Console account (for Google OAuth)

## Step 1: Create a Cognito User Pool

1. Go to the AWS Management Console and navigate to Amazon Cognito
2. Click "Create user pool"
3. Configure sign-in experience:
   - Select "Email" as a sign-in option
   - Under "User name requirements", select "Allow users to sign in with a preferred user name"
   - Under "Password policy", choose an appropriate password policy
   - Click "Next"
4. Configure security requirements:
   - Choose MFA settings (Optional or Required)
   - Choose account recovery options
   - Click "Next"
5. Configure sign-up experience:
   - Choose which attributes are required
   - Configure self-service account recovery
   - Click "Next"
6. Configure message delivery:
   - Choose "Send email with Cognito" for development
   - For production, consider setting up Amazon SES
   - Click "Next"
7. Integrate your app:
   - Enter a User pool name (e.g., "PisoWiseUserPool")
   - Under "Initial app client", enter a name (e.g., "PisoWiseWebClient")
   - Select "Public client" for client type
   - Uncheck "Generate a client secret" (for JavaScript applications)
   - Under "Advanced app client settings", make sure "ALLOW_USER_PASSWORD_AUTH" is enabled in the Authentication flows
   - Click "Next"
8. Review and create:
   - Review all settings
   - Click "Create user pool"

## Step 2: Configure Google as an Identity Provider

1. Create a project in Google Developer Console:
   - Go to [Google Developer Console](https://console.developers.google.com/)
   - Create a new project
   - Enable the Google+ API
   - Configure the OAuth consent screen
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized JavaScript origins (e.g., `http://localhost:3000`)
   - Add authorized redirect URIs (e.g., `https://your-cognito-domain.auth.region.amazoncognito.com/oauth2/idpresponse`)
   - Note your Google Client ID and Client Secret

2. Configure Google as an identity provider in Cognito:
   - Go to your Cognito User Pool
   - Go to "Sign-in experience" tab
   - Under "Federated identity provider sign-in", click "Add identity provider"
   - Select "Google"
   - Enter your Google Client ID and Client Secret
   - Map Google attributes to user pool attributes
   - Click "Add identity provider"

3. Configure App Client settings:
   - Go to "App integration" tab
   - Under "App clients and analytics", select your app client
   - Under "Hosted UI", enable it and configure:
     - Add callback URLs (e.g., `http://localhost:3000/auth/callback`)
     - Add sign-out URLs (e.g., `http://localhost:3000`)
     - Select "Authorization code grant" and "Implicit grant"
     - Select scopes (e.g., email, openid, profile)
   - Click "Save changes"

## Step 3: Configure Environment Variables

1. Copy the `.env.local.example` file to `.env.local`:
   ```
   cp .env.local.example .env.local
   ```

2. Update the `.env.local` file with your Cognito details:
   ```
   NEXT_PUBLIC_AWS_REGION=your-aws-region (e.g., us-east-1)
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
   NEXT_PUBLIC_COGNITO_CLIENT_ID=your-app-client-id
   NEXT_PUBLIC_COGNITO_DOMAIN=your-cognito-domain.auth.your-region.amazoncognito.com
   ```

   You can find these values in the AWS Console:
   - User Pool ID: Cognito > User Pools > Your User Pool > User pool overview
   - App Client ID: Cognito > User Pools > Your User Pool > App integration > App clients and analytics
   - Cognito Domain: Cognito > User Pools > Your User Pool > App integration > Domain name

## Step 4: Run the Application

1. Install dependencies (if not already installed):
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Flow

The application implements the following authentication flows:

1. **Sign Up**: Users can create a new account with email and password
2. **Email Verification**: After sign up, users must verify their email address
3. **Sign In**: Users can sign in with their email and password
4. **Google Authentication**: Users can sign in or sign up with their Google account
5. **Protected Routes**: The projects page and other protected pages require authentication

## Troubleshooting

- **"User is not confirmed"**: This error occurs when a user tries to sign in before verifying their email. Direct them to the verification page.
- **"Incorrect username or password"**: Check that the user is entering the correct credentials.
- **"User does not exist"**: The user hasn't signed up yet or is using a different email address.
- **Google OAuth issues**: Make sure your redirect URIs are correctly configured in both Google Developer Console and Cognito.

## Additional Resources

- [AWS Amplify Authentication Documentation](https://docs.amplify.aws/react/build-a-backend/auth/set-up-auth/)
- [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
