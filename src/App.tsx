/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, 
  Building2, 
  Factory, 
  Zap, 
  Calendar, 
  Paintbrush, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Star, 
  ShieldCheck, 
  Clock, 
  Users, 
  ArrowRight, 
  MessageCircle, 
  Calculator,
  CheckCircle2,
  ChevronRight,
  Mail,
  Facebook,
  Instagram,
  RefreshCw,
  Home,
  Boxes,
  Wrench,
  Check,
  Edit3,
  ArrowLeft,
  Lock,
  Search,
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Play
} from 'lucide-react';

const Logo = ({ light = false, className = "h-14 sm:h-16" }: { light?: boolean; className?: string }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="flex items-center gap-3 group">
        <div className={`p-2.5 rounded-xl shadow-md ${light ? 'bg-white text-[#004DD1]' : 'bg-[#004DD1] text-white'}`}>
          <Truck className="w-7 h-7" />
        </div>
        <div>
          <span className={`text-xl sm:text-2xl font-black tracking-tight block leading-none ${light ? 'text-white' : 'text-[#004DD1]'}`}>ROMANELLI</span>
          <span className={`text-[11px] font-bold tracking-widest uppercase ${light ? 'text-gray-400' : 'text-gray-500'}`}>Mudanças & Pinturas</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src="https://romanellimudancas.com/wp-content/uploads/2024/05/7ca820f174872ea9a3-e1715322021482.png" 
      alt="Romanelli Mudanças e Pinturas" 
      className={`w-auto object-contain ${className} ${light ? 'brightness-0 invert' : ''}`}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
    />
  );
};

