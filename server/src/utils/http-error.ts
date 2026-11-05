// Error con el código HTTP que debe responder el manejador central
export const httpError = (statusCode: number, message: string) =>
  Object.assign(new Error(message), { statusCode });
