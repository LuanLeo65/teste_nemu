//src/server.ts
import app from "./app";

(async () => {
  try {
    const port = parseInt(`${process.env.PORT}`);

    app.listen(port);
    console.log(`Rodando na porta ${process.env.PORT}`);
  } catch (error) {
    console.log(`Erro ao tentar subir o server: ${error}`);
  }
})();
