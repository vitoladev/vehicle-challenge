import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export const errorHandler = (
  error: FastifyError,
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ZodError) {
    reply.status(422).send({
      statusCode: 422,
      error: "Unprocessable Entity",
      message: "Validation error",
      errors: error.issues,
    });
    return;
  }

  if (error.statusCode === 500) {
    reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "An internal server error occurred",
    });
    reply.log.error(error);
    return;
  }

  reply.send(error);
};
