import app from "./app";

const start = async () => {
  try {
    await app.ready();
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
