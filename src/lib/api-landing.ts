/**
 * Integração da Landing Page com o Supabase / Painel de Gestão Romanelli
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
 * Gera um protocolo único no padrão ROM-XXXXXX
 */
export function gerarProtocoloChamado(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `ROM-${randomDigits}`;
}

/**
 * Salva um novo orçamento/lead no banco de dados Supabase e em cache de contingência
 */
export async function salvarNovoLead(dados: NovoLeadPayload): Promise<ResultadoOperacao> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aucbnksrhgzpsvpdcvji.supabase.co';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Y2Jua3NyaGd6cHN2cGRjdmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MzAzMTAsImV4cCI6MjEwNjEwNjMxMH0.ysMEfpERwshllLvbAsVqe11M5vbIHloo5pncEGY9-jU';

  // Sanitização do WhatsApp (apenas dígitos numéricos)
  const cleanPhone = (dados.whatsapp || '').replace(/\D/g, '');

  // Garante a existência do Protocolo / ID do chamado
  const protocoloGerado = dados.protocolo || dados.id_chamado || gerarProtocoloChamado();
  const idTenant = dados.id_tenant || 'romanelli-default';

  const payload = {
    protocolo: protocoloGerado,
    id_chamado: protocoloGerado,
    id_tenant: idTenant,
    nome: dados.nome.trim(),
    whatsapp: cleanPhone,
    email: dados.email?.trim() || null,
    servico_tipo: dados.servico_tipo || 'Residencial',
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
    responsavel_atendimento: dados.responsavel_atendimento || 'Atendimento Geral',
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

  // 2. Se as credenciais do Supabase estiverem configuradas, envia via REST direto
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/orcamentos_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Romanelli CRM] Erro na resposta Supabase:', response.status, errorText);
        return {
          sucesso: true, // Não bloqueia o usuário; protocolo foi gerado e salvo no backup local
          mensagem: `Registrado localmente (Aviso Supabase: ${response.status})`,
          protocolo: protocoloGerado,
          id: protocoloGerado
        };
      }

      const resData = await response.json();
      const novoId = Array.isArray(resData) && resData[0] ? (resData[0].id || protocoloGerado) : protocoloGerado;

      return {
        sucesso: true,
        mensagem: 'Orçamento cadastrado com sucesso no sistema!',
        id: String(novoId),
        protocolo: protocoloGerado,
        dados: resData
      };
    } catch (netErr: any) {
      console.error('[Romanelli CRM] Falha de conexão com Supabase:', netErr);
      return {
        sucesso: true, // Gravado no backup local com protocolo
        mensagem: 'Salvo em contingência local devido a falha de conexão.',
        protocolo: protocoloGerado,
        id: protocoloGerado
      };
    }
  }

  return {
    sucesso: true,
    mensagem: 'Lead registrado em modo local.',
    protocolo: protocoloGerado,
    id: protocoloGerado
  };
}

// Alias para compatibilidade
export const submeterLeadRest = salvarNovoLead;
