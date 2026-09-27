/**
 * Integração da Landing Page com o Supabase & Webhook do Painel de Gestão Romanelli
 * Interceptador com geração de ID de Chamado / Protocolo Tenant
 */

export interface NovoLeadPayload {
  // Identificadores de Chamado / Tenant
  protocolo?: string;
  id_chamado?: string;
  id_tenant?: string;

  // Dados do Cliente
  nome: string;
  whatsapp: string;
  email?: string;

  // Logística e Serviço
  servico_tipo?: string;
  origem_endereco?: string;
  origem_numero?: string;
  origem_cep?: string;
  origem_cidade?: string;
  origem_uf?: string;
  origem_tipo_imovel?: string;
  origem_tem_elevador?: boolean;
  origem_andar?: number;
  destino_endereco?: string;
  destino_numero?: string;
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
  mensagem: string;
  id?: string;
  protocolo?: string;
  dados?: any;
}

/**
 * URL Oficial do Webhook do Painel de Gestão Romanelli
 */
export const WEBHOOK_URL_PAINEL = 
  import.meta.env.VITE_WEBHOOK_URL || 
  'https://ais-dev-7bgvptte2p4vfmxfmseqts-873734549704.us-east1.run.app/api/webhook/romanelli-hook-5hg9oiad';

/**
 * Gera um protocolo único no padrão ROM-XXXXXX
 */
export function gerarProtocoloChamado(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `ROM-${randomDigits}`;
}

/**
 * Intercepta e salva o lead disparando diretamente para o Webhook do Painel de Gestão + Supabase
 */
export async function salvarNovoLead(dados: NovoLeadPayload): Promise<ResultadoOperacao> {
  const cleanPhone = (dados.whatsapp || '').replace(/\D/g, '');
  const protocoloGerado = dados.protocolo || dados.id_chamado || gerarProtocoloChamado();
  const idTenant = dados.id_tenant || 'romanelli-pouso-alegre';

  const payload = {
    protocolo: protocoloGerado,
    id_chamado: protocoloGerado,
    id_tenant: idTenant,
    tenant_id: idTenant,
    nome: dados.nome.trim(),
    whatsapp: cleanPhone,
    telefone: cleanPhone,
    email: dados.email?.trim() || null,
    servico_tipo: dados.servico_tipo || 'Residencial',
    tipo_servico: dados.servico_tipo || 'Residencial',
    origem_endereco: dados.origem_endereco || null,
    origem_numero: dados.origem_numero || null,
    origem_cep: dados.origem_cep || null,
    origem_cidade: dados.origem_cidade || 'Pouso Alegre',
    origem_uf: dados.origem_uf || 'MG',
    origem_tipo_imovel: dados.origem_tipo_imovel || 'casa',
    origem_tem_elevador: dados.origem_tem_elevador ?? false,
    origem_andar: dados.origem_andar ?? 0,
    destino_endereco: dados.destino_endereco || null,
    destino_numero: dados.destino_numero || null,
    destino_cep: dados.destino_cep || null,
    destino_cidade: dados.destino_cidade || null,
    destino_uf: dados.destino_uf || 'MG',
    destino_tipo_imovel: dados.destino_tipo_imovel || 'casa',
    destino_tem_elevador: dados.destino_tem_elevador ?? false,
    destino_andar: dados.destino_andar ?? 0,
    data_prevista: dados.data_prevista || null,
    precisa_embalagem: dados.precisa_embalagem ?? false,
    precisa_desmontagem: dados.precisa_desmontagem ?? false,
    observacoes: dados.observacoes || null,
    valor_estimado: dados.valor_estimado || 0,
    status: dados.status || 'novo',
    responsavel_atendimento: dados.responsavel_atendimento || 'Davi Romanelli',
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

  // 2. Disparo Direto para o Webhook do Painel de Gestão (Hook Principal)
  let webhookSucesso = false;
  if (WEBHOOK_URL_PAINEL) {
    try {
      console.log('[Romanelli CRM] Enviando lead para o Webhook do Painel:', WEBHOOK_URL_PAINEL);
      const resHook = await fetch(WEBHOOK_URL_PAINEL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (resHook.ok) {
        console.log('[Romanelli CRM] Webhook acionado com sucesso!');
        webhookSucesso = true;
      } else {
        const errText = await resHook.text();
        console.warn('[Romanelli CRM] Webhook respondeu status:', resHook.status, errText);
      }
    } catch (hookErr) {
      console.warn('[Romanelli CRM] Falha ao disparar webhook:', hookErr);
    }
  }

  // 3. Gravação em Paralelo no Supabase (se configurado)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aucbnksrhgzpsvpdcvji.supabase.co';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Y2Jua3NyaGd6cHN2cGRjdmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MzAzMTAsImV4cCI6MjEwNjEwNjMxMH0.ysMEfpERwshllLvbAsVqe11M5vbIHloo5pncEGY9-jU';

  if (supabaseUrl && supabaseAnonKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/orcamentos_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });
    } catch (sbErr) {
      console.warn('[Romanelli CRM] Supabase fallback warning:', sbErr);
    }
  }

  return {
    sucesso: true,
    mensagem: webhookSucesso 
      ? 'Chamado enviado com sucesso ao Painel de Gestão!' 
      : 'Chamado registrado com sucesso!',
    protocolo: protocoloGerado,
    id: protocoloGerado
  };
}

// Alias para compatibilidade
export const submeterLeadRest = salvarNovoLead;
