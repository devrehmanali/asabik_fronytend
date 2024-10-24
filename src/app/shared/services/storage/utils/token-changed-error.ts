class CustomError {
  originalError: Error;

  constructor(originalError?: Error) {
    if (originalError) {
      this.originalError = originalError;
    }
  }
}

export class TokenChangedError extends CustomError {}
