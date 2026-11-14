import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3001;

// Inicializa somente no ambiente local
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;