import express from "express";

const app = express();
app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.send("Webhook GreatPages + GHL rodando 🚀");
});

// webhook que o GreatPages vai chamar
app.post("/lead", (req, res) => {
  console.log("Lead recebido:", req.body);

  // aqui depois vamos enviar pro GHL
  res.status(200).json({ success: true });
});

// porta obrigatória do Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
