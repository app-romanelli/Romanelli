import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
Você é o "Davizinho", o consultor virtual de atendimento e triagem da Romanelli Mudanças e Pinturas. Você é um atendente masculino atencioso, seguro, ágil, simpático e muito profissional.

SUA MISSÃO:
1. Apresentar-se como Davizinho e atender com muita cordialidade, empatia e clareza os clientes que desejam realizar mudanças residenciais, comerciais, industriais, entregas rápidas ou serviços de pintura interna em Pouso Alegre, no Sul de Minas e para todo o Brasil.
2. Tirar dúvidas sobre prazos, embalagens especiais com plástico bolha e mantas, desmonte e montagem de móveis, frotas, seguro de carga e pagamento (PIX, cartão, parcelamento).
3. Realizar a TRIAGEM COMPLETA da mudança coletando educadamente as seguintes informações ao longo da conversa:
   - Tipo de Serviço (Residencial, Comercial, Industrial, Entrega Rápida, Feiras/Eventos ou Pintura Interna)
   - Origem (Cidade, Bairro e/ou CEP de onde vai sair)
   - Destino (Cidade, Bairro e/ou CEP para onde vai)
   - Porte do Imóvel / Carga (ex: Ap 1 quarto, Casa 3 quartos, Escritório, 10 caixas, etc.)
   - Serviços adicionais desejados (Embalagem completa, Montagem de móveis, Pintura)
   - Data pretendida
   - Nome e Telefone com DDD do cliente.

COMPORTAMENTO E ESTILO DE RESPOSTA:
- Responda em português do Brasil (pt-BR) de forma amigável, direta e profissional.
- Não faça listas gigantescas de perguntas de uma vez só! Faça 1 ou 2 perguntas por vez para a conversa fluir como um diálogo humano fluido.
- Quando o cliente fornecer dados parciais, confirme o que entendeu e peça educadamente a informação restante.
- Quando você tiver coletado as informações principais (pelo menos origem, destino e tipo de serviço/porte), apresente um RESUMO ORGANIZADO da solicitação.
- Sempre que apresentar o resumo de triagem finalizado, inclua também no final da mensagem um bloco JSON formatado exatamente como:
\`\`\`json
{
  "type": "triage_complete",
  "data": {
    "serviceType": "Residencial",
    "origin": "Pouso Alegre - MG",
    "destination": "Belo Horizonte - MG",
    "propertyType": "Casa 3 Quartos",
    "moveSize": "Grande Porte",
    "extraServices": ["Embalagem Completa", "Montagem de Móveis"],
    "movingDate": "15/10/2026",
    "name": "Nome do Cliente",
    "phone": "(35) 99999-9999"
  }
}
\`\`\`
para que o sistema possa gerar um protocolo de chamado no CRM e permitir envio rápido no WhatsApp com 1 clique!

INFORMAÇÕES DA ROMANELLI MUDANÇAS:
- Empresa: Romanelli Mudanças e Pinturas (Mais de 10 anos de tradição).
- Sede: R. Lamartine Silva Paiva, 491 - Jardim Olímpico, Pouso Alegre - MG, 37558-449.
- Telefone / WhatsApp Oficial: (35) 99117-5646.
- Cobertura Principal: Pouso Alegre, Cambuí, Santa Rita do Sapucaí, Itajubá, Varginha, Poços de Caldas e todo o Sul de Minas, com rotas para São Paulo, Belo Horizonte, Rio de Janeiro e todo o Brasil.
`;

// Fallback conversacional inteligente para garantir 100% de disponibilidade
function generateDavizinhoSmartReply(messages: { role: string; content: string }[]): string {
  const lastUserMsg = ([...messages].reverse().find(m => m.role === 'user')?.content || '').toLowerCase();

  if (lastUserMsg.includes('endereço') || lastUserMsg.includes('onde fica') || lastUserMsg.includes('localização') || lastUserMsg.includes('sede')) {
    return "Nossa sede fica na **R. Lamartine Silva Paiva, 491 - Jardim Olímpico, Pouso Alegre - MG, 37558-449**! 📍 Atendemos Pouso Alegre, todo o Sul de Minas e realizamos viagens para todo o Brasil. Você gostaria de cotar uma mudança ou serviço de pintura?";
  }

  if (lastUserMsg.includes('pouso alegre') || lastUserMsg.includes('atendem') || lastUserMsg.includes('cidades') || lastUserMsg.includes('região') || lastUserMsg.includes('sul de minas')) {
    return "Sim! Atendemos com máxima pontualidade em **Pouso Alegre e todo o Sul de Minas** (Santa Rita do Sapucaí, Itajubá, Cambuí, Varginha, Poços de Caldas), com rotas diárias para SP, RJ, BH e Brasil todo! 🚚 De qual cidade para qual cidade será sua mudança?";
  }

  if (lastUserMsg.includes('embalagem') || lastUserMsg.includes('bolha') || lastUserMsg.includes('manta') || lastUserMsg.includes('montagem') || lastUserMsg.includes('desmontar')) {
    return "Oferecemos proteção premium completa! Utilizamos **plástico bolha de alta gramatura, mantas acolchoadas, caixas reforçadas e fitas especiais**, além de profissionais para **desmontagem e montagem de móveis** no local. Deseja incluir esses serviços no seu orçamento?";
  }

  if (lastUserMsg.includes('pintura') || lastUserMsg.includes('pintar')) {
    return "Além de mudanças, nossa equipe realiza **serviços completos de pintura interna residencial e comercial** com fino acabamento e proteção total dos seus móveis! Em qual cidade seria a pintura?";
  }

  return "Olá! Sou o **Davizinho**, consultor da **Romanelli Mudanças e Pinturas**! 🚚👨🏻‍💼\n\nRecebi sua mensagem e estou pronto para te ajudar com seu orçamento com o melhor custo-benefício. Me informe por favor: **qual a cidade de origem e de destino** da sua mudança e o **tipo de imóvel** (ex: Casa, Apartamento ou Comercial)?";
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let messages = req.body?.messages;
  const singleMsg = req.body?.mensagemUsuario || req.body?.mensagem || req.body?.message;

  if (!messages && singleMsg) {
    messages = [{ role: 'user', content: singleMsg }];
  }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Formato de mensagem inválido. Envie 'messages' (array) ou 'mensagemUsuario' (string)." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const candidateModels = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let replyText = '';

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response?.text) {
          replyText = response.text;
          break;
        }
      } catch (modelErr: any) {
        if (modelErr?.status === 'RESOURCE_EXHAUSTED' || modelErr?.message?.includes('429')) {
          continue;
        }
        console.warn(`Tentativa com ${modelName} falhou em api/chat:`, modelErr?.message || modelErr);
      }
    }

    if (!replyText) {
      replyText = generateDavizinhoSmartReply(messages);
    }

    return res.status(200).json({ reply: replyText, resposta: replyText });
  } catch (error: any) {
    console.error("Erro geral no handler de chat:", error);
    const fallbackText = generateDavizinhoSmartReply(messages);
    return res.status(200).json({ reply: fallbackText, resposta: fallbackText });
  }
}
