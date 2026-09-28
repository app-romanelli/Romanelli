/**
 * Integração da Landing Page com o Supabase & Painel de Gestão Romanelli
 */

export interface NovoLeadPayload {
  protocolo?: string;
  id_chamado?: string;
  id_tenant?: string;
  nome: string;
  whatsapp: string;
  email?: string;
  servico_tipo?: string;
  origem_endereco?: string;
  origem_cep?: string;
  origem_numero?: string;
  origem_bairro?: string;
  origem_cidade?: string;
  origem_uf?: string;
  origem_tipo_imovel?: string;
  origem_tem_elevador?: boolean;
  origem_andar?: number;
  destino_endereco?: string;
  destino_cep?: string;
  destino_numero?: string;
  destino_bairro?: string;
  destino_cidade?: string;
  destino_uf?: string;
  destino_tipo_imovel?: string;
  destino_tem_elevador?: boolean;
  destino_andar?: number;
  data_prevista?: string;
  precisa_embalagem?: boolean;
  precisa_desmontagem?: boolean;
  observacoes?: string;
  valor_estimado?: number;
  status?: string;
  responsavel_atendimento?: string;
}

export interface ResultadoOperacao {
  sucesso: boolean;
  dados?: any;
  erro?: any;
  mensagem?: string;
  protocolo?: string;
  id?: string;
}

export const SUPABASE_URL = "https://aucbnksrhgzpsvpdcvji.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Y2Jua3NyaGd6cHN2cGRjdmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MzAzMTAsImV4cCI6MjEwNjEwNjMxMH0.ysMEfpERwshllLvbAsVqe11M5vbIHloo5pncEGY9-jU";

export const WEBHOOK_URL_PAINEL = "https://ais-dev-7bgvptte2p4vfmxfmseqts-873734549704.us-east1.run.app/api/webhook/romanelli-hook-5hg9oiad";

/**
 * Gera um protocolo único no padrão ROM-XXXXXX
 */
export function gerarProtocoloChamado(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `ROM-${randomDigits}`;
}

/**
 * Função oficial de envio de orçamento diretamente para o Supabase
 */
export async function enviarOrcamentoParaSupabase(dadosFormulario: NovoLeadPayload): Promise<ResultadoOperacao> {
  const protocoloGerado = dadosFormulario.protocolo || dadosFormulario.id_chamado || gerarProtocoloChamado();
  const idTenant = dadosFormulario.id_tenant || 'romanelli-pouso-alegre';

  const bodyData = {
    protocolo: protocoloGerado,
    id_chamado: protocoloGerado,
    id_tenant: idTenant,
    nome: dadosFormulario.nome,
    whatsapp: (dadosFormulario.whatsapp || '').replace(/\D/g, ''),
    email: dadosFormulario.email || '',
    servico_tipo: dadosFormulario.servico_tipo || 'Residencial',
    origem_endereco: dadosFormulario.origem_endereco || '',
    origem_cep: dadosFormulario.origem_cep || '',
    origem_numero: dadosFormulario.origem_numero || 'S/N',
    origem_bairro: dadosFormulario.origem_bairro || '',
    origem_cidade: dadosFormulario.origem_cidade || 'Pouso Alegre',
    origem_uf: dadosFormulario.origem_uf || 'MG',
    origem_tipo_imovel: dadosFormulario.origem_tipo_imovel || 'casa',
    origem_tem_elevador: Boolean(dadosFormulario.origem_tem_elevador),
    origem_andar: Number(dadosFormulario.origem_andar || 0),
    destino_endereco: dadosFormulario.destino_endereco || '',
    destino_cep: dadosFormulario.destino_cep || '',
    destino_numero: dadosFormulario.destino_numero || 'S/N',
    destino_bairro: dadosFormulario.destino_bairro || '',
    destino_cidade: dadosFormulario.destino_cidade || 'Pouso Alegre',
    destino_uf: dadosFormulario.destino_uf || 'SP',
    destino_tipo_imovel: dadosFormulario.destino_tipo_imovel || 'casa',
    destino_tem_elevador: Boolean(dadosFormulario.destino_tem_elevador),
    destino_andar: Number(dadosFormulario.destino_andar || 0),
    data_prevista: dadosFormulario.data_prevista || new Date().toISOString().split('T')[0],
    precisa_embalagem: Boolean(dadosFormulario.precisa_embalagem),
    precisa_desmontagem: Boolean(dadosFormulario.precisa_desmontagem),
    observacoes: dadosFormulario.observacoes || '',
    valor_estimado: Number(dadosFormulario.valor_estimado || 0),
    status: dadosFormulario.status || 'novo',
    responsavel_atendimento: dadosFormulario.responsavel_atendimento || 'Atendimento Geral'
  };

  // Armazenamento em contingência local
  try {
    const backupKey = 'romanelli_leads_backup';
    const existentes = JSON.parse(localStorage.getItem(backupKey) || '[]');
    existentes.unshift(bodyData);
    localStorage.setItem(backupKey, JSON.stringify(existentes.slice(0, 50)));
  } catch (e) {
    console.warn('[Romanelli CRM Contingência]:', e);
  }

  // Notificação assíncrona ao Webhook do Painel
  try {
    fetch(WEBHOOK_URL_PAINEL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer romanelli-hook-5hg9oiad',
        'x-webhook-token': 'romanelli-hook-5hg9oiad'
      },
      body: JSON.stringify(bodyData)
    }).catch(err => console.warn('[Romanelli Webhook Async Warning]:', err));
  } catch (err) {
    console.warn('[Romanelli Webhook]:', err);
  }

  try {
    const resposta = await fetch(`${SUPABASE_URL}/rest/v1/orcamentos_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(bodyData)
    });

    if (resposta.ok) {
      const resultado = await resposta.json();
      console.log('Sucesso! Lead enviado ao Supabase:', resultado);
      return { 
        sucesso: true, 
        dados: resultado,
        protocolo: protocoloGerado,
        id: protocoloGerado,
        mensagem: 'Orçamento cadastrado com sucesso!'
      };
    } else {
      const erroTexto = await resposta.text();
      console.error('Erro ao salvar no Supabase:', erroTexto);
      return { 
        sucesso: true, // Registrado no backup local e disparado ao webhook para não travar a experiência
        erro: erroTexto,
        protocolo: protocoloGerado,
        id: protocoloGerado,
        mensagem: 'Registrado em contingência.'
      };
    }
  } catch (erro) {
    console.error('Falha de rede:', erro);
    return { 
      sucesso: true, 
      erro,
      protocolo: protocoloGerado,
      id: protocoloGerado,
      mensagem: 'Salvo em contingência local.'
    };
  }
}

// Aliases para compatibilidade total
export const enviarOrcamentoParaCRM = enviarOrcamentoParaSupabase;
export const salvarNovoLead = enviarOrcamentoParaSupabase;
export const submeterLeadRest = enviarOrcamentoParaSupabase;
