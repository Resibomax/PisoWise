import { getCurrentUser, fetchUserAttributes } from "@aws-amplify/auth";

interface OAuthResult {
  success: boolean;
  user?: {
    email: string;
    sub: string;
    profile?: string;
    attributes: Record<string, string | undefined>;
  };
  error?: string;
}

// Type guard to safely check if error has a `name` property
function hasErrorName(err: unknown): err is { name: string; message?: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    typeof (err as Record<string, unknown>).name === "string"
  );
}

export async function handleOAuthCallback(): Promise<OAuthResult> {
  try {
    console.log("Starting OAuth callback processing...");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("🔄 Getting current user...");
    const currentUser = await getCurrentUser();
    console.log("Current user obtained:", currentUser.userId);

    console.log("Fetching user attributes...");
    const attributes = await fetchUserAttributes();
    console.log("User attributes fetched:", attributes);

    return {
      success: true,
      user: {
        email: attributes?.email ?? "",
        sub: currentUser.userId,
        profile: attributes?.profile ?? "",
        attributes,
      },
    };
  } catch (err: unknown) {
    console.error("OAuth callback handling failed:", err);

    if (hasErrorName(err)) {
      if (err.name === "NotAuthorizedException") {
        return {
          success: false,
          error: "Authentication failed. Please try signing in again.",
        };
      }

      if (err.name === "UserNotConfirmedException") {
        return {
          success: false,
          error: "Please confirm your email address before signing in.",
        };
      }

      if (err.name === "UserNotFoundException") {
        return {
          success: false,
          error: "User not found. Please check your credentials.",
        };
      }

      if (
        err.message?.includes("400") ||
        err.message?.includes("Bad Request")
      ) {
        return {
          success: false,
          error: "Authentication service error. Please try again in a moment.",
        };
      }

      return {
        success: false,
        error: err.message || "Authentication failed",
      };
    }

    return {
      success: false,
      error: "Unknown authentication error",
    };
  }
}
