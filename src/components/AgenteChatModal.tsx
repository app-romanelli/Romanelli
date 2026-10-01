import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  MessageSquare, 
  Truck, 
  ArrowRight, 
  Phone,
  Copy,
  Check,
  CheckCircle2
} from 'lucide-react';

import davizinhoAvatar from '../assets/images/davizinho_avatar_1790736838907.jpg';

interface AgenteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLeadData?: (data: any) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  triageData?: any;
}

export const AgenteChatModal: React.FC<AgenteChatModalProps> = ({ isOpen, onClose, onSelectLeadData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou o **Davizinho**, consultor virtual da **Romanelli Mudanças**. 🚚👨🏻‍💼\n\nEstou aqui para tirar suas dúvidas, simular orçamentos e organizar a triagem da sua mudança ou pintura.\n\nPara começarmos, qual o **tipo de serviço** você precisa e de **qual cidade para qual cidade** será o transporte?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const userText = textToSend || input.trim();
    if (!userText || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const historicoConversa = [...messages, userMessage].map(m => ({
        papel: m.role === 'user' ? 'usuario' : 'agente',
        mensagem: m.content
      }));

      const historyPayload = [...messages, userMessage].map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }));

      const TARGET_API_URL = "https://ais-pre-7bgvptte2p4vfmxfmseqts-873734549704.us-east1.run.app/api/agente-orcamento";
      const LOCAL_API_URL = "/api/agente-orcamento";

      const payload = {
        mensagemUsuario: userText,
        historicoConversa,
        messages: historyPayload,
        orcamentoAtual: {}
      };

      let res: Response;
      let data: any;

      try {
        // 1. Tenta chamar diretamente a URL do Backend solicitado
        res = await fetch(TARGET_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && (contentType.includes('application/json') || contentType.includes('text/json'))) {
          data = await res.json();
        } else {
          const rawText = await res.text();
          if (rawText.trim().startsWith('{')) {
            data = JSON.parse(rawText);
          } else {
            throw new Error('Resposta não-JSON do backend externo');
          }
        }
      } catch (directErr) {
        console.warn("Chamada direta ao backend externo não respondeu JSON, utilizando rota /api/agente-orcamento:", directErr);
        res = await fetch(LOCAL_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        data = await res.json();
      }

      if (!data || data.error) {
        throw new Error(data?.error || 'Erro na API');
      }

      let replyContent = data.respostaTexto || data.reply || data.resposta || data.message || '';
      let triageExtracted: any = data.dadosCamposFormularil || data.dadosCamposFormulario || data.triageData || null;

      // Check if response contains a JSON block for triage_complete
      const jsonMatch = replyContent.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed.type === 'triage_complete' && parsed.data) {
            triageExtracted = parsed.data;
          }
        } catch (e) {
          console.error("Erro ao analisar JSON de triagem:", e);
        }
        // Remove the JSON block from visible text for clean rendering
        replyContent = replyContent.replace(/```json\s*[\s\S]*?\s*```/g, '').trim();
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        triageData: triageExtracted
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Erro ao conversar com Agente IA:", err);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Ops, tive um problema de conexão temporário. Você também pode chamar nossa equipe diretamente pelo **WhatsApp (35) 99117-5646**!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Conversa reiniciada! 🚚\n\nComo posso ajudar você agora com sua mudança ou orçamento?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleOpenWhatsAppFromTriage = (tData: any) => {
    const text = `Olá Romanelli Mudanças! Fiz a triagem com o Agente de IA no site:\n\n` +
      `🚚 *Serviço:* ${tData.serviceType || 'Mudança'}\n` +
      `📍 *Origem:* ${tData.origin || 'A combinar'}\n` +
      `🏁 *Destino:* ${tData.destination || 'A combinar'}\n` +
      `🏡 *Porte/Imóvel:* ${tData.propertyType || tData.moveSize || 'Padrão'}\n` +
      `📅 *Data:* ${tData.movingDate || 'A combinar'}\n` +
      `👤 *Cliente:* ${tData.name || 'Cliente Site'} (${tData.phone || 'WhatsApp'})\n\n` +
      `Gostaria de prosseguir com o orçamento!`;

    window.open(`https://api.whatsapp.com/send?phone=5535991175646&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[90vh] max-h-[750px] shadow-2xl flex flex-col overflow-hidden border border-blue-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#004DD1] via-[#003CA3] to-[#002B7A] text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={davizinhoAvatar} 
                alt="Davizinho" 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border-2 border-white/40 shadow-md" 
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#004DD1] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-white">
                  Davizinho
                </h3>
                <span className="bg-blue-400/30 text-blue-100 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-300/30">
                  Consultor Virtual
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>Atendente de IA Romanelli • On-line</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleResetChat}
              className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Reiniciar conversa"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Prompts Carousel (Shown if message count is low) */}
        {messages.length <= 2 && (
          <div className="bg-blue-50/80 border-b border-blue-100 p-2.5 sm:p-3 overflow-x-auto no-scrollbar shrink-0 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase text-[#004DD1] shrink-0 pl-1">
              Sugestões:
            </span>
            {[
              "🚚 Fazer orçamento residencial",
              "🏢 Mudança comercial/escritório",
              "🎨 Como funciona a pintura interna?",
              "📦 Vocês vendem/fornecem caixas?",
              "📍 Cidades atendidas no Sul de Minas"
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-white hover:bg-blue-100/60 border border-blue-200 text-[#004DD1] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-105 cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gray-50/60">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                {isUser ? (
                  <div className="w-8 h-8 rounded-xl bg-[#004DD1] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                ) : (
                  <img 
                    src={davizinhoAvatar} 
                    alt="Davizinho" 
                    className="w-8 h-8 rounded-xl object-cover shrink-0 shadow-sm border border-blue-200" 
                  />
                )}

                {/* Content Bubble */}
                <div className="space-y-2">
                  <div className={`rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser 
                      ? 'bg-[#004DD1] text-white rounded-tr-xs' 
                      : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs'
                  }`}>
                    {/* Render message with line breaks & basic markdown highlights */}
                    <div className="whitespace-pre-wrap space-y-1">
                      {msg.content.split('\n').map((line, lIdx) => {
                        // Bold highlights formatting
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={lIdx}>
                            {parts.map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className={isUser ? 'text-white font-extrabold' : 'text-[#004DD1] font-bold'}>
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    <div className={`text-[10px] mt-2 flex items-center justify-between gap-2 ${
                      isUser ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.id, msg.content)}
                          className="hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copiar texto"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Render Triage Data Box if generated */}
                  {msg.triageData && (
                    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-500/80 rounded-2xl p-4 shadow-md space-y-3 animate-fadeIn">
                      <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Triagem Finalizada pelo Agente</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 bg-white/80 p-3 rounded-xl border border-emerald-100 font-medium">
                        <div>
                          <span className="text-gray-400 text-[10px] block uppercase">Serviço:</span>
                          <strong className="text-gray-900">{msg.triageData.serviceType || 'Mudança'}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 text-[10px] block uppercase">Porte:</span>
                          <strong className="text-gray-900">{msg.triageData.propertyType || msg.triageData.moveSize || 'Padrão'}</strong>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400 text-[10px] block uppercase">Rota:</span>
                          <strong className="text-gray-900">{msg.triageData.origin} ➔ {msg.triageData.destination}</strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenWhatsAppFromTriage(msg.triageData)}
                        className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-black text-xs shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        <span>Enviar Triagem Direto no WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Typing Indicator */}
          {loading && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-[#003CA3] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4 text-blue-200" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center gap-2 text-xs font-semibold text-gray-500">
                <span className="w-2 h-2 rounded-full bg-[#004DD1] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#004DD1] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#004DD1] animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-gray-400">Analisando sua solicitação...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Modal Input Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem ou dúvida sobre a mudança..."
              disabled={loading}
              className="flex-1 bg-gray-100 border border-gray-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004DD1] focus:bg-white transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-[#004DD1] hover:bg-[#003CA3] disabled:opacity-50 text-white p-3 sm:px-5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <span className="hidden sm:inline">Enviar</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 px-1 font-medium">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              IA Treinada para a Romanelli Mudanças
            </span>
            <a
              href="tel:+5535991175646"
              className="text-[#004DD1] hover:underline font-bold flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> (35) 99117-5646
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
