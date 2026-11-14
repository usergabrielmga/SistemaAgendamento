import 'dotenv/config';
import app from './app'; // Importa o app configurado com cors, rotas, etc.

const PORT = process.env.PORT || 3001;

// Se estiver rodando localmente (desenvolvimento), inicia o servidor na porta 3001
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando localmente em http://localhost:${PORT}`);
  });
}

// Obrigatório para a Vercel ler o seu app como Serverless Function
export default app;