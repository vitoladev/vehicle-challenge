import { FastifyPluginCallback } from "fastify";

export const gracefulShutdownPlugin: FastifyPluginCallback = (
  app,
  _,
  done
) => {
  const shutdownGracefully = async (signal: NodeJS.Signals) => {
    app.log.fatal(`Received signal to terminate: ${signal}`);

    await app.close();
    process.kill(process.pid, signal);
  };

  process.once("SIGINT", shutdownGracefully);
  process.once("SIGTERM", shutdownGracefully);
  done();
};
