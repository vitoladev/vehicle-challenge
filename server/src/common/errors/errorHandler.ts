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

  reply.send(error);
};
