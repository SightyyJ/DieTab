require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/diet', async (req, res) => {
  const { peso, talla, edad, enfermedad } = req.body;
  try {
    const prompt = `Genera una dieta personalizada detallada para una persona con los siguientes datos:
- Peso: ${peso} kg
- Talla: ${talla} cm
- Edad: ${edad} años
- Enfermedad crónica: ${enfermedad}

Incluye desayuno, comida, cena y snacks, así como recomendaciones específicas.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    const dieta = response.data.choices[0].message.content;
    res.json({ dieta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando dieta' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});