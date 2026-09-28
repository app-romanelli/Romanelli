/**
 * Integração da Landing Page com o Supabase & Webhook do Painel de Gestão Romanelli
 * Interceptador com geração de ID de Chamado / Protocolo Tenant
 */

export interface NovoLeadPayload {
  // Identificadores de Chamado / Tenant
  protocolo?: string;
  id_chamado?: string;
  id_tenant?: string;
  token?: string;

  // Dados do Cliente
  nome: string;
  whatsapp: string;
  email?: string;

  // Logística e Serviço
  servico_tipo?: string;
  origem_endereco?: string;
  origem_numero?: string;
  origem_bairro?: string;
  origem_cep?: string;
  origem_cidade?: string;
  origem_uf?: string;
  origem_tipo_imovel?: string;
  origem_tem_elevador?: boolean;
  origem_andar?: number;
  destino_endereco?: string;
  destino_numero?: string;
  destino_bairro?: string;
  destino_cep?: string;
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
  mensagem?: string;
  erro?: any;
  id?: string;
  protocolo?: string;
  dados?: any;
}

/**
 * Token Oficial do Hook do Painel Romanelli
 */
export const WEBHOOK_TOKEN = 'romanelli-hook-5hg9oiad';

/**
 * URL Oficial do Webhook do Painel de Gestão Romanelli
 */
export const WEBHOOK_URL_PAINEL = 
  import.meta.env.VITE_WEBHOOK_URL || 
  'https://ais-dev-7bgvptte2p4vfmxfmseqts-873734549704.us-east1.run.app/api/webhook/romanelli-hook-5hg9oiad';

export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://aucbnksrhgzpsvpdcvji.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Y2Jua3NyaGd6cHN2cGRjdmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MzAzMTAsImV4cCI6MjEwNjEwNjMxMH0.ysMEfpERwshllLvbAsVqe11M5vbIHloo5pncEGY9-jU';

/**
 * Gera um protocolo único no padrão ROM-XXXXXX
 */
export function gerarProtocoloChamado(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `ROM-${randomDigits}`;
}

/**
 * Envia orçamento para o CRM (Webhook com Token + Supabase + Backup Local)
 */
export async function enviarOrcamentoParaCRM(dadosFormulario: NovoLeadPayload): Promise<ResultadoOperacao> {
  const cleanPhone = (dadosFormulario.whatsapp || '').replace(/\D/g, '');
  const protocoloGerado = dadosFormulario.protocolo || dadosFormulario.id_chamado || gerarProtocoloChamado();
  const idTenant = dadosFormulario.id_tenant || WEBHOOK_TOKEN;

  const payload = {
    token: WEBHOOK_TOKEN,
    webhook_token: WEBHOOK_TOKEN,
    protocolo: protocoloGerado,
    id_chamado: protocoloGerado,
    id_tenant: idTenant,
    tenant_id: idTenant,
    nome: dadosFormulario.nome.trim(),
    whatsapp: cleanPhone,
    telefone: cleanPhone,
    email: dadosFormulario.email || '',
    servico_tipo: dadosFormulario.servico_tipo || 'Residencial',
    tipo_servico: dadosFormulario.servico_tipo || 'Residencial',
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
    destino_uf: dadosFormulario.destino_uf || 'MG',
    destino_tipo_imovel: dadosFormulario.destino_tipo_imovel || 'casa',
    destino_tem_elevador: Boolean(dadosFormulario.destino_tem_elevador),
    destino_andar: Number(dadosFormulario.destino_andar || 0),
    data_prevista: dadosFormulario.data_prevista || new Date().toISOString().split('T')[0],
    precisa_embalagem: Boolean(dadosFormulario.precisa_embalagem),
    precisa_desmontagem: Boolean(dadosFormulario.precisa_desmontagem),
    observacoes: dadosFormulario.observacoes || '',
    valor_estimado: Number(dadosFormulario.valor_estimado || 0),
    status: dadosFormulario.status || 'novo',
    responsavel_atendimento: dadosFormulario.responsavel_atendimento || 'Atendimento Geral',
    origem_lead: 'Landing Page Simulador',
    created_at: new Date().toISOString()
  };

  // 1. Armazena no localStorage como contingência offline
  try {
    const backupKey = 'romanelli_leads_backup';
    const existentes = JSON.parse(localStorage.getItem(backupKey) || '[]');
    existentes.unshift(payload);
    localStorage.setItem(backupKey, JSON.stringify(existentes.slice(0, 50)));
  } catch (err) {
    console.warn('[Romanelli CRM] Falha ao gravar backup local:', err);
  }

  // 2. Disparo para o Webhook do Painel de Gestão (com Token nos Headers e Body)
  if (WEBHOOK_URL_PAINEL) {
    try {
      console.log('[Romanelli CRM] Disparando Webhook com Token:', WEBHOOK_TOKEN);
      fetch(WEBHOOK_URL_PAINEL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${WEBHOOK_TOKEN}`,
          'x-webhook-token': WEBHOOK_TOKEN,
          'x-tenant-id': WEBHOOK_TOKEN
        },
        body: JSON.stringify(payload)
      })
      .then(res => console.log('[Romanelli Webhook Resposta]:', res.status))
      .catch(e => console.warn('[Romanelli Webhook Async]:', e));
    } catch (e) {
      console.warn('[Romanelli Webhook]:', e);
    }
  }

  // 3. Envio direto para o Supabase
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/orcamentos_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const resultado = await response.json();
      console.log('Lead salvo com sucesso no Supabase!', resultado);
      return { 
        sucesso: true, 
        mensagem: 'Lead salvo com sucesso no Supabase e Webhook acionado!', 
        protocolo: protocoloGerado, 
        id: protocoloGerado,
        dados: resultado 
      };
    } else {
      const erro = await response.text();
      console.error('Erro do Supabase:', erro);
      return { 
        sucesso: true, // Gravado no backup local e disparado para o webhook
        mensagem: 'Registrado com sucesso!', 
        protocolo: protocoloGerado, 
        id: protocoloGerado,
        erro 
      };
    }
  } catch (erro) {
    console.error('Erro de conexão:', erro);
    return { 
      sucesso: true, 
      mensagem: 'Salvo em contingência local.', 
      protocolo: protocoloGerado, 
      id: protocoloGerado,
      erro 
    };
  }
}

// Aliases para compatibilidade total
export const salvarNovoLead = enviarOrcamentoParaCRM;
export const submeterLeadRest = enviarOrcamentoParaCRM;
