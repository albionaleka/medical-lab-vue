export class NetworkError extends Error {}
export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }
  }
}
