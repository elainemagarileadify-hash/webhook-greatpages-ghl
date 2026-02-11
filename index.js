import express from "express";
import axios from "axios";

const app = express();

/**
 * 🔑 Aceita JSON, form-data e urlencoded (GreatPages)
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fallback para body vazio (caso extremo)
app.use((req, res, next) => {
  if (req.method === "POST" && (!req.body || Object.keys(req.body).length === 0)) {
    let rawData = "";
    req.on("data", chunk => {
      rawData += chunk;
    });
    req.on("end", () => {
      try {
        req.body = rawData ? JSON.parse(rawData) : {};
      } catch {
        req.body = Object.fromEntries(new URLSearchParams(rawData));
      }
      next();
    });
  } else {
    next();
  }
});

/**
 * 🚀 Webhook principal
 */
app.post("/", async (req, res) => {
  try {
    console.log("📥 Lead recebido do GreatPages:", JSON.stringify(req.body, null, 2));

    // 🔍 Mapeamento definitivo (baseado no seu log real)
    const first_name =
      req.body.Nome ||
      req.body.nome ||
      req.body.name ||
      "";

    const email =
      req.body.E_mail ||
      req.body.Email ||
      req.body.email ||
      "";

    const phone =
      req.body.WhatsApp ||
      req.body.whatsapp ||
      req.body.Telefone ||
      req.body.telefone ||
      req.body.phone ||
      "";

    const payloadGHL = {
      first_name,
      email,
      phone,
      source: "GreatPages"
    };

    console.log("📤 Payload enviado ao GHL:", payloadGHL);

    // 🔥 URL do Webhook do GoHighLevel (JÁ CONFIGURADA)
    const ghlWebhookUrl =
      "https://services.leadconnectorhq.com/hooks/CazZz5eUM1VhCuKcq5sT/webhook-trigger/137dd3d9-798d-4f02-bb37-506955b629f5";

    await axios.post(ghlWebhookUrl, payloadGHL, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("✅ Lead enviado para o GoHighLevel com sucesso");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "❌ Erro ao processar o lead:",
      error.response?.data || error.message
    );
    res.status(500).json({ success: false });
  }
});

/**
 * 🌐 Porta padrão do Railway
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
