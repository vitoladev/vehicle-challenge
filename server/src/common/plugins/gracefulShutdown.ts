import { FastifyPluginCallback } from "fastify";

export const gracefulShutdownPluginFn: FastifyPluginCallback = (
  app,
  _,
  done
) => {
  console.log("im here");
  const shutdownGracefully = async (signal: NodeJS.Signals) => {
    app.log.fatal(`Received signal to terminate: ${signal}`);

    await app.close();
    process.kill(process.pid, signal);
    console.log("shutdown");
  };

  process.once("SIGINT", shutdownGracefully);
  process.once("SIGTERM", shutdownGracefully);
  done();
};

export const gracefulShutdownPlugin = gracefulShutdownPluginFn;
