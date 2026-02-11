import express from 'express';

const app = express();

// aceita JSON
app.use(express.json());

// aceita formulário (GreatPages usa muito isso)
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log('📥 Lead recebido do GreatPages:');
  console.log(req.body);

  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
