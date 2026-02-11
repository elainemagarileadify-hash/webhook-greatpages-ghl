import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    console.log("📥 Lead recebido do GreatPages:", JSON.stringify(req.body, null, 2));

    // Captura inteligente dos dados (cobre todos os padrões do GreatPages)
    const first_name =
      req.body.name ||
      req.body.nome ||
      req.body.first_name ||
      req.body.lead?.name ||
      req.body.lead?.nome ||
      "";

    const email =
      req.body.email ||
      req.body.lead?.email ||
      "";

    const phone =
      req.body.phone ||
      req.body.telefone ||
      req.body.lead?.phone ||
      req.body.lead?.telefone ||
      "";

    const payloadGHL = {
      first_name,
      email,
      phone,
      source: "GreatPages"
    };

    console.log("📤 Payload enviado ao GHL:", payloadGHL);

    // 🔥 COLE A URL DO WEBHOOK DO GHL AQUI
    const ghlWebhookUrl =
      "https://services.leadconnectorhq.com/hooks/CazZz5eUM1VhCuKcq5sT/webhook-trigger/137dd3d9-798d-4f02-bb37-506955b629f5";

    await axios.post(ghlWebhookUrl, payloadGHL, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("✅ Lead enviado para o GoHighLevel com sucesso");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "❌ Erro ao enviar para o GHL:",
      error.response?.data || error.message
    );
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
