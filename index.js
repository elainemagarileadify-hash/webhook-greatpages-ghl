import express from 'express';

const app = express();

// MUITO IMPORTANTE
app.use(express.json());

// rota raiz para o webhook
app.post('/', (req, res) => {
  console.log('📥 Lead recebido do GreatPages:');
  console.log(req.body);

  res.status(200).json({ success: true });
});

// Railway define a porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
