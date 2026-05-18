import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Initialize Gemini API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.static(__dirname));

app.post('/api/ai-consult', async (req, res) => {
  try {
    const { question, lang } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ answer: "AI service is not configured. Please set the GEMINI_API_KEY." });
    }

    const systemPrompt = lang === 'ne' 
      ? "तपाईं एक विशेषज्ञ वैदिक ज्योतिषी हुनुहुन्छ। नेपालीमा छोटो र सटिक उत्तर दिनुहोस्। यदि कसैले 'hi' वा साधारण अभिवादन गर्छ भने, तुरुन्तै अभिवादन गर्नुहोस् र ज्योतिषीय परामर्शको लागि तयार हुनुहुन्छ भन्नुहोस्। सधैं ज्योतिषीय ज्ञानको आधारमा सहयोग गर्नुहोस्। अन्तमा सानो disclaimer: 'AI ले कहिलेकाहीँ गल्ती गर्न सक्छ' थप्नुहोस्।"
      : "You are an expert Vedic Astrologer. Provide concise and accurate responses. If someone says 'hi' or a simple greeting, respond immediately and offer your astrological help. Always base advice on astrological principles. End with a short disclaimer: 'AI can make mistakes'.";

    const model = ai.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: systemPrompt
    });

    const result = await model.generateContentStream(question);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    
    res.end();
  } catch (error) {
    console.error("AI Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ answer: "Sorry, the stars are cloudy right now. Please try again later." });
    } else {
      res.end();
    }
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

