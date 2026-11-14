import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3001;

// Execução local
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// Entrada de produção para a Vercel
export default app;