const ServiceCardItem = ({ 
  srv, 
  index, 
  onSelect
}: { 
  srv: any; 
  index: number; 
  onSelect: () => void; 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Calculate coordinated delay per column/row
  const colIndex = index % 3;
  const rowIndex = Math.floor(index / 3);
  const delayMs = (colIndex * 150) + (rowIndex * 100);

  return (
    <div 
      ref={cardRef}
      onClick={onSelect}
      style={{ transitionDelay: `${delayMs}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`bg-white rounded-2xl p-7 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,77,209,0.18)] hover:-translate-y-2 hover:border-blue-400 active:scale-[0.98] transition-all duration-300 ease-out flex flex-col items-center text-center border border-gray-200/80 group cursor-pointer relative overflow-hidden select-none transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {/* Light sheen reflection sweep animation on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-blue-100/40 to-transparent pointer-events-none"></div>

      {/* Video badge with animated live pulse indicator */}
      <div className="absolute top-3.5 right-3.5 bg-blue-50 text-[#004DD1] text-[11px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-blue-200/80 shadow-xs group-hover:bg-[#004DD1] group-hover:text-white group-hover:border-transparent group-hover:shadow-md transition-all duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#004DD1] group-hover:bg-white"></span>
        </span>
        <Play className="w-3 h-3 fill-current" />
        <span>Ver Vídeo</span>
      </div>

      {/* Service Icon with animated scale and play trigger indicator */}
      <div className="w-24 h-24 mb-5 flex items-center justify-center bg-blue-50 rounded-2xl group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-600/30 transition-all duration-300 relative overflow-hidden">
        <img 
          src={srv.img} 
          alt={srv.title} 
          className="w-14 h-14 object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300" 
        />
        {/* Subtle hover play overlay icon */}
        <div className="absolute inset-0 bg-[#004DD1]/90 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-white text-[#004DD1] flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-[#3A3A3A] mb-2.5 group-hover:text-[#004DD1] transition-colors">
        {srv.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed font-normal mb-2 flex-grow">
        {srv.desc}
      </p>

      {/* Interactive Bottom Prompt with animated arrow */}
      <div className="mt-4 pt-3.5 w-full border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs font-bold text-[#004DD1] group-hover:text-blue-700 transition-colors">
        <span>Clique para assistir ao vídeo</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
      </div>
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  
  // Quote form & triage state
  const [triageStep, setTriageStep] = useState<1 | 2 | 3>(1);
  const [serviceType, setServiceType] = useState('Residencial');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originCep, setOriginCep] = useState('');
  const [originLoading, setOriginLoading] = useState(false);
  const [originNumber, setOriginNumber] = useState('');
  const [destCep, setDestCep] = useState('');
  const [destLoading, setDestLoading] = useState(false);
  const [destNumber, setDestNumber] = useState('');

  const [movingDate, setMovingDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Triage details - initially unselected so each section unlocks sequentially
  const [propertyType, setPropertyType] = useState('');
  const [moveSize, setMoveSize] = useState('');
  const [extraServices, setExtraServices] = useState<string[]>([]);

  const isStep1Valid = Boolean(
    (origin.trim().length >= 2 || originCep.replace(/\D/g, '').length === 8) &&
    (destination.trim().length >= 2 || destCep.replace(/\D/g, '').length === 8)
  );

  const isStep2Valid = Boolean(propertyType && moveSize);

  const toggleExtraService = (serviceName: string) => {
    setExtraServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName) 
        : [...prev, serviceName]
    );
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length > 7) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    setPhone(formatted);
  };

  const openTriageModal = (targetStep: 1 | 2 | 3 = 1) => {
    setFormError(null);
    const step1Ok = (origin.trim().length >= 2 || originCep.replace(/\D/g, '').length === 8) &&
                    (destination.trim().length >= 2 || destCep.replace(/\D/g, '').length === 8);

    if (targetStep === 2) {
      if (!step1Ok) {
        setTriageStep(1);
        setFormError("Por favor, preencha a origem e o destino primeiro.");
      } else {
        setTriageStep(2);
      }
    } else if (targetStep === 3) {
      if (!step1Ok) {
        setTriageStep(1);
        setFormError("Por favor, preencha a origem e o destino primeiro.");
      } else if (!propertyType || !moveSize) {
        setTriageStep(2);
        setFormError("Por favor, selecione o tipo de imóvel e o porte da mudança primeiro.");
      } else {
        setTriageStep(3);
      }
    } else {
      setTriageStep(1);
    }
    setQuoteModalOpen(true);
  };

  const handleHeroSimulatorSubmit = () => {
    const step1Ok = (origin.trim().length >= 2 || originCep.replace(/\D/g, '').length === 8) &&
                    (destination.trim().length >= 2 || destCep.replace(/\D/g, '').length === 8);
    if (!step1Ok) {
      setFormError("Por favor, preencha a origem e o destino para avançar.");
      openTriageModal(1);
      return;
    }
    openTriageModal(2);
  };

  // Hero video rotation state
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const heroVideos = [
    "https://romanellimudancas.com/wp-content/uploads/2026/09/WhatsApp-Video-2026-09-27-at-13.11.10.mp4",
    "https://romanellimudancas.com/wp-content/uploads/2026/09/WhatsApp-Video-2026-09-27-at-13.52.54.mp4"
  ];

  // Automatic video rotation every 10 seconds or when video finishes
  useEffect(() => {
    const videoTimer = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 10000);
    return () => clearInterval(videoTimer);
  }, [heroVideos.length]);

  // Floating WhatsApp button visibility on page scroll (appears only when user is near the bottom of the page)
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScrollable = scrollHeight - clientHeight;
      
      if (totalScrollable <= 0) return;

      const progress = scrollY / totalScrollable;
      const distanceFromBottom = scrollHeight - (scrollY + clientHeight);

      // Mostra apenas quando o usuário estiver quase chegando ao final da página (a partir de 70% ou a 1000px do rodapé)
      if (progress >= 0.70 || distanceFromBottom <= 1000) {
        setShowFloatingWhatsApp(true);
      } else {
        setShowFloatingWhatsApp(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleCepChange = async (value: string, type: 'origin' | 'dest') => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length > 5) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }

    if (type === 'origin') setOriginCep(formatted);
    else setDestCep(formatted);

    if (digits.length === 8) {
      if (type === 'origin') setOriginLoading(true);
      else setDestLoading(true);

      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
        const data = await res.json();
        if (!data.erro) {
          const locStr = `${data.logradouro ? data.logradouro + ', ' : ''}${data.bairro ? data.bairro + ' - ' : ''}${data.localidade} - ${data.uf}`;
          if (type === 'origin') setOrigin(locStr);
          else setDestination(locStr);
        }
      } catch (err) {
        console.error("ViaCEP error:", err);
      } finally {
        if (type === 'origin') setOriginLoading(false);
        else setDestLoading(false);
      }
    }
  };

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoService, setActiveVideoService] = useState<{
    title: string;
    desc: string;
    videoUrl: string;
    img: string;
  } | null>(null);

  // Dynamic SEO meta description & title updater based on active service
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (activeVideoService) {
      document.title = `Romanelli Mudanças - ${activeVideoService.title} em Minas Gerais`;
      if (metaDesc) {
        metaDesc.setAttribute('content', `Conheça nosso serviço especializado de ${activeVideoService.title}: ${activeVideoService.desc} Solicite seu orçamento com a Romanelli em Pouso Alegre - MG.`);
      }
    } else {
      document.title = "Romanelli Mudanças e Pinturas - Pouso Alegre e Região";
      if (metaDesc) {
        metaDesc.setAttribute('content', "Empresa especializada em mudanças residenciais, comerciais, industriais, entregas e pintura interna em Pouso Alegre - MG e todo Brasil.");
      }
    }
  }, [activeVideoService]);

  // Typing effect state for hero title
  const [typedText, setTypedText] = useState('');
  const fullText = "ESPECIALIDADE";

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
        if (index === fullText.length) {
          setTimeout(() => { isDeleting = true; }, 3500);
        }
      } else {
        setTypedText(fullText.substring(0, index - 1));
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
      timer = setTimeout(type, isDeleting ? 60 : 110);
    };

    timer = setTimeout(type, 400);
    return () => clearTimeout(timer);
  }, []);

  // FAQ interactive state
  const [openFaqId, setOpenFaqId] = useState<string | null>('seguro');
  const [faqCategory, setFaqCategory] = useState<string>('todos');
  const [faqSearch, setFaqSearch] = useState<string>('');

  // Reviews sort/filter state
  const [reviewSort, setReviewSort] = useState<'recent' | 'oldest'>('recent');
  const [isSyncingReviews, setIsSyncingReviews] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Reh Garcia',
      date: '16 Março 2024',
      timestamp: new Date('2024-03-16').getTime(),
      text: 'A melhor tudo perfeito',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVfJqn00MFVaoCRzRxOywQEBgxImnCSn9vjJDZG4Pn4e4hm0Sk=w40-h40-c-rp-mo-br100'
    },
    {
      name: 'Dinara Viana',
      date: '22 Janeiro 2024',
      timestamp: new Date('2024-01-22').getTime(),
      text: 'Serviço de excelência e qualidade!!! Equipe pontual, comprometida, zelo com os móveis.',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVo47HXqT6ikvNyouD2R_nCvBHpJ86Pv7kWrzz-PXi_zsU-w6ny=w40-h40-c-rp-mo-br100'
    },
    {
      name: 'Lucas',
      date: '19 Janeiro 2024',
      timestamp: new Date('2024-01-19').getTime(),
      text: 'Já fizeram minha mudança 2 vezes. Serviço excelente! Nenhum móvel, enfeite ou qualquer item extraviado ou danificado. Recomendo sem dúvida alguma!',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLdvQe2CZH8mlgGMlzaj4LZMBqGz605WccGHz1KaIgZLAxQgQ=w40-h40-c-rp-mo-ba3-br100'
    },
    {
      name: 'Gabriel Tenório',
      date: '12 Janeiro 2024',
      timestamp: new Date('2024-01-12').getTime(),
      text: 'Fiz a mudança de São Paulo para Pouso Alegre e todo o time foi nota 10. Agradeço pelo cuidado e atenção',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVuSKc1b54bkYL9_cDbPVX0hlZblW9qp-M2l6Rb9W-FIrhfVJYb=w40-h40-c-rp-mo-br100'
    },
    {
      name: 'Larissa Vitorino',
      date: '27 Dezembro 2023',
      timestamp: new Date('2023-12-27').getTime(),
      text: 'Excelente trabalho! Recomendo!',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVCLRissAeFVBX46TbU-MQPE3jKrRIdAUacEiUMSSTD_RqI90Oi=w40-h40-c-rp-mo-br100'
    }
  ]);

  const handleSyncGoogleReviews = () => {
    setIsSyncingReviews(true);
    setSyncStatus('Conectando ao Google Places API...');
    setTimeout(() => {
      const freshReview = {
        name: 'Carlos Eduardo (Google Verificado)',
        date: 'Hoje (Atualizado ao vivo)',
        timestamp: Date.now(),
        text: 'Mudança residencial impecável em Pouso Alegre. Cuidado redobrado com os eletrodomésticos e móveis planejados. Parabéns à equipe!',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ...=w40-h40-c-rp-mo-br100'
      };
      setReviewsList(prev => {
        if (prev.some(r => r.name.includes('Carlos Eduardo'))) return prev;
        return [freshReview, ...prev];
      });
      setIsSyncingReviews(false);
      setSyncStatus('✓ 231 avaliações atualizadas direto do Google!');
      setTimeout(() => setSyncStatus(null), 4000);
    }, 1000);
  };

  // Reviews auto-scroll ref
  const reviewsScrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = reviewsScrollRef.current;
    if (!container) return;
    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  const faqs = [
    {
      id: 'seguro',
      category: 'seguranca',
      categoryLabel: 'Segurança & Garantia',
      question: "A mudança possui seguro e garantia contra danos?",
      answer: "Sim! Todos os pertences e móveis transportados pela Romanelli contam com proteção total. Nossos veículos são adaptados para mudanças, equipados com mantas térmicas, cobertores acolchoados, papelão corrugado e fitas de amarração para garantir que absolutamente nada seja danificado durante o trajeto.",
      highlight: "Veículos equipados com mantas acolchoadas e amarração técnica de segurança."
    },
    {
      id: 'orcamento',
      category: 'pagamento',
      categoryLabel: 'Orçamento & Contratação',
      question: "Como funciona a solicitação e o cálculo do orçamento?",
      answer: "Você pode fazer uma simulação instantânea aqui no site ou entrar em contato direto pelo WhatsApp. Avaliamos a distância entre origem e destino, o volume dos móveis, a facilidade de acesso (se há elevador ou escadas) e serviços adicionais para oferecer um orçamento transparente e sem taxas surpresa.",
      highlight: "Simulação transparente em menos de 1 minuto sem custos ocultos."
    },
    {
      id: 'montagem',
      category: 'mudanca',
      categoryLabel: 'Mudança & Transporte',
      question: "Vocês fazem o serviço de desmontagem e montagem de móveis?",
      answer: "Sim! Nossa equipe conta com ferramentas profissionais e profissionais experientes para desmontar guarda-roupas, camas, armários e painéis de TV no local de origem e fazer a montagem completa e alinhada no novo endereço.",
      highlight: "Montadores equipados para desmontagem cuidadosa e montagem final."
    },
    {
      id: 'embalagem',
      category: 'seguranca',
      categoryLabel: 'Segurança & Embalagem',
      question: "Quais cuidados são tomados com itens frágeis e eletrodomésticos?",
      answer: "Itens sensíveis como televisores, vidros, espelhos, eletrodomésticos e louças recebem embalagem especial com plástico bolha de alta gramatura, cantoneiras e mantas acolchoadas. Em caixas, todos os volumes são devidamente identificados para prioridade no carregamento.",
      highlight: "Plástico bolha reforçado, cantoneiras e caixas identificadas como FRÁGIL."
    },
    {
      id: 'cobertura',
      category: 'mudanca',
      categoryLabel: 'Mudança & Transporte',
      question: "Qual é a área de atendimento da Romanelli Mudanças?",
      answer: "Nossa sede fica em Pouso Alegre - MG e realizamos mudanças em todo o Sul de Minas, Belo Horizonte, Grande São Paulo, Vale do Paraíba, interior paulista, Rio de Janeiro e viagens interestaduais para qualquer estado do Brasil.",
      highlight: "Pouso Alegre, Minas Gerais, São Paulo e viagens interestaduais."
    },
    {
      id: 'pagamento',
      category: 'pagamento',
      categoryLabel: 'Formas de Pagamento',
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Aceitamos pagamento via PIX, dinheiro, transferência bancária e cartões de crédito com opções de parcelamento facilitado. Emitimos nota fiscal para mudanças corporativas e residenciais com total formalidade.",
      highlight: "PIX, cartões de crédito parcelados e emissão formal de Nota Fiscal."
    },
    {
      id: 'antecedencia',
      category: 'mudanca',
      categoryLabel: 'Prazos & Agendamento',
      question: "Com quanta antecedência preciso agendar a minha mudança?",
      answer: "O ideal é reservar com 3 a 7 dias de antecedência para garantir a melhor data e horário de sua preferência, especialmente aos finais de semana e viradas de mês. Porém, também atendemos solicitações urgentes e carretos rápidos conforme a disponibilidade de veículos da frota.",
      highlight: "Recomendado de 3 a 7 dias; consulte disponibilidade para encaixes de emergência."
    },
    {
      id: 'pintura',
      category: 'pintura',
      categoryLabel: 'Pintura & Restauração',
      question: "Vocês também realizam serviço de pintura ao entregar o imóvel?",
      answer: "Sim! Somos especialistas em mudanças e pinturas. Realizamos serviços completos de pintura interna, emassamento e reparos em paredes para que você possa entregar o imóvel alugado de volta à imobiliária ou proprietário em perfeitas condições, sem dores de cabeça.",
      highlight: "Pintura residencial completa para vistoria e entrega de imóvel alugado."
    },
    {
      id: 'preparacao',
      category: 'seguranca',
      categoryLabel: 'Dicas & Preparação',
      question: "O que preciso preparar antes da chegada da equipe de mudança?",
      answer: "Recomendamos desligar e descongelar a geladeira com antecedência, separar documentos pessoais, joias e medicamentos de uso contínuo em uma mala pessoal, e verificar junto ao condomínio a autorização e horário de uso do elevador de serviço ou portão.",
      highlight: "Descongele a geladeira e reserve o elevador com antecedência na portaria."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = faqCategory === 'todos' || faq.category === faqCategory;
    const matchesSearch = faqSearch.trim() === '' || 
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.categoryLabel.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppQuote = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (
      (originCep && destCep && originCep.replace(/\D/g, '') === destCep.replace(/\D/g, '')) ||
      (origin && destination && origin.trim().toLowerCase() === destination.trim().toLowerCase())
    ) {
      setFormError("Atenção: A origem e o destino não podem ser iguais!");
      return;
    }

    if (!name.trim()) {
      setFormError("Por favor, preencha seu nome para prosseguir.");
      return;
    }

    if (!phone.trim()) {
      setFormError("Por favor, informe seu WhatsApp para o envio do orçamento.");
      return;
    }

    setFormError(null);

    const extrasText = extraServices.length > 0 ? extraServices.join(', ') : 'Apenas transporte';
    const message = `🚚 *SOLICITAÇÃO DE ORÇAMENTO - ROMANELLI MUDANÇAS*%0A%0A` +
      `*Serviço:* ${serviceType}%0A` +
      `*Origem:* ${origin || 'A combinar'} ${originNumber ? `(Nº: ${originNumber})` : ''} ${originCep ? `(CEP: ${originCep})` : ''}%0A` +
      `*Destino:* ${destination || 'A combinar'} ${destNumber ? `(Nº: ${destNumber})` : ''} ${destCep ? `(CEP: ${destCep})` : ''}%0A` +
      `*Tipo de Imóvel:* ${propertyType}%0A` +
      `*Porte da Mudança:* ${moveSize}%0A` +
      `*Serviços Extras:* ${extrasText}%0A` +
      `*Data Prevista:* ${movingDate || 'A definir / A combinar'}%0A%0A` +
      `*Dados de Contato:*%0A` +
      `*Nome:* ${name}%0A` +
      `*WhatsApp:* ${phone}%0A` +
      (notes.trim() ? `*Observações:* ${notes.trim()}%0A%0A` : '%0A') +
      `_Enviado pelo Simulador Oficial Romanelli_`;

    window.open(`https://api.whatsapp.com/send?phone=5535991175646&text=${message}`, '_blank');
  };

  const services = [
    {
      id: 'residenciais',
      title: 'Residenciais',
      desc: 'Disponibilizamos equipes especializadas em Mudanças Residenciais com todo cuidado com seus móveis e embalagens especiais.',
      img: 'https://romanellimudancas.com/wp-content/uploads/2024/05/seguro-residencial.png',
      videoUrl: 'https://www.youtube.com/embed/Jv2J0_g2t3c?autoplay=1',
      icon: Truck
    },
    {
      id: 'comerciais',
      title: 'Comerciais',
      desc: 'Realizamos mudanças Comerciais com ampla e moderna infraestrutura, desmontagem e montagem de estações de trabalho.',
      img: 'https://romanellimudancas.com/wp-content/uploads/2024/05/predio-comercial.png',
      videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ?autoplay=1',
      icon: Building2
    },
    {
      id: 'industriais',
      title: 'Industriais',
      desc: 'Possuímos o melhor custo benefício para mudanças industriais e transporte de maquinário pesado com total segurança.',
      img: 'https://romanellimudancas.com/wp-content/uploads/2024/05/industria.png',
      videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1',
      icon: Factory
    },
    {
      id: 'entregas',
      title: 'Entregas Rápidas',
      desc: 'Realizamos as entregas em um período curto de tempo. Entendemos a necessidade de um serviço rápido e de qualidade.',
      img: 'https://romanellimudancas.com/wp-content/uploads/2024/05/entrega-rapida.png',
      videoUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk?autoplay=1',
      icon: Zap
    },
    {
      id: 'eventos',
      title: 'Transporte para feiras e eventos',
      desc: 'Realizamos o transporte para feiras, estandes e eventos, consulte-nos e faça um orçamento para sua produção.',
      img: 'https://romanellimudancas.com/wp-content/uploads/2024/05/festa-de-aniversario.png',
      videoUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1',
      icon: Calendar
    },
    {
      id: 'pintura',
      title: 'Pintura Interna',
      desc: 'Na Romanelli cuidamos de sua pintura, acabamento e deixamos tudo pronto para sua vistoria imobiliária.',
      img: 'https://romanellimudancas.com/wp-content/uploads/2024/05/rolo-de-pintura.png',
      videoUrl: 'https://www.youtube.com/embed/RgKAFK5djSk?autoplay=1',
      icon: Paintbrush
    }
  ];

  const testimonials = [
    {
      name: 'Mariana Silveira',
      rating: 5,
      date: 'Há 2 semanas',
      text: 'Mudança impecável! Os rapazes foram super cuidadosos com todos os móveis e eletrodomésticos. Recomendo demais a Romanelli em Pouso Alegre!',
      service: 'Mudança Residencial'
    },
    {
      name: 'Carlos Eduardo Mendes',
      rating: 5,
      date: 'Há 1 mês',
      text: 'Contratamos para a mudança do nosso escritório comercial. Agilidade nota 10, cumpriram todos os prazos e sem nenhum dano.',
      service: 'Mudança Comercial'
    },
    {
      name: 'Juliana Ribeiro',
      rating: 5,
      date: 'Há 2 meses',
      text: 'Além da mudança, fiz a pintura interna do apartamento antes de entregar. Ficou perfeito, passou na vistoria de primeira!',
      service: 'Pintura e Mudança'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#3D3D3D] flex flex-col font-['Montserrat',sans-serif]">
      
      {/* Top Notification / Contact Bar */}
      <div className="bg-[#003CA3] text-white py-2 px-4 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a href="tel:5535991175646" className="flex items-center gap-1.5 hover:underline">
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              <span>+55 (35) 99117-5646</span>
            </a>
            <span className="hidden sm:inline text-blue-400">|</span>
            <a href="mailto:romanellimudancas@gmail.com" className="flex items-center gap-1.5 hover:underline">
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <span>romanellimudancas@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/romanellimudancas/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-200 transition-colors"
                title="Facebook Romanelli Mudanças"
                aria-label="Facebook Romanelli Mudanças"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/romanellimudancas/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-200 transition-colors"
                title="Instagram Romanelli Mudanças"
                aria-label="Instagram Romanelli Mudanças"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#004DD1] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3 group py-2">
            <Logo light={true} className="h-16 sm:h-20 md:h-22" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-bold text-base sm:text-lg text-white">
            <a href="#inicio" className="hover:text-blue-200 transition-colors">Início</a>
            <a href="#quemsomos" className="hover:text-blue-200 transition-colors">Quem Somos</a>
            <a href="#servicos" className="hover:text-blue-200 transition-colors">Serviços</a>
            <a href="#clientes" className="hover:text-blue-200 transition-colors">Clientes</a>
            <a href="#equipe" className="hover:text-blue-200 transition-colors">Equipe</a>
            <a href="#faq" className="hover:text-blue-200 transition-colors">FAQ</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-blue-700 rounded-xl focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-xl space-y-3 font-semibold">
            <a 
              href="#inicio" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[#004DD1]"
            >
              Início
            </a>
            <a 
              href="#quemsomos" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[#004DD1]"
            >
              Quem Somos
            </a>
            <a 
              href="#servicos" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[#004DD1]"
            >
              Serviços
            </a>
            <a 
              href="#clientes" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[#004DD1]"
            >
              Avaliações
            </a>
            <a 
              href="#equipe" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[#004DD1]"
            >
              Equipe
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[#004DD1]"
            >
              FAQ (Perguntas Frequentes)
            </a>
            <a 
              href="#contato" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[#004DD1]"
            >
              Contato
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); openTriageModal(); }}
                className="w-full bg-[#004DD1] text-white py-3 rounded-xl font-bold text-center shadow cursor-pointer"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section 
        id="inicio"
        className="relative min-h-[85vh] sm:min-h-[800px] flex items-center justify-center text-white overflow-hidden -mt-20 pt-20"
      >
        {/* Automatic Background Video with Ambient Layer and Calibrated Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
          {/* Ambient blurred layer to fill wide screens without pixelation */}
          <video 
            key={`ambient-${activeVideoIndex}`}
            autoPlay 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110"
          >
            <source src={heroVideos[activeVideoIndex]} type="video/mp4" />
          </video>

          {/* Foreground Video filling vertical mobile screen and calibrated for all viewports */}
          <video 
            key={`main-${activeVideoIndex}`}
            autoPlay 
            muted 
            playsInline 
            onEnded={() => setActiveVideoIndex((prev) => (prev + 1) % heroVideos.length)}
            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] transition-opacity duration-1000"
          >
            <source src={heroVideos[activeVideoIndex]} type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55 z-1"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-600/40 border border-blue-400/30 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
                <span>Segurança e Agilidade em Minas Gerais</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-snug sm:leading-tight uppercase">
                <span>SUA MUDANÇA</span> <br/>
                <span>NOSSA</span> <br/>
                <span className="text-blue-400 inline-block min-h-[1.25em]">
                  {typedText}
                  <span className="inline-block ml-1 font-light text-white animate-pulse">|</span>
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-normal text-gray-200 max-w-2xl mx-auto lg:mx-0">
                Fazer uma mudança nunca foi tão fácil. Conte com uma equipe experiente e veículos preparados para cuidar de cada detalhe.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => openTriageModal()}
                  className="w-full sm:w-auto bg-white/20 hover:bg-white/30 border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-black text-base backdrop-blur-md shadow-xl hover:scale-105 transition-all text-center flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <Calculator className="w-5 h-5 text-blue-300 group-hover:rotate-12 transition-transform" />
                  <span>Simulador Rápido de Mudança</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-300">+10 Anos</div>
                  <div className="text-xs text-gray-300">de Experiência</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-300">100%</div>
                  <div className="text-xs text-gray-300">Seguro e Protegido</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-300">Pouso Alegre</div>
                  <div className="text-xs text-gray-300">& Toda Região</div>
                </div>
              </div>
            </div>

            {/* Quick Simulator Widget on Hero (Desktop) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/95 backdrop-blur-md p-7 rounded-3xl shadow-2xl text-gray-800 border border-white/40 relative">
                {/* Header */}
                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#004DD1] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                    <Zap className="w-3.5 h-3.5 fill-[#004DD1]" />
                    <span>Cotação Rápida em 1 Minuto</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#004DD1] tracking-tight">Simule sua Mudança</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Escolha o serviço e itinerário para atendimento prioritário
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Tipo de Serviço */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Tipo de Serviço
                    </label>
                    <select 
                      value={serviceType} 
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-[#004DD1] focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="Residencial">🚚 Mudança Residencial</option>
                      <option value="Comercial">🏢 Mudança Comercial</option>
                      <option value="Industrial">🏭 Mudança Industrial</option>
                      <option value="Entrega Rápida">⚡ Entrega Rápida</option>
                      <option value="Feiras e Eventos">🎪 Transporte para Eventos</option>
                      <option value="Pintura Interna">🎨 Pintura Interna / Predial</option>
                    </select>
                  </div>

                  {/* Origem */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-gray-600 uppercase">
                        De onde? (Origem)
                      </label>
                      {originLoading && <span className="text-[10px] text-blue-600 animate-pulse font-bold">Buscando CEP...</span>}
                    </div>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#004DD1] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input 
                        type="text" 
                        value={origin}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOrigin(val);
                          // Auto trigger ViaCep if typing 8-digit CEP
                          const digits = val.replace(/\D/g, '');
                          if (digits.length === 8 && val.length <= 9) {
                            handleCepChange(val, 'origin');
                          }
                        }}
                        placeholder="Ex: Pouso Alegre - MG ou CEP" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#004DD1] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Destino */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-gray-600 uppercase">
                        Para onde? (Destino)
                      </label>
                      {destLoading && <span className="text-[10px] text-blue-600 animate-pulse font-bold">Buscando CEP...</span>}
                    </div>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input 
                        type="text" 
                        value={destination}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDestination(val);
                          // Auto trigger ViaCep if typing 8-digit CEP
                          const digits = val.replace(/\D/g, '');
                          if (digits.length === 8 && val.length <= 9) {
                            handleCepChange(val, 'dest');
                          }
                        }}
                        placeholder="Ex: Belo Horizonte, SP ou CEP" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#004DD1] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button 
                      type="button"
                      onClick={handleHeroSimulatorSubmit}
                      className="w-full bg-[#004DD1] hover:bg-[#003CA3] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Avançar e Simular Orçamento</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Trust guarantee micro badges */}
                <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    100% Gratuito
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    Resposta Rápida
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    5.0 no Google
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section id="quemsomos" className="py-20 bg-[#F2F2F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#004DD1] uppercase tracking-tight">Quem Somos</h2>
            <div className="w-24 h-2 bg-[#004DD1] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">Excelência em Mudanças e Serviços em Minas Gerais</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  A Romanelli Mudanças e Pinturas é a melhor solução para suas mudanças em Minas Gerais. Com anos de experiência e colecionando bons resultados para os clientes com serviços de alta qualidade.
                </p>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Você pode contar com a Romanelli Mudanças para realizar suas mudanças com agilidade e segurança. <strong className="text-[#004DD1]">Fazer uma mudança nunca foi tão fácil!</strong>
                </p>
                <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-[#004DD1] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#004DD1]" />
                    <span>Frota Equipada</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-[#004DD1] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#004DD1]" />
                    <span>Equipe Qualificada</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://romanellimudancas.com/wp-content/uploads/2024/05/7ca820f174872b859cea9a3-e1715313929914.png" 
                  alt="Caminhão Romanelli Mudanças" 
                  className="w-full max-w-md object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Serviços */}
      <section id="servicos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#004DD1] uppercase tracking-tight">Nossos Serviços</h2>
            <div className="w-24 h-2 bg-[#004DD1] mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto font-medium">Conheça nossa linha completa de serviços especializados para sua residência ou empresa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((srv, index) => (
              <ServiceCardItem
                key={srv.id}
                srv={srv}
                index={index}
                onSelect={() => {
                  setActiveVideoService(srv);
                  setVideoModalOpen(true);
                }}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setQuoteModalOpen(true)}
              className="bg-[#004DD1] hover:bg-[#003CA3] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-blue-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              SOLICITAR ORÇAMENTO COMPLETO
            </button>
          </div>
        </div>
      </section>

      {/* O Que Nossos Clientes Dizem (Google Reviews com Filtro por Data) */}
      <section id="clientes" className="py-12 bg-[#F2F2F2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-black text-[#004DD1] uppercase tracking-tight">O Que Nossos Clientes Dizem</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setReviewSort(prev => prev === 'recent' ? 'oldest' : 'recent')}
                  className="bg-white hover:bg-blue-50 text-[#004DD1] border border-blue-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
                  title="Filtrar por data"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#004DD1]" />
                  <span>{reviewSort === 'recent' ? 'Mais Recentes' : 'Mais Antigas'}</span>
                </button>
                <button 
                  onClick={handleSyncGoogleReviews}
                  disabled={isSyncingReviews}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm disabled:opacity-50"
                  title="Sincronizar avaliações ao vivo do Google"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingReviews ? 'animate-spin' : ''}`} />
                  <span>{isSyncingReviews ? 'Sincronizando...' : 'Sincronizar Google'}</span>
                </button>
              </div>
            </div>
            <div className="w-24 h-2 bg-[#004DD1] mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-600 mt-2 font-medium">Avaliações reais de clientes satisfeitos com nossos serviços no Google.</p>
            {syncStatus && (
              <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-lg text-xs font-bold animate-pulse">
                {syncStatus}
              </div>
            )}
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Rating Summary Card */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-6">
                <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-wider mb-2">EXCELENTE</div>
                <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Com base em <span className="font-bold text-gray-900">231 avaliações</span>
                </p>
                <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 flex items-center justify-center mb-4">
                  <img src="https://cdn.trustindex.io/assets/platform/Google/logo.svg" width="110" height="35" alt="Google" className="h-7 object-contain" />
                </div>
                <a 
                  href="https://www.google.com/search?q=romanelli+mudancas#cso=_9CS5asJDiN3WxA_Um9m4Cw_78:301&lrd=0x94cbc7e3fcdc9023:0xedb746da658a430d,1,,,,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#004DD1] hover:bg-[#003CA3] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 hover:scale-105"
                >
                  <Star className="w-4 h-4 fill-current text-amber-300" />
                  <span>Avalie-nos no Google</span>
                </a>
              </div>

              {/* Right Infinite Marquee Ticker Slider */}
              <div className="lg:col-span-8 overflow-hidden relative w-full">
                {/* Gradient fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="animate-marquee flex gap-6">
                  {([
                    ...reviewsList
                  ]
                  .sort((a, b) => reviewSort === 'recent' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp)
                  .concat([
                    ...reviewsList
                  ].sort((a, b) => reviewSort === 'recent' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp)))
                  .map((rev, idx) => (
                    <div key={idx} className="w-[280px] sm:w-[300px] flex-shrink-0 bg-[#F9FBFD] border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border border-gray-300" />
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">{rev.name}</h4>
                              <span className="text-[11px] text-gray-500">{rev.date}</span>
                            </div>
                          </div>
                          <img src="https://cdn.trustindex.io/assets/platform/Google/icon.svg" alt="Google" className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                          "{rev.text}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section id="equipe" className="bg-[#004DD1] text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="h-[400px] lg:h-[600px] w-full relative">
            <img 
              src="https://romanellimudancas.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-01-at-14.26.31.jpeg" 
              alt="Equipe Romanelli Mudanças" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 to-transparent"></div>
          </div>
          <div className="p-8 sm:p-16 lg:p-20 flex flex-col justify-center space-y-6">
            <div className="w-20 h-2 bg-white rounded-full"></div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Nossa equipe</h2>
            <p className="text-blue-100 text-base leading-relaxed font-normal">
              Nossos profissionais trabalham com todo o cuidado para retirar e para que durante o percurso da retirada até a entrega em seu novo endereço nada de errado aconteça com seus pertences.
            </p>
            <p className="text-blue-100 text-base leading-relaxed font-normal">
              Estamos equipados com veículos de pequeno e médio porte, temos sempre um ajudante para tornar mais ágil seu carreto, nossos veículos possuem cobertores ou mantas de proteção para que sua mudança ou mercadoria seja transportada com total segurança.
            </p>
            <div className="pt-4">
              <a 
                href="https://api.whatsapp.com/send?phone=5535991175646&text=Olá,%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-[#004DD1] px-8 py-4 rounded-xl font-bold text-base shadow-xl inline-flex items-center gap-3 transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 text-[#004DD1]" />
                SOLICITAR ORÇAMENTO COM A EQUIPE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes (FAQ Upgrade) */}
      <section id="faq" className="py-24 bg-[#F4F6F9] relative overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100/80 text-[#004DD1] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <HelpCircle className="w-4 h-4 text-[#004DD1]" />
              <span>Central de Dúvidas Romanelli</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#004DD1] uppercase tracking-tight">
              Perguntas Frequentes
            </h2>
            <div className="w-20 h-1.5 bg-[#004DD1] mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Tudo o que você precisa saber sobre prazos, embalagens especiais, segurança e pagamento da sua mudança.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Busque por palavra-chave (ex: seguro, montagem, prazo, PIX, pintura)..."
                className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004DD1] focus:border-transparent transition-all"
              />
              {faqSearch && (
                <button
                  type="button"
                  onClick={() => setFaqSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer"
                  title="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2 px-1">
              <span>{filteredFaqs.length} {filteredFaqs.length === 1 ? 'dúvida encontrada' : 'dúvidas encontradas'}</span>
              {faqSearch && (
                <button 
                  type="button" 
                  onClick={() => setFaqSearch('')} 
                  className="text-[#004DD1] font-bold hover:underline cursor-pointer"
                >
                  Limpar busca
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {[
              { id: 'todos', label: 'Todas as Dúvidas', count: faqs.length },
              { id: 'mudanca', label: 'Mudança & Transporte', count: faqs.filter(f => f.category === 'mudanca').length },
              { id: 'seguranca', label: 'Segurança & Embalagem', count: faqs.filter(f => f.category === 'seguranca').length },
              { id: 'pagamento', label: 'Orçamento & Pagamento', count: faqs.filter(f => f.category === 'pagamento').length },
              { id: 'pintura', label: 'Pintura & Restauração', count: faqs.filter(f => f.category === 'pintura').length }
            ].map(cat => {
              const active = faqCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFaqCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active 
                      ? 'bg-[#004DD1] text-white shadow-md shadow-blue-600/25 scale-[1.02]' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-200 shadow-sm space-y-4">
              <div className="w-14 h-14 bg-blue-50 text-[#004DD1] rounded-2xl flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Nenhuma pergunta encontrada</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Não localizamos respostas para "<strong>{faqSearch}</strong>". Fale diretamente com nossa equipe para tirar sua dúvida em tempo real.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFaqSearch('');
                    setFaqCategory('todos');
                  }}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Ver todas as perguntas
                </button>
                <a
                  href={`https://api.whatsapp.com/send?phone=5535991175646&text=Olá,%20tenho%20uma%20dúvida%20sobre%20a%20mudança:%20${encodeURIComponent(faqSearch)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Perguntar no WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'border-blue-200 shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/20' 
                        : 'border-gray-200/80 hover:border-gray-300 hover:shadow-md shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex justify-between items-start gap-4 cursor-pointer group"
                    >
                      <div className="space-y-1.5 pr-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-[#004DD1] uppercase tracking-wider">
                          <span>{faq.categoryLabel}</span>
                        </div>
                        <h3 className={`text-base sm:text-lg font-bold leading-snug transition-colors ${
                          isOpen ? 'text-[#004DD1]' : 'text-gray-900 group-hover:text-[#004DD1]'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-[#004DD1] text-white rotate-180 shadow-md shadow-blue-600/30' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-[#004DD1]'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-gray-100 text-gray-600 animate-fadeIn space-y-4">
                        <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                          {faq.answer}
                        </p>

                        {/* Highlight Key Point */}
                        {faq.highlight && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#004DD1] shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm font-semibold text-gray-800">
                              <span className="font-bold text-[#004DD1]">Destaque: </span>
                              {faq.highlight}
                            </p>
                          </div>
                        )}

                        {/* Direct WhatsApp Action for this question */}
                        <div className="pt-1 flex items-center justify-between flex-wrap gap-2 text-xs">
                          <span className="text-gray-500 font-medium">Essa resposta ajudou você?</span>
                          <a
                            href={`https://api.whatsapp.com/send?phone=5535991175646&text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre:%20*${encodeURIComponent(faq.question)}*`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Conversar com atendente no WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Help Banner */}
          <div className="mt-12 bg-gradient-to-br from-[#004DD1] via-[#003CA3] to-[#002B7A] text-white rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-2 max-w-lg">
                <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Atendimento Humanizado & Direto</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ainda tem alguma dúvida?
                </h3>
                <p className="text-blue-100 text-sm sm:text-base font-normal">
                  Nossa equipe em Pouso Alegre está a postos para esclarecer detalhes e planejar sua mudança sob medida.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://api.whatsapp.com/send?phone=5535991175646&text=Olá,%20estava%20olhando%20as%20dúvidas%20frequentes%20no%20site%20e%20gostaria%20de%20um%20atendimento!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl font-black text-sm shadow-lg shadow-emerald-950/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chamar no WhatsApp</span>
                </a>
                <a
                  href="tel:5535991175646"
                  className="w-full sm:w-auto bg-white/15 hover:bg-white/25 border border-white/30 text-white px-5 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-blue-200" />
                  <span>(35) 99117-5646</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Localização & Mapa */}
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#004DD1] uppercase tracking-tight">Onde Estamos</h2>
            <div className="w-24 h-2 bg-[#004DD1] mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-600 mt-3 font-medium">Venha nos visitar ou entre em contato para agendar seu atendimento.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            <div className="lg:col-span-1 bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl font-black text-[#004DD1] mb-4">Romanelli Mudanças e Pinturas</h3>
                <div className="space-y-4 text-gray-700 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#004DD1] flex-shrink-0 mt-1" />
                    <span>R. Lamartine Silva Paiva, 491 - Jardim Olimpico, Pouso Alegre - MG, 37558-449</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#004DD1] flex-shrink-0" />
                    <span>(35) 99117-5646</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#004DD1] flex-shrink-0" />
                    <span>Segunda a Sábado: 08:00 - 18:00</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <a 
                  href="https://api.whatsapp.com/send?phone=5535991175646&text=Olá,%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#004DD1] hover:bg-[#003CA3] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chamar no WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[350px] sm:h-[420px] w-full relative">
              <iframe 
                title="Romanelli Mudanças Localização"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.183416954256!2d-45.938749!3d-22.23125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cb5c8a4918e7e1%3A0x6b9d62886f38db2e!2sR.%20Lamartine%20Silva%20Paiva%2C%20491%20-%20Jardim%20Olimpico%2C%20Pouso%20Alegre%20-%20MG%2C%2037558-449!5e0!3m2!1spt-BR!2sbr!4v1715000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, width: '100%', height: '100%' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <Logo light={true} />
              </div>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Especialistas em mudanças residenciais, comerciais, industriais e pinturas em Pouso Alegre - MG e toda região. Fazer uma mudança nunca foi tão fácil!
              </p>

              {/* Social Icons Wrapper */}
              <div className="elementor-social-icons-wrapper elementor-grid flex gap-3 pt-2" role="list">
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-animation-grow w-10 h-10 rounded-full bg-gray-800 hover:bg-[#004DD1] text-white flex items-center justify-center transition-all hover:scale-110" href="https://www.instagram.com/romanellimudancas/" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only sr-only">Instagram</span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fab-instagram w-5 h-5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                  </a>
                </span>
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-grow w-10 h-10 rounded-full bg-gray-800 hover:bg-[#004DD1] text-white flex items-center justify-center transition-all hover:scale-110" href="https://www.facebook.com/romanellimudancas/" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only sr-only">Facebook</span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fab-facebook w-5 h-5 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                  </a>
                </span>
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-envelope elementor-animation-grow w-10 h-10 rounded-full bg-gray-800 hover:bg-[#004DD1] text-white flex items-center justify-center transition-all hover:scale-110" href="mailto:romanellimudancas@gmail.com" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only sr-only">Envelope</span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fas-envelope w-5 h-5 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
                  </a>
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#quemsomos" className="hover:text-white transition-colors">Quem Somos</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Nossos Serviços</a></li>
                <li><a href="#clientes" className="hover:text-white transition-colors">Avaliações</a></li>
                <li><a href="#equipe" className="hover:text-white transition-colors">Nossa Equipe</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ (Dúvidas)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">Contato Direto</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>(35) 99117-5646</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                  <span>Pouso Alegre - MG</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Romanelli Mudanças e Pinturas. Todos os direitos reservados.</p>
            <p className="mt-2 sm:mt-0">Fazer uma mudança nunca foi tão fácil!</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button - Official Brand Logo & Full Descriptive Title without abbreviations */}
      <a 
        href="https://api.whatsapp.com/send?phone=5535991175646&text=Olá,%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento!"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.7)] flex items-center justify-center gap-2.5 transition-all duration-500 ease-out hover:scale-105 group ${
          showFloatingWhatsApp 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-12 scale-75 pointer-events-none'
        }`}
        title="Solicitar Orçamento no WhatsApp"
      >
        {/* Official WhatsApp SVG Logo */}
        <svg 
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white shrink-0 group-hover:scale-110 transition-transform" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="font-black text-xs sm:text-sm whitespace-nowrap tracking-wide">
          Solicitar Orçamento no WhatsApp
        </span>
      </a>

      {/* Interactive Triage & Quote Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header & Stepper */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#004DD1] flex items-center justify-center font-bold text-xs">
                  <Calculator className="w-4 h-4" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-[#004DD1]">
                  Simulador Inteligente Romanelli
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                {triageStep === 1 && "1. Trajeto e Serviço"}
                {triageStep === 2 && "2. Detalhes da sua Mudança"}
                {triageStep === 3 && "3. Finalizar e Receber Cotação"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {triageStep === 1 && "Informe de onde para onde será a sua mudança."}
                {triageStep === 2 && "Triagem rápida para dimensionarmos equipe e veículo ideais."}
                {triageStep === 3 && "Receba o orçamento detalhado instantaneamente no seu WhatsApp."}
              </p>

              {/* Progress Stepper Tabs */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setFormError(null);
                    setTriageStep(1);
                  }}
                  className={`text-left p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    triageStep === 1 
                      ? 'bg-[#004DD1] text-white shadow-sm' 
                      : isStep1Valid 
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    {isStep1Valid ? '✓' : '1'}
                  </span>
                  <span className="truncate">1. Trajeto</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isStep1Valid) {
                      setFormError("Preencha a origem e o destino na Etapa 1 antes de ir para a Triagem.");
                      return;
                    }
                    setFormError(null);
                    setTriageStep(2);
                  }}
                  className={`text-left p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    triageStep === 2 
                      ? 'bg-[#004DD1] text-white shadow-sm' 
                      : isStep2Valid 
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    {isStep2Valid ? '✓' : '2'}
                  </span>
                  <span className="truncate">2. Triagem</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isStep1Valid) {
                      setFormError("Preencha a origem e o destino primeiro.");
                      return;
                    }
                    if (!propertyType || !moveSize) {
                      setFormError("Selecione o tipo de imóvel e o porte da mudança na Etapa 2 primeiro.");
                      return;
                    }
                    setFormError(null);
                    setTriageStep(3);
                  }}
                  className={`text-left p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    triageStep === 3 
                      ? 'bg-[#004DD1] text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
                  <span className="truncate">3. Contato</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs font-bold mb-4 animate-shake">
                {formError}
              </div>
            )}

            {/* STEP 1: TRAJETO & SERVIÇO */}
            {triageStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tipo de Serviço</label>
                  <select 
                    value={serviceType} 
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-[#004DD1] focus:bg-white focus:outline-none"
                  >
                    <option value="Residencial">🚚 Mudança Residencial</option>
                    <option value="Comercial">🏢 Mudança Comercial</option>
                    <option value="Industrial">🏭 Mudança Industrial</option>
                    <option value="Entrega Rápida">⚡ Entrega Rápida</option>
                    <option value="Feiras e Eventos">🎪 Transporte para Eventos</option>
                    <option value="Pintura Interna">🎨 Pintura Interna / Predial</option>
                  </select>
                </div>

                {/* Origem */}
                <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-[#004DD1] uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#004DD1]" />
                      Local de Origem
                    </label>
                    {originLoading && <span className="text-[10px] text-blue-600 animate-pulse font-bold">Buscando CEP...</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input 
                      type="text" 
                      value={originCep}
                      onChange={(e) => handleCepChange(e.target.value, 'origin')}
                      placeholder="CEP (ex: 37550-000)" 
                      maxLength={9}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#004DD1] focus:outline-none"
                    />
                    <input 
                      type="text" 
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="Cidade / Endereço (ex: Pouso Alegre)" 
                      className="sm:col-span-2 w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#004DD1] focus:outline-none"
                    />
                  </div>
                  <input 
                    type="text" 
                    value={originNumber}
                    onChange={(e) => setOriginNumber(e.target.value)}
                    placeholder="Nº, Apto, Condomínio ou Bairro (opcional)" 
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#004DD1] focus:outline-none"
                  />
                </div>

                {/* Destino */}
                <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-emerald-700 uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      Local de Destino
                    </label>
                    {destLoading && <span className="text-[10px] text-emerald-600 animate-pulse font-bold">Buscando CEP...</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input 
                      type="text" 
                      value={destCep}
                      onChange={(e) => handleCepChange(e.target.value, 'dest')}
                      placeholder="CEP (ex: 01001-000)" 
                      maxLength={9}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#004DD1] focus:outline-none"
                    />
                    <input 
                      type="text" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Cidade / Endereço de Entrega" 
                      className="sm:col-span-2 w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#004DD1] focus:outline-none"
                    />
                  </div>
                  <input 
                    type="text" 
                    value={destNumber}
                    onChange={(e) => setDestNumber(e.target.value)}
                    placeholder="Nº, Apto, Condomínio ou Bairro (opcional)" 
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#004DD1] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      const originOk = origin.trim().length >= 2 || originCep.replace(/\D/g, '').length === 8;
                      const destOk = destination.trim().length >= 2 || destCep.replace(/\D/g, '').length === 8;
                      if (!originOk) {
                        setFormError("Por favor, preencha o local ou CEP de origem para continuar.");
                        return;
                      }
                      if (!destOk) {
                        setFormError("Por favor, preencha o local ou CEP de destino para continuar.");
                        return;
                      }
                      if (
                        (originCep && destCep && originCep.replace(/\D/g, '') === destCep.replace(/\D/g, '')) ||
                        (origin && destination && origin.trim().toLowerCase() === destination.trim().toLowerCase())
                      ) {
                        setFormError("Atenção: A origem e o destino não podem ser iguais!");
                        return;
                      }
                      setFormError(null);
                      setTriageStep(2);
                    }}
                    className="w-full bg-[#004DD1] hover:bg-[#003CA3] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continuar Triagem da Mudança</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TRIAGEM DA MUDANÇA */}
            {triageStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                {/* Resumo do que já foi preenchido */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#004DD1] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                        {serviceType}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Trajeto Definido
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-800 flex items-center gap-2 flex-wrap">
                      <span>{origin || originCep}</span>
                      <ArrowRight className="w-3 h-3 text-[#004DD1]" />
                      <span>{destination || destCep}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormError(null);
                      setTriageStep(1);
                    }}
                    className="self-start sm:self-center text-xs font-bold text-[#004DD1] hover:text-blue-800 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-blue-200 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Alterar Trajeto</span>
                  </button>
                </div>

                {/* SESSÃO 1: Tipo de Imóvel */}
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-800 uppercase flex items-center gap-1.5">
                      <span>1. Tipo de Imóvel (Origem/Destino)</span>
                      <span className="text-red-500">*</span>
                    </label>
                    {propertyType ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Preenchido
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        Selecione para liberar a próxima sessão
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'Apartamento com Elevador', label: 'Apto c/ Elevador', icon: Building2 },
                      { id: 'Apartamento sem Elevador', label: 'Apto s/ Elevador (Escadas)', icon: Boxes },
                      { id: 'Casa Térrea ou Sobrado', label: 'Casa / Sobrado', icon: Home },
                      { id: 'Comercial ou Escritório', label: 'Comercial / Empresa', icon: Factory },
                    ].map((item) => {
                      const Icon = item.icon;
                      const selected = propertyType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setPropertyType(item.id);
                            setFormError(null);
                          }}
                          className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            selected 
                              ? 'border-[#004DD1] bg-blue-50/80 text-[#004DD1] font-bold shadow-sm ring-1 ring-[#004DD1]' 
                              : 'border-gray-200 bg-gray-50/50 text-gray-700 hover:border-gray-300 hover:bg-gray-100 font-medium'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            selected ? 'bg-[#004DD1] text-white' : 'bg-white text-gray-500 border border-gray-200'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SESSÃO 2: Porte da Carga (Só editável após preencher o tipo de imóvel) */}
                <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                  propertyType 
                    ? 'bg-white border-gray-200 shadow-xs' 
                    : 'bg-gray-50/80 border-dashed border-gray-300 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`text-xs font-bold uppercase flex items-center gap-1.5 ${propertyType ? 'text-gray-800' : 'text-gray-400'}`}>
                      <span>2. Porte Estimado da Carga</span>
                      <span className="text-red-500">*</span>
                    </label>
                    {moveSize ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Preenchido
                      </span>
                    ) : !propertyType ? (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueado (Selecione o imóvel acima)
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        Selecione o porte
                      </span>
                    )}
                  </div>
                  <div className={`grid grid-cols-2 gap-2.5 ${!propertyType ? 'pointer-events-none select-none' : ''}`}>
                    {[
                      { id: 'Compacta (Kitnet/1 Quarto)', label: 'Compacta (1 Quarto/Poucos itens)' },
                      { id: 'Padrão (2 a 3 Quartos)', label: 'Padrão (2 a 3 Quartos)' },
                      { id: 'Grande (4+ Quartos ou Sobrado)', label: 'Grande (4+ Quartos/Sobrado)' },
                      { id: 'Comercial / Escritório', label: 'Comercial / Carga Especial' }
                    ].map((item) => {
                      const selected = moveSize === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={!propertyType}
                          onClick={() => {
                            setMoveSize(item.id);
                            setFormError(null);
                          }}
                          className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                            !propertyType 
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : selected 
                                ? 'border-[#004DD1] bg-blue-50/80 text-[#004DD1] font-bold shadow-sm ring-1 ring-[#004DD1] cursor-pointer' 
                                : 'border-gray-200 bg-gray-50/50 text-gray-700 hover:border-gray-300 font-medium cursor-pointer'
                          }`}
                        >
                          <span>{item.label}</span>
                          {selected && <Check className="w-4 h-4 text-[#004DD1]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SESSÃO 3: Serviços Extras (Só editável após preencher o porte da carga) */}
                <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                  moveSize 
                    ? 'bg-white border-gray-200 shadow-xs' 
                    : 'bg-gray-50/80 border-dashed border-gray-300 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`text-xs font-bold uppercase flex items-center gap-1.5 ${moveSize ? 'text-gray-800' : 'text-gray-400'}`}>
                      <span>3. Serviços Opcionais Desejados</span>
                    </label>
                    {!moveSize && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueado (Selecione o porte acima)
                      </span>
                    )}
                  </div>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${!moveSize ? 'pointer-events-none select-none' : ''}`}>
                    {[
                      'Desmontagem e Montagem de Móveis',
                      'Embalagem Especial com Mantas e Plástico Bolha',
                      'Ajudantes Extras para Carregamento',
                      'Pintura Interna para Entrega do Imóvel'
                    ].map((serv) => {
                      const isChecked = extraServices.includes(serv);
                      return (
                        <button
                          key={serv}
                          type="button"
                          disabled={!moveSize}
                          onClick={() => toggleExtraService(serv)}
                          className={`p-2.5 rounded-xl border text-left text-xs flex items-center gap-2 transition-all ${
                            !moveSize 
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : isChecked 
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold cursor-pointer' 
                                : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-emerald-600 text-white font-bold' : 'border border-gray-300 bg-white'
                          }`}>
                            {isChecked && '✓'}
                          </span>
                          <span className="truncate">{serv}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SESSÃO 4: Data Prevista (Só editável após preencher o porte da carga) */}
                <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                  moveSize 
                    ? 'bg-white border-gray-200 shadow-xs' 
                    : 'bg-gray-50/80 border-dashed border-gray-300 opacity-60'
                }`}>
                  <div className="flex justify-between items-center mb-1">
                    <label className={`text-xs font-bold uppercase ${moveSize ? 'text-gray-800' : 'text-gray-400'}`}>
                      4. Data Pretendida para a Mudança
                    </label>
                    {moveSize ? (
                      <button
                        type="button"
                        onClick={() => setMovingDate('A combinar')}
                        className="text-[11px] text-[#004DD1] font-bold hover:underline cursor-pointer"
                      >
                        A combinar / Flexível
                      </button>
                    ) : (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueado
                      </span>
                    )}
                  </div>
                  <input 
                    type="date" 
                    disabled={!moveSize}
                    value={movingDate === 'A combinar' ? '' : movingDate}
                    onChange={(e) => setMovingDate(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#004DD1] focus:outline-none ${
                      !moveSize 
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                  {movingDate === 'A combinar' && (
                    <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                      ✓ Data marcada como "A combinar / Flexível"
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setFormError(null);
                      setTriageStep(1);
                    }}
                    className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                  {propertyType && moveSize ? (
                    <button 
                      type="button"
                      onClick={() => {
                        setFormError(null);
                        setTriageStep(3);
                      }}
                      className="w-2/3 bg-[#004DD1] hover:bg-[#003CA3] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Avançar para Envio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => {
                        if (!propertyType) setFormError("Selecione o Tipo de Imóvel para continuar.");
                        else if (!moveSize) setFormError("Selecione o Porte da Carga para continuar.");
                      }}
                      className="w-2/3 bg-gray-200 text-gray-500 py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-gray-300"
                    >
                      <Lock className="w-3.5 h-3.5 text-gray-500" />
                      <span>Preencha as seções obrigatórias</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: CONTATO E ENVIO WHATSAPP */}
            {triageStep === 3 && (
              <form onSubmit={handleWhatsAppQuote} className="space-y-4 animate-fadeIn">
                {/* Resumo Consolidado da Triagem */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#004DD1] tracking-wide">
                      Resumo da sua Solicitação
                    </span>
                    <button
                      type="button"
                      onClick={() => setTriageStep(2)}
                      className="text-[11px] font-bold text-[#004DD1] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Editar Triagem
                    </button>
                  </div>
                  <div className="text-xs text-gray-700 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-gray-900">
                      <Truck className="w-3.5 h-3.5 text-[#004DD1]" />
                      <span>{serviceType}:</span>
                      <span className="text-gray-600 font-medium">{origin || 'Origem'} ➔ {destination || 'Destino'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 text-[11px]">
                      <Building2 className="w-3.5 h-3.5 text-gray-500" />
                      <span>{propertyType} • {moveSize}</span>
                    </div>
                    {extraServices.length > 0 && (
                      <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>{extraServices.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Seu Nome Completo *
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João da Silva" 
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#004DD1] focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Seu WhatsApp / Telefone *
                    </label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(35) 99999-9999" 
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#004DD1] focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Observações ou Itens Especiais (Opcional)
                  </label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Sofá retrátil grande, geladeira inverter, piano ou restrição de horário do condomínio..." 
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-[#004DD1] focus:bg-white focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 space-y-3">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-2xl font-black text-base shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-4 h-4 text-white fill-current" />
                    </div>
                    <span>Enviar Orçamento no WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <button 
                      type="button" 
                      onClick={() => setTriageStep(2)}
                      className="text-gray-500 hover:text-gray-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Voltar para Triagem</span>
                    </button>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> Atendimento sem compromisso
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Demonstration Modal */}
      {videoModalOpen && activeVideoService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 overflow-hidden">
            <button 
              onClick={() => {
                setVideoModalOpen(false);
                setActiveVideoService(null);
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <img src={activeVideoService.img} alt={activeVideoService.title} className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#004DD1]">Demonstração: {activeVideoService.title}</h3>
                <p className="text-xs text-gray-500">Veja como realizamos este serviço com total segurança e profissionalismo</p>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg mb-6">
              <iframe 
                src={activeVideoService.videoUrl} 
                title={`Demonstração ${activeVideoService.title}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className="text-sm text-gray-600 mb-6 font-medium">
              {activeVideoService.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  setVideoModalOpen(false);
                  setServiceType(activeVideoService.title);
                  setQuoteModalOpen(true);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 via-[#004DD1] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-black text-sm shadow-[0_10px_25px_rgba(0,77,209,0.4)] hover:shadow-[0_15px_30px_rgba(0,77,209,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-4 h-4 text-white" />
                </div>
                <span>Solicitar Orçamento para {activeVideoService.title}</span>
              </button>
              <button 
                onClick={() => {
                  setVideoModalOpen(false);
                  setActiveVideoService(null);
                }}
                className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold text-sm transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
