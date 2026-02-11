import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔗 URL do webhook do GoHighLevel
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/CazZz5eUM1VhCuKcq5sT/webhook-trigger/78cfc83e-e186-49bf-900e-1a0376336b12';

app.post('/', async (req, res) => {
  try {
    console.log('📥 Lead recebido do GreatPages:');
    console.log(req.body);

    // 🔄 Mapeamento básico (ajustável)
    const payload = {
      first_name: req.body.name || req.body.nome || '',
      email: req.body.email || '',
      phone: req.body.phone || req.body.telefone || '',
      source: 'GreatPages'
    };

    // 🚀 Envia para o GHL
    await axios.post(GHL_WEBHOOK_URL, payload);

    console.log('✅ Lead enviado para o GoHighLevel');

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Erro ao enviar para o GHL:', error.message);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
